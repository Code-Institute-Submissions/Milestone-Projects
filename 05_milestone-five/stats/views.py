from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Avg, Count, Min, Sum
from django.shortcuts import render
from tickets.models import Ticket, Comment
import json

# Create your views here.

def return_stats(request):
    """
    Returns the stats.html template and associated data for charting
    """
    
    # All tickets
    tickets = Ticket.objects.values("id", "topic", "total", "date", "upvotes", "name")
    
    # Total tickets
    ticket_count = Ticket.objects.all().count()
    
    # Total comments
    comment_count = Comment.objects.all().count()
    
    # Total pledged using Django's aggregation
    total_pledged = Ticket.objects.all().aggregate(Sum("total"))
    
    # Assign value from total_pledged to total variable
    for key, value in total_pledged.items():
        total = value
    
    # Total number of tickets per topic
    feature_count = Ticket.objects.filter(topic = "FEATURE").count()
    bug_count = Ticket.objects.filter(topic = "BUG").count()
    
    # Convert tickets queryset to list and convert data for javascript 
    tickets_list = [ ticket for ticket in tickets ]
    js_data = json.dumps(tickets_list, cls = DjangoJSONEncoder, default = str)
    
    return render(request, "stats.html", { "page_title" : "Issue Stats" , "tickets" : js_data , "feature_count" : feature_count , "bug_count" : bug_count , "ticket_count" : ticket_count , "total" : total } )
    
    
    
    
    