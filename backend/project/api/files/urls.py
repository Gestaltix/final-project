from django.urls import path
from project.api.files.views import FilesFromSessions

urlpatterns = [
    path('<int:pk>/', FilesFromSessions.as_view())
]
