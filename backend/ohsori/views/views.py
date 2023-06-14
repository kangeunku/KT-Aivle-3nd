from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.db import connection
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
# 모델을 json 타입으로 데이터로 직렬화 시키기위해
import json
# from .serializers import postSerializer
# from ..models import Users, Good, Basket, Faq, Qna, Survey
from django.views.decorators.csrf import ensure_csrf_cookie

# orm sql
# https://www.qu3vipon.com/django-orm

@ensure_csrf_cookie
def index(request):
    data = request.GET.get('data','')
    state = request.GET.get('state','')
    callback = request.GET.get('callback','')
    
    # 실행시킬 함수 함수
    func_dic = {
        'first_fun' : first_fun,
        'second_fun': second_fun,
    }
    # 등록된 함수 실행
    data_return = func_dic[state](data)
    
    # 전송될 데이터 형식 
    restult = {
        'data' : data_return,
        'callback': callback
    }
    return JsonResponse(restult)    

def first_fun(text):
    return "first_fun"

def second_fun(text):
    return "second_fun"
#  rest api 사용
# class postview(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = postSerializer