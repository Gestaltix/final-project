# Generated by Django 2.0.3 on 2018-11-27 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trackers', '0002_auto_20181127_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(null=True, upload_to='', verbose_name='file'),
        ),
    ]
