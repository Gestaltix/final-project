from django.urls import path

from .views import DataSend, SessionListView, LoadSessionData

urlpatterns = [
    path('', SessionListView.as_view()),
    path('create/', DataSend.as_view()),
    path('load-data/<int:pk>/', LoadSessionData.as_view()),
]
