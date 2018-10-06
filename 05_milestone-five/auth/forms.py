from django import forms
from django.contrib.auth.models import User


class UserCreationForm(forms.ModelForm):
    """
    A form that creates a user, with no privileges, from the given username, email and
    password
    """
    error_messages = {
        'password_mismatch': ("The two password fields didn't match."),
    }
    password1 = forms.CharField(label = ("Password"), widget = forms.PasswordInput)
    password2 = forms.CharField(label = ("Password confirmation"), widget = forms.PasswordInput, help_text = ("Enter the same password as above, for verification."))

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def clean_email(self):
        """
        Ensures email addresses are unique
        """
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        if User.objects.filter(email=email).exclude(username=username):
            raise forms.ValidationError(u'Email addresses must be unique.')
        return email
    
    def clean_password2(self):
        """
        Ensures password1 and password2 are valid and matching
        """
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def save(self, commit = True):
        """
        Save and store user
        """
        user = super(UserCreationForm, self).save(commit = False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()

        return user

        
class AuthenticationForm(forms.Form):
    """
    Base class for authenticating users
    """
    username = forms.CharField(max_length = 254)
    password = forms.CharField(label = ("Password"), widget = forms.PasswordInput)

    error_messages = {
        'invalid_login': ("Please enter a correct %(username)s and password. "
                           "Note that both fields may be case-sensitive."),
    }
    
    