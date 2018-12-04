from django.core.files.base import ContentFile
from rest_framework import serializers
from zipfile import ZipFile
from project.api.files.serializers import FileSerializer
from project.base.apps.trackers.models import Session
from project.base.apps.trackers.models.file import File
from project.base.apps.calculations.models.data import Data, PowerCategroy


class SessionSerializer(serializers.ModelSerializer):
    files = FileSerializer(read_only=True, many=True)

    class Meta:
        model = Session
        fields = ['id', 'file', 'team', 'tracker', 'files', 'data_load_in_progress', 'data_calculation_in_progress',
                  'power_categories_calculation_in_progress']
        read_only_fields = ['id']

    def create(self, validated_data):
        session = Session.objects.create(**validated_data)

        input_zip = ZipFile(session.file.path)

        for name in input_zip.namelist():
            if '.csv' in name and '__MACOSX' not in name:
                file = File.objects.create(
                    session=session,
                    filename=name,
                )
                file.file.save(name=name, content=ContentFile(input_zip.read(name)))
        return session


class CalculatedDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = ['velocity', 'acceleration',
                  'em', 'es', 'watt_kg', 'load',
                  'member', 'session', 'category', 'time']


class PowerCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = PowerCategroy
        fields = ['category', 'session', 'member', 'total_energy_kj_per_kg', 'total_time_sec', 'anareobic_reserve', 'critical_power', 'total_player_load']