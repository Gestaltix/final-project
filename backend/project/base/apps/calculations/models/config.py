from django.db import models
from django_extensions.db.models import TimeStampedModel


class Config(TimeStampedModel):
    wind_resistance = models.FloatField(
        verbose_name=' resistance constant',
    )
    enegry_used_per_kilo_walking_flat = models.FloatField(
        verbose_name='enegry used per kilo',
        help_text='J / (kg * m) -> how much energy is used per kilo when walking on a flat surface',
    )
    window_size_start = models.IntegerField(
        verbose_name='window size start',
    )
    window_size_end = models.IntegerField(
        verbose_name='window size end',
    )
    window_size_num = models.IntegerField(
        verbose_name='window size num',
    )
    window_size_base = models.IntegerField(
        verbose_name='window size base',
    )
    perc = models.FloatField(
        verbose_name='percentile',
        help_text='Which percentile should we take',
    )

    def __str__(self):
        return str(self.time)
