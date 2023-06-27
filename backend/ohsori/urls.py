# blog/urls.py
from django.urls import path, include, re_path
from .views import goods_views, db_views, main_views,stt_views
from rest_framework import routers
from knox import views as knox_views

app_name = 'ohsori'

# default 라우터 설정
router = routers.DefaultRouter()

# 라우터에 등록
urlpatterns = [
    path('v1/stt/', stt_views.transcribe_streaming, name ='stt'),
    path('v1/basket/', db_views.BasketsAPI.as_view(), name='basket'),
    path('v1/basket2/', db_views.Baskets_Add_DelAPI.as_view(), name='basket2'),
    path("v1/survey/", db_views.SurveyAPI.as_view(), name="survey"),
    path("v1/qna/", db_views.QnaAPI.as_view(), name="qna"),
    path("v1/faq/", db_views.SurveyAPI.as_view(), name="faq"),
    path('v1/search1/', main_views.first_search, name='main_first_search'),
    path('v1/search2/', main_views.second_search, name='main_second_search'),
    path('v1/detail/', goods_views.get_details, name='goods_get_details'),
]