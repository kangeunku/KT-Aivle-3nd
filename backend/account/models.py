from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import re

# nickname 한글 유효성 검사 
def nickname_valid(value):
    if not re.match(r"^[가-힣]+$",value):
        raise ValidationError("별명은 한글만 가능합니다.")

class Users(AbstractUser):
    username = models.CharField(max_length=50, primary_key=True, help_text = "사용자 아이디")
    nickname = models.TextField(max_length = 50, help_text = "사용자 닉네임", validators=[nickname_valid])
    use_yn = models.CharField(max_length=2, default = 'y', help_text="사용여부") # y, n,
    pass