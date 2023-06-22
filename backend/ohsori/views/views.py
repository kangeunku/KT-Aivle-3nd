from rest_framework.response import Response
from rest_framework.views import APIView
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

class IndexAPI(APIView):    
    def post(self, request):
        print(request.data)
        data = request.data.get('data')
        state = request.data.get('state')
        callback = request.data.get('callback')
        
        print("data:", data)
        print("state:", state)
        print("callback:", callback)

        return Response(request.data)

def first_fun(text):
    print(text)
    return "first_fun"

def second_fun(text):
    return "second_fun"

def no_request(text):
    print ("text:"+ text)
    return "no!!!"