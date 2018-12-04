from rest_framework.serializers import ModelSerializer
from project.base.apps.trackers.models.file import File


class FileSerializer(ModelSerializer):

    class Meta:
        model = File
        fields = ['member', 'session', 'id', 'file', 'filename']
        read_only_fields = ['id', 'session', 'file', 'filename']
