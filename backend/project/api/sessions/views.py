import datetime
from zipfile import ZipFile

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.http import HttpResponse
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from rest_framework.views import APIView

from project.api.sessions.serializers import SessionSerializer
from project.base.apps.team.models import Team, Member
from project.base.apps.trackers.models import Session, Tracker, File as TrackerFile


User = get_user_model()


class DataSend(CreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = SessionSerializer
    queryset = Session.objects.all()
