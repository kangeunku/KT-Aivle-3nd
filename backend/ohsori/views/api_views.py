from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
# Create your views here.

def index(request):
    return HttpResponse('api_views')


#  rest api 사용
# class postview(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = postSerializer