from django.shortcuts import render

# Create your views here.

def return_base(request):
    """
    Returns the base.html template
    """
    return render(request, "base.html")