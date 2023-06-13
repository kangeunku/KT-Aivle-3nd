from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.db import connection
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
# 모델을 json 타입으로 데이터로 직렬화 시키기위해
import json
# from .serializers import postSerializer
from ..models import User, Good, Basket, Faq, Qna, Survey

# orm sql
# https://www.qu3vipon.com/django-orm

def index(request):
    return HttpResponse("안녕?")


#  rest api 사용
# class postview(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = postSerializer