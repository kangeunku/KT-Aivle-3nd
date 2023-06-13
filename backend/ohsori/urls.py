# blog/urls.py
from django.urls import path,include
from .views import views, api_views, db_views
from rest_framework import routers

app_name = 'ohsori'

# default 라우터 설정
# router = routers.DefaultRouter()
# 라우터에 등록
# router.register(r'Post/' , views.postview, basename='postModel')

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', api_views.index, name='api'),
    path('db/', db_views.index, name='db')
]