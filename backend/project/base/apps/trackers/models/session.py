from django.db import models
from django_extensions.db.models import TimeStampedModel


class Session(TimeStampedModel):
    tracker = models.ForeignKey(
        verbose_name='tracker',
        to='trackers.Tracker',
        on_delete=models.SET_NULL,
        null=True,
    )


class File(TimeStampedModel):
    session = models.ForeignKey(
        verbose_name='session',
        to='trackers.Session',
        related_name='files',
        on_delete=models.CASCADE,
    )
    file = models.FileField(
        verbose_name='file',
    )
