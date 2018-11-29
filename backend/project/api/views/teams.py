from rest_framework import generics

from project.api.serializers.team_serializer import TeamSerializer
from project.base.apps.team.models import Team


class Teams(generics.ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(user=self.request.user)