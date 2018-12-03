from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from project.api.sessions.serializers import SessionSerializer
from project.base.apps.trackers.models import Session

User = get_user_model()


class DataSend(CreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = SessionSerializer
    queryset = Session.objects.all()
