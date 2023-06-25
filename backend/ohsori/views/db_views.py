from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response

from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated

import json
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from ..serializers import UsersSerialize, GoodsSerialize, BasketsSerialize, FaqSerialize, QnaSerialize, SurveySerialize
from ..models import Users, Goods, Baskets, Faq, Qna, Survey
from .goods_views import *

@permission_classes([IsAuthenticated])
class GoodsAPI(APIView): # 상품 정보 API 1
    def get(self, request): # 상품 정보 요청 // goods_url
        try:
            goods_url = request.data.get('goods_url')
            goods = Goods.objects.get(goods_url = goods_url)
            serializer = GoodsSerialize(goods)
            return Response(serializer.data, status = status.HTTP_200_OK) # 상품 정보 회신
        except Goods.DoesNotExist:
            goods_url = request.data.get('goods_url')
            goods = Goods()
            goods.goods_info = "상품 정보 요약 모델" # 함수로 처리 
            goods.goods_url = goods_url
            goods.goods_name = "상품 이름 추출"
            goods.use_yn = "Y"
            goods.save()
            serializer = GoodsSerialize(goods)
            return Response(serializer.data, status = status.HTTP_200_OK) # 상품 정보 저장 후 회신

 # 정참조 users = Users.objects.get(name='뽀삐') /n  Users_basket = users.basket.all()

@permission_classes([IsAuthenticated]) 
@method_decorator(csrf_exempt, name = "dispatch")
class BasketsAPI(APIView):
    def get(self, request): # 장바구니 페이지 GET 요청시 장바구니에 있는 모든 상품 전달
        users = Users.objects.get(username = request.user.username)
        user_baskets = users.baskets.filter(use_yn = 'Y')
        serializer = BasketsSerialize(user_baskets, many = True)
        return Response(serializer.data)
        
        
@permission_classes([IsAuthenticated]) 
@method_decorator(csrf_exempt, name = "dispatch")
class Baskets_Add_DelAPI(View):    
    def post(self, request): # basket_yn True or False // 요청 params : goods_url
        data = json.loads(request.body)
        # goods= Goods.objects.get(goods_url = request.POST.get('goods_url'))
        baskets = Baskets()
        baskets.goods_url = Goods.objects.get(goods_url = data['goods_url'])
        baskets.username = Users.objects.get(username = request.user.username)
        baskets.use_yn = 'Y'
        serializer = BasketsSerialize(baskets)
        baskets.save()
        return JsonResponse(serializer.data) # 데이터 회신은 필요없음
    
    def put(self, request): # param : basket_no // 미완
        data = json.loads(request.body)
        basket = Baskets.objects.get(goods_url = data['goods_url'])
        basket.use_yn = "N"
        basket.save()
        serializer = BasketsSerialize(basket)
        return JsonResponse({"good" : "OK"})

          
class SurveyAPI(APIView):
    def post(self, request):
        survey = Survey()
        survey.username = Users.objects.get(username = request.user.username) 
        survey.score = 5      #체크박스로 점수 해두기 ex : 5
        survey.answer = '도움이 많이 됩니당'               # 건의사항에 대한 답변 받기
        return Response('감사함늬다')

@permission_classes([IsAuthenticated])
class QnaAPI(APIView):
    def post(self, request):
        qna = Qna()
        qna.username = Users.objects.get(username = request.user.username) # 세션에서 유저정보 담아서 어떻게어떻게 하기
        qna.question = '집에 가고 싶은데 어떻게 해야 하나요' # 질문 받기
        # qna.answer = '우리가 답변 하기' # 추후에 관리자가 답변 수정
        qna.type = '사이트 문의' # 선택으로 type 설정
        # qna.img_url = 'asdfasdf.jpg'  # if문으로 img가 있으면 넣기 null = True라 공백 가능
        qna.use_yn = 'Y'
        
class FaqAPI(APIView):
    def get(self, request):
        faq = Faq.objects.all()
        serializer = FaqSerialize(faq)
        return Response(serializer.data)