from rest_framework import routers

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.views import LogoutView
from django.urls import path, include, re_path

from account.views import login_views, user_info_update_views

app_name = 'account'


# default 라우터 설정
router = routers.DefaultRouter()

# 라우터에 등록
urlpatterns = [
    path('v1/register/', login_views.RegisterAPI.as_view(), name='register'), # knox 회원가입 api
    path('v1/login/', login_views.LoginAPI.as_view(), name='login'),
    path('v1/logout/', LogoutView.as_view(), name='logout'),
    path('v1/checkpassword/', user_info_update_views.CheckPasswordAPI.as_view(), name='checkpassword'),
    path('v1/setpassword/', user_info_update_views.SetPasswordAPI.as_view(), name='setpassword'), # 비밀번호 변경
    path('v1/setnickname/', user_info_update_views.SetNicknameAPI.as_view(), name='setnickname'), # 별명 변경 
    path('v1/deleteuser/', user_info_update_views.DeleteUserAPI.as_view(), name='deleteuser'), # 회원 탈퇴
]