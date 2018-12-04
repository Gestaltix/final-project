from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.response import Response

from project.base.apps.team.models import Team, Member
from project.api.teams.serializers import TeamSerializer, MemberSerializer


class ListCreateTeamView(ListCreateAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(user=self.request.user)


class GetUpdateDeleteTeamView(RetrieveUpdateDestroyAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(user=self.request.user)


class ListCreateTeamMemberView(ListAPIView):
    serializer_class = MemberSerializer
    queryset = Team.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(user=self.request.user)

    def get(self, request, **kwargs):
        team = self.get_object()
        return Response(self.serializer_class(team.members.all(), many=Team).data)

    def post(self, request, **kwargs):
        team = self.get_object()
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data.update({
            'team': team,
        })
        member = serializer.create(serializer.validated_data)
        return Response(self.serializer_class(member).data)


class GetUpdateDeleteTeamMemberView(RetrieveUpdateDestroyAPIView):
    serializer_class = MemberSerializer
    queryset = Member.objects.all().order_by('-created')

    def filter_queryset(self, queryset):
        return queryset.filter(team__user=self.request.user)