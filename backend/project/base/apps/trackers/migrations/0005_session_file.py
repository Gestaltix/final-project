# Generated by Django 2.0.3 on 2018-11-28 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0004_data_member'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='file',
            field=models.FileField(null=True, upload_to='sessions/', verbose_name='file'),
        ),
    ]
