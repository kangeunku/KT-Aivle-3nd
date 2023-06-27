# blog/urls.py
from django.urls import path, include, re_path
from .views import goods_views, views,db_views, test_views, main_views, login_views, test_request, user_info_update_views
from rest_framework import routers
from knox import views as knox_views
from django.views.decorators.csrf import csrf_exempt


from .views import api_views

from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from drf_yasg import openapi

app_name = 'ohsori'

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[AllowAny],
)


# default 라우터 설정
router = routers.DefaultRouter()

# 라우터에 등록
urlpatterns = [
    path('stt/', api_views.transcribe_streaming, name ='stt'),
    path('db/good/', db_views.GoodsAPI.as_view(), name ='goods'),
    path('db/basket/', db_views.BasketsAPI.as_view(), name='basket'),
    path('db/basket2/', db_views.Baskets_Add_DelAPI.as_view(), name='basket2'),
    path("db/survey/", db_views.SurveyAPI.as_view(), name="survey"),
    path("db/qna/", db_views.QnaAPI.as_view(), name="qna"),
    path("db/faq/", db_views.SurveyAPI.as_view(), name="faq"),
    path('main/', main_views.index, name='main'),
    path('main/search1/', main_views.first_search, name='main_first_search'),
    path('main/search2/', main_views.second_search, name='main_second_search'),
    path('goods/', goods_views.index, name='goods'),
    path('goods/detail/', goods_views.get_details, name='goods_get_details'),
    path('register/', login_views.RegisterAPI.as_view(), name='register'), # knox 회원가입 api
    path('login/', login_views.LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('user/', login_views.UserDetailView.as_view(), name='user'), #user정보
    path('test_request/', test_request.Test.as_view(), name='test_request'),
    path('setpassword/', user_info_update_views.SetPasswordAPI.as_view(), name='setpassword'), # 비밀번호 변경
    path('setnickname/', user_info_update_views.SetNicknameAPI.as_view(), name='s1etpassword'), # 별명 변경 
    path('deleteuser/', user_info_update_views.DeleteUserAPI.as_view(), name='s2etpassword'), # 회원 탈퇴
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]