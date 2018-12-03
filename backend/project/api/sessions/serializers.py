from django.core.files.base import ContentFile
from rest_framework import serializers
from zipfile import ZipFile
from project.base.apps.trackers.models import Session
from project.base.apps.trackers.models.session import File


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['id', 'file', 'team', 'tracker']
        read_only_fields = ['id']

    def create(self, validated_data):
        session = Session.objects.create(**validated_data)

        input_zip = ZipFile(session.file.path)

        for name in input_zip.namelist():
            if '.csv' in name and not '__MACOSX' in name:
                file = File.objects.create(
                    session=session,
                )
                file.file.save(name=name, content=ContentFile(input_zip.read(name)))
        return session
