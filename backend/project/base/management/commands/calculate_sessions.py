from time import sleep

import pandas
import numpy as np
from django.core.management.base import BaseCommand

from project.base.apps.calculations.models import Data as CalculationData
from project.base.apps.tasks.models import CalculateTask, CalculatePowerCategoriesTask


class Command(BaseCommand):
    help = 'Calculate session data for each team member'
    BATCH_SIZE = 5000
    k = 0.01  # wind resistance constant
    C_0 = 2.55  # J / (kg * m) -> how much energy is used per kilo when walking on a flat surface

    def handle(self, *args, **options):
        while True:
            tasks = CalculateTask.objects.filter(finished=False)
            for task in tasks:
                self.stdout.write(self.style.SUCCESS('Starting to calculated imported data per session'))
                session = task.session

                for member in session.team.members.all():

                    # Clear all calculated data per member
                    session.calculated_data.filter(member=member).delete()

                    session_data = member.data.order_by('time').values(
                        'time',
                        'x',
                        'y',
                        'latitude',
                        'longitude',
                        'speed',
                    )
                    df = pandas.DataFrame.from_dict(list(session_data))
                    # There were duplicate times in the dataframe, causing inf accelerations
                    df = df.drop_duplicates(subset='time')
                    df['velocity'] = df['speed'] / 3.6
                    df['acceleration'] = (df['velocity'] - df['velocity'].shift(1)) / pandas.to_timedelta(df['time'] - df['time'].shift(1), unit='s').dt.total_seconds()  # noqa
                    df.set_index("time", inplace=True)
                    df = df.resample("1s").mean()
                    df['load'] = df['acceleration'].abs().cumsum() / 9.81
                    df[u"em"] = np.sqrt((np.power(df['acceleration'], 2) / np.power(9.81, 2)) + 1)
                    df[u"es"] = df['acceleration'] / 9.81
                    df[u"watt_kg"] = (
                        (
                            155.4 *
                            np.power(df[u"es"], 5) - 30.4 *
                            np.power(df[u"es"], 4) - 43.3 *
                            np.power(df[u"es"], 3) + 46.3 *
                            np.power(df[u"es"], 2) + 19.5 *
                            df[u"es"] + self.C_0
                        ) * df[u"em"] + self.k * np.power(df['velocity'], 2)) * df['velocity']

                    # Make sure the labels are the same as the categories choices in the model
                    df["power_category"] = pandas.cut(df['watt_kg'], [-1, 10, 20, 35, 55, 100], labels=[-1, 10, 20, 35, 55])

                    # Remove first row that contains nan's
                    df = df.iloc[1:]
                    df = df.dropna()

                    # Insert raw data in DB
                    counter = 0
                    data = []
                    for time, row in df.iterrows():
                        if counter >= self.BATCH_SIZE:
                            CalculationData.objects.bulk_create(data)
                            data = []
                            counter = 0
                        data.append(CalculationData(
                            session=session,
                            member=member,
                            time=time,
                            velocity=row['velocity'],
                            acceleration=row['acceleration'],
                            em=row['em'],
                            es=row['es'],
                            watt_kg=row['watt_kg'],
                            load=row['load'],
                            category=row['power_category'],
                        ))
                        counter += 1
                    if data:
                        CalculationData.objects.bulk_create(data)
                task.finished = True
                task.save()
                CalculatePowerCategoriesTask.objects.create(
                    session=True,
                )
                self.stdout.write(self.style.SUCCESS('Finished calculations'))
            sleep(5)
