from rest_framework import generics

from api.serializers.team_serializer import TeamSerializer
from base.apps.team.models import Team


class GetTeams(generics.ListAPIView):
    serializer_class = TeamSerializer
    
    def get_queryset(self):
        return Team.objects.filter(user=self.request.user)