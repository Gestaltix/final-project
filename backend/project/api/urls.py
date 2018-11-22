from django.urls import path

from api.views.data_send import DataSend
from project.api.views.helloworld import HelloWorld

urlpatterns = [
    path('', HelloWorld.as_view(), name='hello-world'),
    path('dataSend/', DataSend.as_view())
]
