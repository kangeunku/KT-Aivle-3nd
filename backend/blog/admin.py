from django.contrib import admin
from .models import Post
# Register your models here.

# admin 페이지에 연결
admin.site.register(Post)