from django.conf.urls import url
from .views import return_tickets

urlpatterns = [
    url(r'^$', return_tickets, name = 'return_tickets')
    ]