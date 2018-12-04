from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from project.api.sessions.serializers import SessionSerializer
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

    def post(self):
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
