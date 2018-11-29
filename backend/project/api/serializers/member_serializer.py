from rest_framework import serializers
from project.base.apps.team.models import Member


class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = ['name', 'weight', 'height', 'birthday']