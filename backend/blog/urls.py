# blog/urls.py
from django.urls import path,include
from . import views
from rest_framework import routers
from .serializers import postSerializer

app_name = 'blog'

# default 라우터 설정
router = routers.DefaultRouter()
# 라우터에 등록
router.register(r'Post/' , views.postview, basename='postModel')

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('db/', views.listFunc, name='listfunc')
]