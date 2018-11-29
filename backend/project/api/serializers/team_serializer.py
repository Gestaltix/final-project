from rest_framework import serializers
from project.api.serializers.member_serializer import MemberSerializer
from project.api.serializers.user_serializer import UserSerializer
from project.base.apps.team.models import Team


class TeamSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Team
        fields = ['name', 'members', 'user']