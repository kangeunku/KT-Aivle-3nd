from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import RegistrationForm, LoginForm
from .models import CustomUser

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('Users_list')  # Replace 'home' with the URL name of your home page
    else:
        form = RegistrationForm()
    return render(request, 'registration/register.html', {'form': form})

def Users_list(request):
    users = CustomUser.objects.all()
    return render(request, 'registration/Users_list.html', {'users': users})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('templates/registration/success.html')  # Replace 'home' with the URL name of your home page
            else:
                form.add_error(None, 'Invalid username or password.')
    else:
        form = LoginForm()
    print(request)
    return render(request, 'registration/login.html', {'form': form})