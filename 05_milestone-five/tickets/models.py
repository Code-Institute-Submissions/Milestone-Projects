from django.db import models
from django.utils import timezone


# Create your models here.

# Issue choices to be passed to Ticket model
ISSUE_TYPE = (
    ('BUG', 'Bug'),
    ('FEATURE', 'Feature')
    )
    
# Status to be passed to Ticket model
STATUS_TYPE = (
    ('1', 'To Do'),
    ('2', 'Doing'),
    ('3', 'Done')
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
    status = models.CharField(max_length = 10, choices = STATUS_TYPE, default = 'To Do')
    
    def __str__(self):
        return "{0}-{1}-{2}".format(self.name, self.topic, self.date)


class Comment(models.Model):
    """
    Allows users to add comments to existing issues
    """
    comment = models.TextField()
    ticket = models.ForeignKey(Ticket, related_name = 'comments')

    def __str__(self):
        return "{0}-{1}".format(self.comment, self.ticket)