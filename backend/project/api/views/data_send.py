from zipfile import ZipFile

from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from rest_framework.views import APIView

from project.functions.calc_power import make_df


class DataSend(APIView):
    def post(self, request, **kwargs):
        myfile = request.FILES['filepond']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        file_name = f'/media-files/{filename}'
        print("filename", file_name)
        with ZipFile(file_name, 'r') as zipf:
            zipf.printdir()
            print('Extracting all the files now...')
            files = zipf.extractall()
            print('Done!', files)
        return HttpResponse({'data': f"{make_df('/01.csv', 'fieldwiz')}"})
