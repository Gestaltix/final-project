from django.db import models
from django_extensions.db.models import TimeStampedModel


class Session(TimeStampedModel):
    tracker = models.ForeignKey(
        verbose_name='tracker',
        to='trackers.Tracker',
        on_delete=models.SET_NULL,
        null=True,
    )
    team = models.ForeignKey(
        verbose_name='team',
        to='team.Team',
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return str(self.created)


class File(TimeStampedModel):
    session = models.ForeignKey(
        verbose_name='session',
        to='trackers.Session',
        related_name='files',
        on_delete=models.CASCADE,
    )
    member = models.ForeignKey(
        verbose_name='member',
        to='team.Member',
        on_delete=models.CASCADE,
        null=True,
    )
    file = models.FileField(
        verbose_name='file',
    )

    def __str__(self):
        return self.file.path
