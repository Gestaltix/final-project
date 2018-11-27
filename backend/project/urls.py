from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

mypatterns = [
    path('admin/', admin.site.urls),
    path('', include('project.api.urls')),

]

urlpatterns = [
    path('backend/', include(mypatterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
