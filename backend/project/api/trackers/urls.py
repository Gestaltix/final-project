from django.urls import path

from .views import TrackerListView

urlpatterns = [
    path('', TrackerListView.as_view()),
]
