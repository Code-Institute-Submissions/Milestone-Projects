from django.db import models
from django.utils import timezone


# Create your models here.

ISSUE_TYPE = (
    ('BUG', 'Bug'),
    ('FEATURE', 'Feature')
    )

class Ticket(models.Model):
    """
    Allows users to create tickets by submitting a form with information on the issue including
    its name, description and if its a bug or feature
    """
    name = models.CharField(max_length = 80, blank = False)
    description = models.TextField(blank = False)
    topic = models.CharField(max_length = 7, choices = ISSUE_TYPE, blank = False)
    date = models.DateField(default = timezone.now)
    upvotes = models.IntegerField(default = 1)
    is_feature = models.BooleanField(default = False)
    
    def __str__(self):
        return self.name
