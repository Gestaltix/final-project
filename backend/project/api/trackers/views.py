from rest_framework.generics import ListAPIView

from project.api.trackers.serializers import TrackerSerializer
from project.base.apps.trackers.models import Tracker


class TrackerListView(ListAPIView):
    serializer_class = TrackerSerializer
    queryset = Tracker.objects.all()
