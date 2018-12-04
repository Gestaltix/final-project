from django.urls import path

from .views import DataSend, SessionListView, ParticularSession, LoadSessionData, CalculateSession, \
    CalculatePowerCategoriesSession, GetSessionData, GetSessionPowerCategories, GetPlayerData

urlpatterns = [
    path('', SessionListView.as_view()),
    path('create/', DataSend.as_view()),
    path('<int:pk>/', ParticularSession.as_view()),
    path('load-data/<int:pk>/', LoadSessionData.as_view()),
    path('calculate-data/<int:pk>/', CalculateSession.as_view()),
    path('calculate-power-categories/<int:pk>/', CalculatePowerCategoriesSession.as_view()),
    path('get-data-from-session/<int:pk>/', GetSessionData.as_view()),
    path('get-power-categories-from-session/<int:pk>/', GetSessionPowerCategories.as_view()),
    path('get-player-data/<int:pk>/', GetPlayerData.as_view()),
]
