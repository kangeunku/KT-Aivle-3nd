from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view


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

@method_decorator(csrf_exempt, name = "dispatch")
class BasketsAPI(APIView):
    '''
    get으로 요청시 찜목록 모두 조회후 json으로 전달
    '''
    permission_classes = [IsAuthenticated]
    def get(self, request): # 장바구니 페이지 GET 요청시 장바구니에 있는 모든 상품 전달
        users = Users.objects.get(username = request.user.username)
        user_baskets = users.baskets.filter(use_yn = 'y')
        serializer = BasketsSerialize(user_baskets, many = True)
        return Response(serializer.data)
        
# @method_decorator(csrf_exempt, name = "dispatch")
class Baskets_Add_DelAPI(View):
    '''
    POST로 goods_url 전달시 찜 목록에 상품 추가 
    PUT으로 goods_url 전달 시 찜 목록에서 상품 제거 <-- 찜 목록에 상품이 추가되어 있어야 함
    '''    
    permission_classes = [IsAuthenticated]
    def post(self, request): # basket_yn True or False // 요청 params : goods_url
        data = json.loads(request.body)
        baskets = Baskets()
        baskets.goods_no = Goods.objects.only('goods_no').get(goods_url = data['goods_url'])
        baskets.username = Users.objects.get(username = request.user.username)
        baskets.use_yn = 'y'
        serializer = BasketsSerialize(baskets)
        baskets.save()
        return JsonResponse(serializer.data) # 데이터 회신은 필요없음
    
    def put(self, request): # param : goods_url
        data = json.loads(request.body)
        basket = Baskets.objects.get(goods_url = data['goods_url'])
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