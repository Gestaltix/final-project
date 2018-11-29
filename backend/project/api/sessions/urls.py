from django.urls import path

from .views import DataSend

urlpatterns = [
    path('create/', DataSend.as_view()),
]
