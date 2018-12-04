from django.db import models
from django_extensions.db.models import TimeStampedModel


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
        null=True,
        blank=True,
    )
    filename = models.CharField(
        verbose_name='filename',
        max_length=100,
    )

    def __str__(self):
        return str(self.session)
