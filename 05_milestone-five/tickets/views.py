from django.shortcuts import render, reverse, redirect, get_object_or_404
from .forms import TicketForm
from .models import Ticket

# Create your views here.

def return_tickets(request):
    """
    Return the tickets.html template, displays current tickets and a form to allow new tickets to be created
    """
    
    # All created tickets 
    tickets = Ticket.objects.all()
    
    if request.method == "POST":
        ticket_form = TicketForm(request.POST)
        
        if ticket_form.is_valid():
            ticket_form.save()
            return redirect(reverse('tickets'))
    
    else:
        ticket_form = TicketForm()
    
    return render(request, "tickets.html", { "form": ticket_form , "tickets": tickets } )
    