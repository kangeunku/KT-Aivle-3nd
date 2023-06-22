# blog/urls.py
from django.urls import path,include
from .views import goods_views, views,db_views, test_views, main_views, login_views
from rest_framework import routers
from knox import views as knox_views

app_name = 'ohsori'

# default 라우터 설정
router = routers.DefaultRouter()
# 라우터에 등록
urlpatterns = [
    path('test/', views.IndexAPI.as_view(), name='hi'),
    path('api/', include(router.urls)),
    path('db/goods/', db_views.GoodsAPI.as_view(), name ='goods'),
    path('db/goods/<int:goods_no>/', db_views.GoodsAPI.as_view(), name ='goods'),
    path('db/basket/<int:user_no>/', db_views.BasketsAPI.as_view(), name='basket_info'),
    path('db/basketadd/', db_views.BasketsAddAPI.as_view(), name='basket_add'),
    path('db/basketdel/<int:basket_no>/', db_views.BasketsDelAPI.as_view(), name='basket_del'),
    # 
    # path('test/', test_views.index, name='test'),
    # path('test/send', test_views.send, name='test_send'),
    path('main/', main_views.index, name='main'),
    path('main/search1/', main_views.first_search, name='main_first_search'),
    path('main/search2/', main_views.second_search, name='main_second_search'),
    path('goods/', goods_views.index, name='goods'),
    path('goods/test/', goods_views.get_details, name='goods_get_details'),
    path('register/', login_views.RegisterAPI.as_view(), name='register'), # knox 회원가입 api
    path('login/', login_views.LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('user/', login_views.UserDetailView.as_view(), name='user') #user정보
]