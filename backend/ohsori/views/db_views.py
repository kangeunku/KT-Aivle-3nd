from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.db import connection

from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

import json

from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from ..serializers import GoodsSerialize, BasketsSerialize,QnaSerialize
from ..models import Goods, Baskets,Qna
from account.models import Users

class BasketsAPI(APIView):
    '''
    get으로 요청시 찜목록 모두 조회후 json으로 전달
    
    params : X
    
    returns : 계정에 해당하는 모든 Basket info
    '''
    permission_classes = [IsAuthenticated]
    def get(self, request): # 장바구니 페이지 GET 요청시 장바구니에 있는 모든 상품 전달
        cursor = connection.cursor()

        strSql = f"select ob.*, og.* from ohsori_basket ob INNER join ohsori_good og on ob.goods_no = og.goods_no WHERE ob.username = '{request.user.username}'" 
        result = cursor.execute(strSql)
        goods = cursor.fetchall()
        
        print(goods)
        return Response({"goods" : goods})
        
# @method_decorator(csrf_exempt, name = "dispatch")
class Baskets_Add_DelAPI(View):
    '''
    POST로 goods_url 전달시 찜 목록에 상품 추가 
    PUT으로 goods_url 전달 시 찜 목록에서 상품 제거 <-- 찜 목록에 상품이 추가되어 있어야 함
    
    POST
    Input params : goods_url
    return : user_basket에 상품 정보 추가
    
    PUT
    Input params : goods_url
    return : user_basket에서 해당 goods_url의 상품 use_yn = 'n 처리
    '''    
    permission_classes = [IsAuthenticated]
    def post(self, request): # basket_yn True or False // 요청 params : goods_url
        data = json.loads(request.body)
        baskets = Baskets()
        goods_no = Goods.objects.only('goods_no').get(goods_url = data['goods_url'])
        try:
            Baskets.objects.get(goods_no = goods_no, username = request.user.username)
            return JsonResponse({"status" : "이미 존재하는 상품입니다"})
        except Baskets.DoesNotExist:
            baskets.goods_no = goods_no
            baskets.username = Users.objects.get(username = request.user.username)
            baskets.use_yn = 'y'
            serializer = BasketsSerialize(baskets)
            baskets.save()
            return JsonResponse(serializer.data) # 데이터 회신은 필요없음
    
    def put(self, request): # param : goods_url
        data = json.loads(request.body)
        goods_no = Goods.objects.only('goods_no').get(goods_url = data['goods_url'])
        basket = Baskets.objects.get(goods_no = goods_no, username = request.user.username)
        basket.use_yn = "n"
        basket.save()
        serializer = BasketsSerialize(basket)
        return JsonResponse({"good" : "OK"})


@method_decorator(csrf_exempt, name = "dispatch")
class QnaAPI(APIView):
    '''
    GET으로 요청시 Qna목록 모두 조회후 json으로 전달
    POST로 type, subject, question, imgfile(선택) 전달 시 개별 Qna 생성
    PUT으로 qna_no 전달 시 해당 질문의 use_yn을 n으로 변경
    
    GET
    params : X
    return : 모든 계정에 해당하는 Qna 인포
     
    POST
    param : type, subject, question, imgfile(선택)
    return : DB에 qna 생성
    
    PUT
    param : qna_no
    return : qna_no에 해당하는 질문 use_yn = 'n 변경
    '''
    permission_classes = [IsAuthenticated]
    def get(self, request): # 장바구니 페이지 GET 요청시 장바구니에 있는 모든 상품 전달
        users = Users.objects.get(username = request.user.username)
        user_qna = users.qna.filter(use_yn = 'y')
        serializer = QnaSerialize(user_qna, many = True)
        return Response(serializer.data)

    def post(self, request): # params :     l 
        qna = Qna()
        qna.username = Users.objects.get(username = request.user.username) # 세션에서 유저정보 담아서 어떻게어떻게 하기
        qna.type = request.data.get('type') # 선택으로 type 설정
        qna.subject = request.data.get('subject')
        qna.question = request.data.get('question') # 질문 받기
        try:
            qna.img_url = request.FILES["imgfile"]  # 
        except:
            pass
        qna.use_yn = 'y'
        qna.save()
        return Response({'status': 'succes'}, status=status.HTTP_200_OK)
    
    def put(self, request): # param : qna_no
        qna = Qna.objects.get(qna_no = request.data.get('qna_no'))
        qna.answer = request.data.get('answer')
        qna.save()
        return Response({'status': 'succes'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CheckQna(request): # param : qna_no
    '''
    GET으로 qna_no 전달 시 해당 qna 회신
    '''
    qna = Qna.objects.get(qna_no = request.data.get('qna_no'))
    serializer = QnaSerialize(qna, many = False)
    
    return Response(serializer.data, status=status.HTTP_200_OK)