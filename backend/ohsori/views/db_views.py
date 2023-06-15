from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
import json

from ..serializers import UserSerialize
from ..models import Users, Good, Basket, Faq, Qna, Survey


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