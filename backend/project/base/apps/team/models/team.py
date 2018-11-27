from django.contrib.auth import get_user_model
from django.db import models
from django_extensions.db.models import TimeStampedModel

User = get_user_model()


class Team(TimeStampedModel):
    user = models.ForeignKey(
        verbose_name='user',
        to=User,
        related_name='teams',
        on_delete=models.CASCADE,
    )
    name = models.CharField(
        verbose_name='name',
        max_length=200,
    )

    def __str__(self):
        return self.name
