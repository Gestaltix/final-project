from rest_framework import serializers

from base.apps.team.models import Team


class TeamSerializer(serializers.Serializer):
    model = Team
    fields = ['name', 'member_set', 'user']