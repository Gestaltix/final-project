from time import sleep

import pandas
from django.core.management.base import BaseCommand
from project.base.apps.trackers.models import Data, File
from project.base.apps.tasks.models import LoadTask


class Command(BaseCommand):
    help = 'Load the filedwiz data files into the database'
    BATCH_SIZE = 5000

    def handle(self, *args, **options):
        while True:
            load_tasks = LoadTask.objects.filter(finished=False)
            for task in load_tasks:
                session = task.session
                self.stdout.write(self.style.SUCCESS(f'Loading session {session.pk}'))

                for member in session.team.members.all():
                    # Clear all data
                    member.data.all().delete()
                    try:
                        file = session.files.get(member=member)
                    except:  # noqa
                        continue

                    df = pandas.read_csv(file.file.path, skiprows=5, sep=',')
                    # Reformat to datetime
                    df[u'time'] = pandas.to_datetime(df[u'time[ISO-UTC]'], format='%Y%m%dT%H%M%S%f', utc=True)

                    # Insert raw data in DB
                    counter = 0
                    data = []
                    for ix, row in df.iterrows():
                        if counter >= self.BATCH_SIZE:
                            Data.objects.bulk_create(data)
                            data = []
                            counter = 0
                        data.append(Data(
                            session=session,
                            member=file.member,
                            time=row['time'],
                            x=row['xPos[m]'],
                            y=row['yPos[m]'],
                            latitude=row['Latitude[deg]'],
                            longitude=row['Longitude[deg]'],
                            speed=row['speed[km/h]'],
                        ))
                        counter += 1
                    if data:
                        Data.objects.bulk_create(data)
                task.finished = True
                task.save()
                self.stdout.write(self.style.SUCCESS(f'Finished import session {session.pk}'))
            sleep(5)
