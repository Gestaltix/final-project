from django.db import models
from django_extensions.db.models import TimeStampedModel


class Data(TimeStampedModel):
    session = models.ForeignKey(
        verbose_name='session',
        to='trackers.Session',
        related_name='calculated_data',
        on_delete=models.CASCADE,
    )
    member = models.ForeignKey(
        verbose_name='member',
        to='team.Member',
        on_delete=models.CASCADE,
        related_name='calculated_data',
    )
    time = models.DateTimeField(
        verbose_name='time',
    )
    velocity = models.FloatField(
        verbose_name='velocity',
    )
    acceleration = models.FloatField(
        verbose_name='acceleration',
    )
    em = models.FloatField(
        verbose_name='x (m)',
    )
    es = models.FloatField(
        verbose_name='y (m)',
    )
    watt_kg = models.FloatField(
        verbose_name='latitude (deg)',
    )
    load = models.IntegerField(
        verbose_name='player load (abs cumsum / 9.81)',
    )

    def __str__(self):
        return str(self.time)


class PowerCategroy(TimeStampedModel):
    CATEGORIES = [
        (10, 'Low Power \n < 10 W/kg'),
        (20, 'Intermediate Power\n 10 < x < 20 W/kg'),
        (35, 'High Power\n 20 < x < 35 W/kg'),
        (55, 'Enormous Power\n 35 < x < 55 W/kg'),
        (100, 'Maximum Power\n  55 W/kg <'),
    ]
    category = models.IntegerField(
        verbose_name='category',
        choices=CATEGORIES,
    )
    session = models.ForeignKey(
        verbose_name='session',
        to='trackers.Session',
        related_name='calculated_power_category_data',
        on_delete=models.CASCADE,
    )
    member = models.ForeignKey(
        verbose_name='member',
        to='team.Member',
        on_delete=models.CASCADE,
    )
    total_energy_kj_per_kg = models.FloatField(
        verbose_name='energy per category (kj/kg)'
    )
    total_time_sec = models.FloatField(
        verbose_name='seconds per category'
    )
    anareobic_reserve = models.FloatField(
        verbose_name='anareobic reserve'
    )
    critical_power = models.FloatField(
        verbose_name='critical power'
    )
    total_player_load = models.FloatField(
        verbose_name='total player load'
    )

    def __str__(self):
        return str(self.category)
