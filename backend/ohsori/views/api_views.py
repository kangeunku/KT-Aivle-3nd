from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
from ..serializers import UserSerialize
from ..models import Users, Good, Basket, Faq, Qna, Survey
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

def index(request):
    return HttpResponse('api_views')

#  rest api 사용
class userview(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerialize
    print(serializer_class)
    
@api_view(['POST'])
def post_api(request):
    if request.method == 'GET':
        return HttpResponse(status=200)
    if request.method == 'POST':
        serializer = UserSerialize(data = request.data, many=True)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data ,status=200)
        return Response(serializer.errors ,status=status.HTTP_400_BAD_REQUEST)