# blog/urls.py
from django.urls import path,include
from .views import goods_views, views,db_views, test_views, main_views, login_views
from rest_framework import routers
from knox import views as knox_views
from django.views.decorators.csrf import csrf_exempt
app_name = 'ohsori'

# default 라우터 설정
router = routers.DefaultRouter()

# 라우터에 등록
urlpatterns = [
    path('db/good/', db_views.GoodsAPI.as_view(), name ='goods'),
    path('db/basket/', db_views.BasketsAPI.as_view(), name='basket'),
    path("db/survey/", db_views.SurveyAPI.as_view(), name="survey"),
    path("db/qna/", db_views.QnaAPI.as_view(), name="qna"),
    path("db/faq/", db_views.SurveyAPI.as_view(), name="faq"),
    path("test/", db_views.TestAPI.as_view(), name="test"),
    path('main/', main_views.index, name='main'),
    path('main/search1/', main_views.first_search, name='main_first_search'),
    path('main/search2/', main_views.second_search, name='main_second_search'),
    path('register/', login_views.RegisterAPI.as_view(), name='register'), # knox 회원가입 api
    path('login/', login_views.LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('user/', login_views.UserDetailView.as_view(), name='user') #user정보
]