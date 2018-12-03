from django.db import models
from django_extensions.db.models import TimeStampedModel


class Tracker(TimeStampedModel):
    name = models.CharField(
        verbose_name='name',
        max_length=200,
        unique=True,
    )

    def __str__(self):
        return self.name
