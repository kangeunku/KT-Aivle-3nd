from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add any additional fields you need for your user model
    # For example:
    nickname = models.TextField()
    pass
