from django.db import models
from django_extensions.db.models import TimeStampedModel

from project.base.apps.tasks.models import LoadTask


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
    file = models.FileField(
        verbose_name='file',
        upload_to='sessions/',
        null=True,
    )

    def __str__(self):
        return str(self.created)

    def load_data(self):
        if self.data_load_in_progress:
            raise Exception('Data still loading!')
        return LoadTask.objects.create(
            session=self,
        )

    @property
    def data_load_in_progress(self):
        return bool(LoadTask.objects.filter(
            finished=False,
            session=self,
        ).count())
