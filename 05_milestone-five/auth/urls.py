from django.conf.urls import url, include
from .views import register, login, logout

urlpatterns = [
    url(r'^register/', register, name = 'register'),
    url(r'^login/', login, name = 'login'),
    url(r'^logout/', logout, name = 'logout'),
    url(r'^', include('django.contrib.auth.urls')),
]