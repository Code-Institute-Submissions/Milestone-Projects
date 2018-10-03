from django.shortcuts import render, reverse, redirect, get_object_or_404
from django.utils import timezone
from django.conf import settings
from .forms import TicketForm
from .models import Ticket, Comment, TicketFilter
import stripe


# Create your views here.

def return_tickets(request):
    """
    Return the tickets.html template, displays current tickets and a form to allow new tickets to be created
    """
    
    # All created tickets 
    tickets = Ticket.objects.all()
    
    # Filter on associated fields using TicketFilter
    tickets_filter = TicketFilter(request.GET, queryset = tickets)
    
    comments = Comment.objects.all()
    
    if request.method == "POST":
        ticket_form = TicketForm(request.POST)
        
        if ticket_form.is_valid():
            ticket_form.save()
            return redirect(reverse('return_tickets'))
    
    else:
        ticket_form = TicketForm()
        
    return render(request, "tickets.html", { "form": ticket_form , "filter": tickets_filter , "comments": comments , "publishable": settings.STRIPE_PUBLISHABLE } )
    
    
def add_comment(request, id):
    """
    Add a comment posted in tickets.html to the associated ticket using its id
    """
    current_ticket = Ticket.objects.get(pk = id)
    
    if request.method == "POST":
        # Create new Comment instance using the POST request and storing value in the current_ticket variable
        comment = Comment.objects.create(comment = request.POST['comment'], ticket = current_ticket)
        
    return redirect(reverse('return_tickets') )
    

def make_payment(request, id):
    """
    Enables users to pledge funds through the Stripe API to back a feature request 
    """
    
    current_ticket = Ticket.objects.get(pk = id)
    
    # Reference to Stripe key 
    stripe.api_key = settings.STRIPE_SECRET
    
    # Create charge for the request
    if request.method == "POST":
        charge = stripe.Charge.create(
            amount = 500,
            currency = 'eur',
            description='Feature Pledge',
            source = request.POST['stripeToken'],
        )
        # Update total and upvotes for given feature
        current_ticket.total += int(round(charge["amount"] / 100, 2))
        current_ticket.upvotes += 1
        current_ticket.save()
        print (charge["amount"])
        
    return redirect(reverse('return_tickets') )
