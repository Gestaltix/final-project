from rest_framework.generics import ListAPIView
from project.api.files.serializers import FileSerializer
from project.base.apps.trackers.models.file import File


class FilesFromSessions(ListAPIView):
    serializer_class = FileSerializer

    def get_queryset(self):
        return File.objects.filter(session__id=self.kwargs.get('pk'))
