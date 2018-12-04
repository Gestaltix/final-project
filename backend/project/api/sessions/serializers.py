from django.core.files.base import ContentFile
from rest_framework import serializers
from zipfile import ZipFile
from project.api.files.serializers import FileSerializer
from project.api.teams.serializers import TeamSerializer
from project.base.apps.trackers.models import Session
from project.base.apps.trackers.models.file import File


class SessionSerializer(serializers.ModelSerializer):
    files = FileSerializer(read_only=True, many=True)

    class Meta:
        model = Session
        fields = ['id', 'file', 'team', 'tracker', 'files', 'data_load_in_progress']
        read_only_fields = ['id']

    def create(self, validated_data):
        session = Session.objects.create(**validated_data)

        input_zip = ZipFile(session.file.path)

        for name in input_zip.namelist():
            if '.csv' in name and not '__MACOSX' in name:
                file = File.objects.create(
                    session=session,
                    filename=name,
                )
                file.file.save(name=name, content=ContentFile(input_zip.read(name)))
        return session
