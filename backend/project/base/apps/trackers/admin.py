from django.contrib import admin
from .models import Data, Session, File, Tracker

admin.site.register(Data)
admin.site.register(Session)
admin.site.register(File)
admin.site.register(Tracker)
