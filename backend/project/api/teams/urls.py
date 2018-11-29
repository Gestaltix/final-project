from django.urls import path

from .views import ListCreateTeamView, GetUpdateDeleteTeamView, ListCreateTeamMemberView, GetUpdateDeleteTeamMemberView

urlpatterns = [
    path('', ListCreateTeamView.as_view()),
    path('<int:pk>/', GetUpdateDeleteTeamView.as_view()),
    path('<int:pk>/members/', ListCreateTeamMemberView.as_view()),
    path('members/<int:pk>/', GetUpdateDeleteTeamMemberView.as_view()),
]
