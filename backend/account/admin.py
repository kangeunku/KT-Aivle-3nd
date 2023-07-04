from django.contrib import admin
from .models import Users
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'nickname', 'is_staff', 'is_superuser', 'use_yn') # 권한여부 display (일반유저, 관리자유저)

# admin 페이지에 연결
admin.site.register(Users, CustomUserAdmin) # 회원가입한 사람들
