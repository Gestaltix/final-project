import pandas
from django.core.management.base import BaseCommand
from project.base.apps.trackers.models import Session, Data


class Command(BaseCommand):
    help = 'Load the filedwiz data files into the database'
    BATCH_SIZE = 5000

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to calculated imported data per session'))
        sessions = Session.objects.all()
        for session in sessions:
            # Clear all calculated data
            session.calculated_data.all().delete()
            session_data = session.data.order_by('time').values(
                'session_id',
                'member_id',
                'time',
                'x',
                'y',
                'latitude',
                'longitude',
                'speed',
            )
            df = pandas.DataFrame.from_dict(list(session_data))
            df['velocity'] = df['speed'] / 3.6
            df['acceleration'] = (df[u'velocity'] - df[u'velocity'].shift(1)) / pandas.to_timedelta(
                df[u'ts_seconds'] - df[u'ts_seconds'].shift(1), unit='s').dt.total_seconds()

            print(df.head())

        self.stdout.write(self.style.SUCCESS('Finished calculations'))
