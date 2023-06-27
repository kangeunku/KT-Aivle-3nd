from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    username = models.CharField(max_length=50, primary_key=True, help_text = "사용자 아이디")
    nickname = models.TextField(max_length = 50, help_text = "사용자 닉네임")
    use_yn = models.CharField(max_length=2, default = 'Y', help_text="사용여부") # y, n,
    pass

class CustomToken(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    token = models.CharField(max_length=500)