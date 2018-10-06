from django.shortcuts import render, redirect, reverse, HttpResponseRedirect
from django.contrib import messages, auth
from .forms import UserCreationForm, AuthenticationForm


# Create your views here.

def register(request):
    """
    A view that manages the user creation form
    """
    if request.method == 'POST':
        register_form = UserCreationForm(request.POST)
        if register_form.is_valid():
            register_form.save()
            # Authenticate user with valid form submission for username and password fields
            user = auth.authenticate(username = request.POST.get('username'), password = request.POST.get('password1'))

            if user:
                auth.login(request, user)
                messages.success(request, "Thank you! You have successfully registered")
                return redirect(reverse('return_index') )
            else:
                messages.error(request, "An error occurred. Please try again!")
    else:
        register_form = UserCreationForm()

    return render(request, 'register.html', { "register_form": register_form } )


def login(request):
    """
    A view that manages the authentication form
    """
    if request.method == 'POST':
        auth_form = AuthenticationForm(request.POST)
        if auth_form.is_valid():
            user = auth.authenticate(username = request.POST['username'], password = request.POST['password'])

            if user:
            
                auth.login(request, user)
                messages.error(request, "You have successfully logged in!")
                
                if request.GET and request.GET['next'] != '':
                    next = request.GET['next']
                    return HttpResponseRedirect(next)
                else:
                    return redirect(reverse('return_index') )
            
            else:
                auth_form.add_error(None, "Your username or password are incorrect! Please try again.")
    else:
        auth_form = AuthenticationForm()
        
    return render(request, 'login.html', { "auth_form": auth_form , 'next': request.GET.get('next', '') } )


def logout(request):
    """
    A view that logs the user out and redirects back to the index.html page
    """
    auth.logout(request)
    messages.success(request, 'You have successfully logged out!')
    
    return redirect(reverse('return_index') )
    