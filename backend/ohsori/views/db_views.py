from django.http import HttpResponse
from django.db import connection

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from ..serializers import UsersSerialize, GoodsSerialize, BasketsSerialize, FaqSerialize, QnaSerialize, SurveySerialize
from ..models import Users, Goods, Baskets, Faq, Qna, Survey
from .goods_views import *
    
class GoodsAPI(APIView): # 상품 정보 API 1
    def get(self, request): # 상품 정보 요청 // good_url
        try:
            good_url = request.data.get('good_url')
            goods = Goods.objects.get(good_url = good_url)
            serializer = GoodsSerialize(goods)
            return Response(serializer.data, status = status.HTTP_200_OK) # 상품 정보 회신
        except Goods.DoesNotExist:
            goods = Goods()
            goods.goods_info = "상품 정보 요약 모델" # 함수로 처리 
            goods.goods_url = good_url
            goods.goods_name = "상품 이름 추출"
            goods.use_yn = "Y"
            goods.save()
            serializer = GoodsSerialize(goods)
            return Response(serializer.data, status = status.HTTP_200_OK) # 상품 정보 저장 후 회신

 # 정참조 users = Users.objects.get(name='뽀삐') /n  Users_basket = users.basket.all()
class BasketsAPI(APIView):
    def get(self, request): # 장바구니 페이지 GET 요청시 장바구니에 있는 상품 전달
        users = Users.objects.get(username = request.user)
        user_baskets = users.baskets.filter(basket_yn = 'Y')
        serializer = BasketsSerialize(user_baskets, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def post(self, request): # basket_yn True or False // 요청 params : goods_url
        goods= Goods.objects.get(goods_url = request.data.get('goods_url'))
        baskets = Baskets()
        baskets.goods_no = goods
        baskets.user_no = Users.objects.get(username = request.user)
        baskets.use_yn = 'Y'
        serializer = BasketsSerialize(baskets)
        baskets.save()
        return Response(serializer.data) # 데이터 회신은 필요없음
    
    def put(self, request): # param : basket_no
        basket = Baskets.objects.get(basket_no = request.data.get('basket_no'))
        basket.basket_yn = "N"
        basket.save()
        return Response(status=status.HTTP_200_OK)    
            
class SurveyAPI(APIView):
    def post(self, request):
        survey = Survey()
        survey.user_no = Users.objects.get(user_no = request.data.get('user_no')) # 세션에서 유저정보 담아서 어떻게어떻게 하기
        survey.score = 5      #체크박스로 점수 해두기 ex : 5
        survey.answer = '도움이 많이 됩니당'               # 건의사항에 대한 답변 받기
        return Response('감사함늬다')

class QnaAPI(APIView):
    def post(self, request):
        qna = Qna()
        qna.user_no = Users.objects.get(user_no = request.data.get('user_no')) # 세션에서 유저정보 담아서 어떻게어떻게 하기
        qna.question = '집에 가고 싶은데 어떻게 해야 하나요' # 질문 받기
        # qna.answer = '우리가 답변 하기' # 추후에 관리자가 답변 수정
        qna.type = '사이트 문의' # 선택으로 type 설정
        # qna.img_url = 'asdfasdf.jpg'  # if문으로 img가 있으면 넣기 null = True라 공백 가능
        qna.use_yn = 'Y'

class Test(APIView):
    def get(self, request):
        print(request)
        print(request.user)
        print(request.data)
        print(request.session)
        print(request.user.is_authenticated)
        print(request.user.username)
        return Response('Good')