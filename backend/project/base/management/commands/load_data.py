import pandas
from django.core.management.base import BaseCommand
from project.base.apps.trackers.models import Session, Data


class Command(BaseCommand):
    help = 'Load the filedwiz data files into the database'
    BATCH_SIZE = 5000

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to load session files'))
        sessions = Session.objects.all()
        for session in sessions:
            # Clear all data
            session.data.all().delete()

            # Loop over files in session
            for file in session.files.all():
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
        self.stdout.write(self.style.SUCCESS('Finished import'))
