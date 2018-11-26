import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from zipfile import ZipFile
from functions.calc_power import make_df


class DataSend(APIView):
    def post(self, request, **kwargs):
        myfile = request.FILES['filepond']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        file_name = f'/media-files/{filename}'
        print("filename", file_name)
        with ZipFile(file_name, 'r') as zip:
            zip.printdir()
            print('Extracting all the files now...')
            files = zip.extractall()
            print('Done!')
        return HttpResponse({'data': f"{make_df('/01.csv', '.CSV')}"})
