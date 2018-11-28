import datetime
from zipfile import ZipFile

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from rest_framework.views import APIView

from project.base.apps.team.models import Team, Member
from project.base.apps.trackers.models import Session, Tracker, File as TrackerFile


User = get_user_model()


class DataSend(APIView):
    def post(self, request, **kwargs):
        myfile = request.FILES['filepond']
        tracker, created = Tracker.objects.get_or_create(
            name='Tracker 1',
        )
        team, created = Team.objects.get_or_create(
            name='Team1',
            user=User.objects.first(),
        )
        session, created = Session.objects.get_or_create(
            tracker=tracker,
            team=team,
            file=myfile,
        )
        member, created = Member.objects.get_or_create(
            name='Member1',
            team=team,
            weight=77.00,
            birthday=datetime.datetime.today(),
        )
        input_zip = ZipFile(session.file.path)

        for name in input_zip.namelist():
            if '.csv' in name and not '__MACOSX' in name:
                file = TrackerFile.objects.create(
                    session=session,
                    member=member,
                )
                file.file.save(name=name, content=ContentFile(input_zip.read(name)))
        return HttpResponse({'data': f"OK"})
