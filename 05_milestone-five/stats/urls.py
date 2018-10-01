from django.conf.urls import url
from .views import return_stats

urlpatterns = [
    url(r'^$', return_stats, name = 'return_stats'),
    ]