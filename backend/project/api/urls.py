from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from project.api.views.data_send import DataSend
from project.api.views.helloworld import HelloWorld

urlpatterns = [
    path('', HelloWorld.as_view(), name='hello-world'),
    path('data-send/', DataSend.as_view()),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
