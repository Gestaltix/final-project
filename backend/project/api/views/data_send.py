from rest_framework.views import APIView
from rest_framework.response import Response


class DataSend(APIView):
    def post(self, request, **kwargs):
        return Response(request)
