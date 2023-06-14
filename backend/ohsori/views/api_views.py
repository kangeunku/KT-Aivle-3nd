from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
from ..serializers import UserSerialize
from ..models import Users, Good, Basket, Faq, Qna, Survey
from rest_framework import viewsets

def index(request):
    return HttpResponse('api_views')

#  rest api 사용
class userview(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerialize
    print(serializer_class)