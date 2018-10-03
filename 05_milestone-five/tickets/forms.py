from django import forms
from .models import Ticket

class TicketForm(forms.ModelForm):
    """
    Using the Ticket model to create a form to populate its attributes
    """
    class Meta:
        model = Ticket
        # Exclude these fields as the user will only be able to upvote an existing Ticket
        # and the status of a new ticket will automatically be 'To Do'
        exclude = ['upvotes', 'status', 'comments', 'is_feature']
        
        
            
    
        