from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Users

class RegistrationForm(UserCreationForm):
    class Meta:
        model = Users
        fields = ('username', 'nickname')  # Add any additional fields you want to include in the form

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)