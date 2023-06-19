from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.db import connection
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from django.middleware.csrf import get_token
# 모델을 json 타입으로 데이터로 직렬화 시키기위해
import json
# from ..models import Users, Good, Basket, Faq, Qna, Survey
from django.views.decorators.csrf import ensure_csrf_cookie
# CSRF 403에러를 방지,, 그냥 야매로 CSRF 방식제거
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    if request.method == 'POST':
        print(request.POST)
        data = request.POST.get('data','')
        state = request.POST.get('state','')
        callback = request.POST.get('callback','')
        
    if request.method == 'GET':
        data = request.GET.get('data','')
        state = request.GET.get('state','')
        callback = request.GET.get('callback','')
    
    
    print("data:",data)
    print("state:",state)
    print("callback:",callback)
    # 실행시킬 함수 딕셔너리
    func_dic = {
        '': no_request,
        'first_fun' : first_fun,
        'second_fun': second_fun,
    }
    # 등록된 함수 실행
    data_return = func_dic[state](data)
    
    # 전송될 데이터 형식 
    result = {
        'data' : data_return,
        'callback': callback
    }
    return JsonResponse(result)

def first_fun(text):
    print(text)
    return "first_fun"

def second_fun(text):
    return "second_fun"

def no_request(text):
    print ("text:"+ text)
    return "no!!!"