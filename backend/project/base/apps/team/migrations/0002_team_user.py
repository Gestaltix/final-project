# Generated by Django 2.0.3 on 2018-11-27 14:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='teams', to=settings.AUTH_USER_MODEL, verbose_name='user'),
            preserve_default=False,
        ),
    ]
