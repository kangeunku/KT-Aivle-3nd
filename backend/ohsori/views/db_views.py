from datetime import datetime

from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.generics import get_object_or_404

import json

from ..serializers import UserSerialize, GoodSerialize, BasketSerialize, FaqSerialize, QnaSerialize, SurveySerialize,TestSerialize
from ..models import Users, Good, Basket, Faq, Qna, Survey, Test


def index(request):
    data = listFunc()
    return HttpResponse(data.data)

# db 사용
def listFunc():
    datas = Users.objects.all()
    data = UserSerialize(datas, many=True)
    print("xxxxxxxxxxxxxxxxxxxx")
    print(data.data)
    print("xxxxxxxxxxxxxxxxxxxx")
    return data
    
    # sql = "select * from osori_user"
    # cursor = connection.cursor()
    # # sql 반영
    # cursor.execute(sql)
    # # 배열 형식으로 받아옴
    # datas = cursor.fetchall()
    # data = UserSerialize(datas, many=True)
    # return data
    
class GoodAPI(APIView): # 상품 정보 API
    def get(self, request):
        try:
            good = Good.objects.get(url = url) # 상품 정보 모두 불러오기
            good = Good.objects.all()
            serializer = GoodSerialize(good, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        except ObjectDoesNotExist:
            
            # ml을 통해 내용 요약 생성 및 저장 모델 -
            good.save()
            return response('일단 암거나')

# class BasketAPI(APIView):
#     def post(self, request):
#         # good_no = Good.objects.get(url = url).good_no
#         # serializer = BasketSerialize()
#         # serializer.basket_no = 123
#         # serializer.user_no = user_no
#         # serializer.good_no = good_no
#         # serializer.user_yn = 'Y'
#         # serializer.reg_date = datetime.now()
#         # return Response(serializer.data)
#         # good = Good.objects.get(url = url)
#         # data = {'url' : url, 'user_no' : user_no }
#         # serializer = BasketSerialize

class TestAPI(APIView):
    def post(self, request):
        serializer = TestSerialize(data = request.data)
        if serializer.is_valid():
            # serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)                                           
        else:
            return Response('404')
              
