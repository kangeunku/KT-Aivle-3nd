# blog/urls.py
from django.urls import path,include
from .views import goods_views, views, api_views, db_views, test_views, main_views
from rest_framework import routers

app_name = 'ohsori'

# default 라우터 설정
router = routers.DefaultRouter()
# 라우터에 등록
router.register('users', api_views.userview, basename='userModel')

urlpatterns = [
    path('api/', include(router.urls)),
    path('db/goods/', db_views.GoodAPI.as_view(), name ='goods'),
    path('db/goods/<int:goods_no>/', db_views.GoodAPI.as_view(), name ='goods'),
    path('db/basket/<int:user_no>/', db_views.BasketAPI.as_view(), name='basket_info'),
    path('db/basketadd/', db_views.BasketAddAPI.as_view(), name='basket_add'),
    path('db/basketdel/<int:basket_no>/', db_views.BasketDelAPI.as_view(), name='basket_del'),
    # path('api2/', api_views.post_api, name='hi'),
    # path('test/', test_views.index, name='test'),
    # path('test/send', test_views.send, name='test_send'),
    # path('main/', main_views.index, name='main'),
    # path('main/search1/', main_views.first_search, name='main_first_search'),
    # path('main/search2/', main_views.second_search, name='main_second_search'),
    path('goods/', goods_views.index, name='goods'),
    path('goods/test/', goods_views.get_details, name='goods_get_details'),
]