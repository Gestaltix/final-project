from rest_framework import serializers

from project.base.apps.trackers.models import Tracker


class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = ['id', 'name']
        read_only_fields = fields
