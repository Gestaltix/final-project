from rest_framework import serializers

from project.base.apps.trackers.models import Session


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['id', 'file', 'team', 'tracker']
        read_only_fields = ['id']
