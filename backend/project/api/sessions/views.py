from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.parsers import MultiPartParser, FormParser

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
