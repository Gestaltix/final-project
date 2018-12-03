from django.urls import path

from .views import DataSend, SessionListView

urlpatterns = [
    path('', SessionListView.as_view()),
    path('create/', DataSend.as_view()),
]
