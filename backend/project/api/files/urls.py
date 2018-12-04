from django.urls import path
from project.api.files.views import FilesFromSessions, MapFileToMember

urlpatterns = [
    path('<int:pk>/', FilesFromSessions.as_view()),
    path('update/<int:pk>/', MapFileToMember.as_view())
]
