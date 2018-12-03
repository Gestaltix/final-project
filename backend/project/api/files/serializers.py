from rest_framework.serializers import ModelSerializer

from project.api.sessions.serializers import SessionSerializer
from project.base.apps.trackers.models.session import File


class FileSerializer(ModelSerializer):
    session = SessionSerializer()
    class Meta:
        model = File
        fields = ['member', 'session', 'id', 'file']
        read_only_fields = ['id']