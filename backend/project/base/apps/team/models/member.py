from django.db import models
from django_extensions.db.models import TimeStampedModel

class Member(TimeStampedModel):
    team = models.ForeignKey(
        verbose_name='team',
        to='team.Team',
        related_name='members',
        on_delete=models.CASCADE,
    )
    name = models.CharField(
        verbose_name='name',
        max_length=200,
    )
    height = models.FloatField(
        verbose_name='height'
    )
    weight = models.FloatField(
        verbose_name='weight',
    )
    birthday = models.DateField(
        verbose_name='birthday'
    )

    def __str__(self):
        return self.name
