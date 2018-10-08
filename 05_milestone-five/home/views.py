from django.shortcuts import render

# Create your views here.

def return_index(request):
    """
    Returns the index.html template
    """
    return render(request, "index.html", { "page_title": "Home" } )