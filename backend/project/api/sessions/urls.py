from django.urls import path

from .views import DataSend, SessionListView, ParticularSession

urlpatterns = [
    path('', SessionListView.as_view()),
    path('create/', DataSend.as_view()),
    path('<int:pk>/', ParticularSession.as_view())
]
