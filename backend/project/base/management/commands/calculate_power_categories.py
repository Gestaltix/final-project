from time import sleep

import pandas
import numpy as np
from django.core.management.base import BaseCommand
import statsmodels.api as sm

from project.base.apps.calculations.models import PowerCategroy
from project.base.apps.tasks.models import CalculatePowerCategoriesTask


class Command(BaseCommand):
    help = 'Calculate power categories per team member in all sessions'
    perc = .99
    window_size_start = 4
    window_size_end = 10
    window_size_num = 50
    window_size_base = 2

    def handle(self, *args, **options):
        while True:
            tasks = CalculatePowerCategoriesTask.objects.filter(finished=False)
            for task in tasks:
                self.stdout.write(
                    self.style.SUCCESS('Starting to calculate power categories per team member in all sessions')
                )
                session = task.session

                # Loop over members in team session and calculate power category data
                for member in session.team.members.all():

                    # Clear all calculated data
                    session.calculated_power_category_data.filter(member=member).delete()

                    session_data = session.calculated_data.order_by('time').values(
                        'time',
                        'category',
                        'watt_kg',
                        'acceleration',
                    )
                    df = pandas.DataFrame.from_dict(list(session_data))
                    df.set_index("time", inplace=True)

                    window_size = set(list(map(lambda time_second: str(int(time_second)) + "s",
                                               np.logspace(
                                                   start=self.window_size_start,
                                                   stop=self.window_size_end,
                                                   num=self.window_size_num,
                                                   base=self.window_size_base
                                               ))))

                    x = []
                    y = []
                    weight = 77  # weight of the athlete
                    for window in window_size:  # tqdm_notebook(window_size):
                        # Mean over the window and then the nth quantile of the windows
                        rolling_add = np.array([df['watt_kg'].rolling(window).mean().quantile(self.perc)])
                        time = float(window[:-1])
                        x += [time] * len(rolling_add)
                        y.extend(rolling_add * time * weight)  # Convert to J by W/kg * weight * time sustained

                    x = np.array(x).astype(float).reshape(-1, 1)
                    y = np.array(y)
                    results = sm.OLS(y, sm.add_constant(x), M=sm.robust.norms.HuberT()).fit()  # Robust Regression Line Fit

                    W_ = results.params[0]  # Anareobic reserve
                    CP = results.params[1]  # Critical Power

                    load = df['acceleration'].abs().cumsum().iloc[-1]

                    agg_df = df.groupby("category").agg(["sum", "count"])['watt_kg']

                    agg_df.columns = ["total_energy_kj_per_kg", "total_time_sec"]
                    agg_df.index.name = "category"
                    agg_df["total_energy_kj_per_kg"] = agg_df["total_energy_kj_per_kg"] / 1000

                    agg_df.reset_index(inplace=True)

                    agg_df['anareobic_reserve'] = W_
                    agg_df['critical_power'] = CP
                    agg_df['total_player_load'] = load

                    for time, row in agg_df.iterrows():
                        PowerCategroy.objects.create(
                            session=session,
                            member=member,
                            category=row['category'],
                            total_energy_kj_per_kg=row['total_energy_kj_per_kg'],
                            total_time_sec=row['total_time_sec'],
                            anareobic_reserve=row['anareobic_reserve'],
                            critical_power=row['critical_power'],
                            total_player_load=row['total_player_load'],
                        )
                task.finished = True
                task.save()
                self.stdout.write(self.style.SUCCESS('Finished calculations'))
            sleep(5)
