from django.urls import path

from .views import DataSend, Sessions

urlpatterns = [
    path('create/', DataSend.as_view()),
    path('', Sessions.as_view()),
]
