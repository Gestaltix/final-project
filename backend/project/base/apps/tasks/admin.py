from django.contrib import admin
from .models import LoadTask, CalculateTask, CalculatePowerCategoriesTask

admin.site.register(LoadTask)
admin.site.register(CalculateTask)
admin.site.register(CalculatePowerCategoriesTask)
