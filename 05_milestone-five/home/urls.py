from django.conf.urls import url
from .views import return_index

urlpatterns = [
    url(r'^$', return_index, name = 'return_index') 
    ]