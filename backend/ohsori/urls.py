# blog/urls.py
from django.urls import path,include
from .views import views, api_views, db_views
from rest_framework import routers

app_name = 'ohsori'

# default 라우터 설정
router = routers.DefaultRouter()
# 라우터에 등록
router.register('users', api_views.userview, basename='userModel')

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('db/', db_views.index, name='db'),
    path('api2/', api_views.post_api, name='hi'),
]