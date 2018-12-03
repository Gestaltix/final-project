from django.contrib.auth import get_user_model
from rest_framework import serializers

from project.base.apps.team.models import Team, Member

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = ['id', 'name', 'weight', 'height', 'birthday']

    def create(self, validated_data):
        return Member.objects.create(
            **validated_data,
        )


class TeamSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'user']

    def create(self, validated_data):
        return Team.objects.create(
            **validated_data,
            user=self.context.get('request').user,
        )
