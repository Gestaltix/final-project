import django.db.models as models
from django.contrib.auth import get_user_model
from datetime import datetime

User = get_user_model()

class RawData(models.Model):
    time = models.DateTimeField(
        verbose_name='time'
    )
    xPos = models.FloatField(
        verbose_name='xPos'
    )
    yPos = models.FloatField(
        verbose_name='yPos'
    )
    latitude = models.FloatField(
        verbose_name='latitude'
    )
    longitude = models.FloatField(
        verbose_name='longitude'
    )
    speed = models.FloatField(
        verbose_name='speed'
    )
    numSatFix = models.FloatField(
        verbose_name='numSatField'
    )
