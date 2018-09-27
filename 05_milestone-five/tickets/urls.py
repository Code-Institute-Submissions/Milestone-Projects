from django.conf.urls import url
from .views import return_tickets, add_comment

urlpatterns = [
    url(r'^$', return_tickets, name = 'return_tickets'),
    url(r'^comment/(?P<id>\d+)', add_comment, name = 'add_comment'),
    ]