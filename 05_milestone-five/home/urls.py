from django.conf.urls import url
from .views import return_base

urlpatterns = [
    url(r'^$', return_base, name = 'return_base') 
    ]