from django.urls import path

from project.api.views.helloworld import HelloWorld

urlpatterns = [
    path('', HelloWorld.as_view(), name='hello-world')
]
