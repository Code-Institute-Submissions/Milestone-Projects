from django.forms import forms, ModelForm
from .models import Ticket

class TicketForm(ModelForm):
    """
    Using the Ticket model to create a form to populate its attributes
    """
    class Meta:
        model = Ticket
        # Exclude this field as the user will only be able to upvote an existing Ticket
        exclude = ['upvotes']
    
        