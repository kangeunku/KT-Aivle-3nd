from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# 모델을 json 타입으로 데이터로 직렬화 시키기위해
from django.core import serializers
import json
from rest_framework.renderers import JSONRenderer

from rest_framework import viewsets
from .serializers import postSerializer
from .models import Post
from django.db import connection
# orm sql
# https://www.qu3vipon.com/django-orm

def index(request):
    message = request.GET.get('abc')
    print(message)
    return HttpResponse("안녕?")

# db 사용
def listFunc(request):
    # datas = Post.objects.all()
    # print("xxxxxxxxxxxxxxxxxxxx")
    # print(datas)
    # print("xxxxxxxxxxxxxxxxxxxx")
    # return HttpResponse({'data':datas})
    
    sql = "select * from blog_post"
    cursor = connection.cursor()
    # sql 반영
    cursor.execute(sql)
    # 배열 형식으로 받아옴
    datas = cursor.fetchall()
    data = postSerializer(datas, many=True)
    return HttpResponse(data)


#  rest api 사용
class postview(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = postSerializer