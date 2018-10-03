from django.conf.urls import url
from .views import return_tickets, add_comment, make_payment

urlpatterns = [
    url(r'^$', return_tickets, name = 'return_tickets'),
    url(r'^comment/(?P<id>\d+)', add_comment, name = 'add_comment'),
    url(r'^payment/(?P<id>\d+)', make_payment, name = 'make_payment'),
    ]