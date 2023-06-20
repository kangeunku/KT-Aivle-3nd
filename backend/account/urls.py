from django.urls import path, include
from .views import register, Users_list, login_view
urlpatterns = [
    path('register/', register, name='register'),
    path('list/', Users_list, name='Users_list'),
    path('', login_view, name='login'),
]