from django.db import models
from django_extensions.db.models import TimeStampedModel


class CalculateTask(TimeStampedModel):
    session = models.ForeignKey(
        verbose_name='session',
        to='trackers.Session',
        related_name='calculate_tasks',
        on_delete=models.CASCADE,
    )
    finished = models.BooleanField(
        verbose_name='finished',
        default=False,
    )
