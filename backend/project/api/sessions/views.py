import pandas

from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from project.base.apps.calculations.models.data import Data, PowerCategroy
from project.api.sessions.serializers import SessionSerializer, CalculatedDataSerializer, PowerCategorySerializer
from project.base.apps.team.models import Team, Member
from project.base.apps.trackers.models import Session

User = get_user_model()


class DataSend(CreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = SessionSerializer
    queryset = Session.objects.all()


class SessionListView(ListAPIView):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(team__user=self.request.user)


class ParticularSession(RetrieveAPIView):
    serializer_class = SessionSerializer

    def get_queryset(self):
        return Session.objects.filter(team__user=self.request.user)


class LoadSessionData(GenericAPIView):
    queryset = Session.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(team__user=self.request.user)

    def post(self, request, **kwargs):
        session = self.get_object()
        try:
            session.load_data()
        except Exception as e:
            return Response({
                'details': e.message,
            }, 400)
        return Response({
            'details': 'Loading in progress!',
        })


class CalculateSession(GenericAPIView):
    queryset = Session.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(team__user=self.request.user)

    def post(self, request, **kwargs):
        session = self.get_object()
        try:
            session.calculate_data()
        except Exception as e:
            return Response({
                'details': e.message,
            }, 400)
        return Response({
            'details': 'Calculation in progress!',
        })


class CalculatePowerCategoriesSession(GenericAPIView):
    queryset = Session.objects.all()

    def filter_queryset(self, queryset):
        return queryset.filter(team__user=self.request.user)

    def post(self, request, **kwargs):
        session = self.get_object()
        try:
            session.calculate_power_categories()
        except Exception as e:
            return Response({
                'details': e.message,
            }, 400)
        return Response({
            'details': 'Calculation in progress!',
        })


class GetSessionData(GenericAPIView):
    queryset = Data.objects.all()

    def get(self, request, **kwargs):
        data = self.queryset.filter(session_id=self.kwargs.get('pk')).values()
        df = pandas.DataFrame.from_dict(list(data))
        df.set_index("time", inplace=True)
        df = df.resample("20s").mean()
        df.reset_index(inplace=True)
        return Response(df.to_dict('records'))


class GetSessionPowerCategories(GenericAPIView):
    serializer_class = PowerCategorySerializer
    queryset = Session.objects.all()

    def get(self, request, **kwargs):
        session = self.get_object()
        result = {}
        for member in session.team.members.all():
            result[member.id] = self.serializer_class(
                member.calculated_power_category_data.filter(session=session),
                many=True
            ).data
        return Response(result)


class GetPlayerData(GenericAPIView):
    queryset = Member.objects.all()

    def get(self, request, **kwargs):
        member = self.get_object()
        result = []
        # Filter only for one category because the data is the same for all of them
        for datapoint in member.calculated_power_category_data.filter(category=-1).order_by('created'):
            result.append({
                'time': datapoint.session.created,
                'anareobic_reserve': datapoint.anareobic_reserve,
                'critical_power': datapoint.critical_power,
                'total_player_load': datapoint.total_player_load,
            })
        return Response(result)
