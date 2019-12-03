from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from gallery.urls import router
from django.views.generic.base import TemplateView
from gallery.views import JobsViewSet
from rest_registration.api.urls import register, logout, login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', register, name='register'),
    path('api/logout/', logout, name='logout'),
    path('api/login/', login, name='login'),
    path('api/job/', JobsViewSet.as_view(), name="job"),
    path('api/', include(router.urls)),
]

if not settings.DOCKER:
    urlpatterns += path('', TemplateView.as_view(template_name="index.html")),
    urlpatterns += path('login/', TemplateView.as_view(template_name="index.html")),
    urlpatterns += path('registration/', TemplateView.as_view(template_name="index.html")),
    urlpatterns += path('<int:pk>/', TemplateView.as_view(template_name="index.html")),
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
