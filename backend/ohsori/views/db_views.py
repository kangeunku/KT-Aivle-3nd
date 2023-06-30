from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

import json

from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from ..serializers import GoodsSerialize, BasketsSerialize, FaqSerialize, QnaSerialize, SurveySerialize
from ..models import Goods, Baskets, Faq, Qna, Survey
from account.models import Users

@method_decorator(csrf_exempt, name = "dispatch")
class BasketsAPI(APIView):
    def get(self, request): # 장바구니 페이지 GET 요청시 장바구니에 있는 모든 상품 전달
        users = Users.objects.get(username = request.user.username)
        user_baskets = users.baskets.filter(use_yn = 'y')
        serializer = BasketsSerialize(user_baskets, many = True)
        return Response(serializer.data)
        
# @method_decorator(csrf_exempt, name = "dispatch")
class Baskets_Add_DelAPI(View):
    def post(self, request): # basket_yn True or False // 요청 params : goods_url
        data = json.loads(request.body)
        baskets = Baskets()
        baskets.goods_no = Goods.objects.only('goods_no').get(goods_url = data['goods_url'])
        baskets.username = Users.objects.get(username = request.user.username)
        baskets.use_yn = 'y'
        serializer = BasketsSerialize(baskets)
        baskets.save()
        return JsonResponse(serializer.data) # 데이터 회신은 필요없음
    
    def put(self, request): # param : basket_no
        data = json.loads(request.body)
        basket = Baskets.objects.get(goods_url = data['goods_url'])
        basket.use_yn = "n"
        basket.save()
        serializer = BasketsSerialize(basket)
        return JsonResponse({"good" : "OK"})

class SurveyAPI(APIView): # params : score, answer
    def post(self, request):
        survey = Survey()
        survey.username = Users.objects.get(username = request.user.username) 
        survey.score = 5      #체크박스로 점수 해두기 ex : 5
        survey.answer = '도움이 많이 됩니당'               # 건의사항에 대한 답변 받기
        return Response('감사함늬다')

@method_decorator(csrf_exempt, name = "dispatch")
class QnaAPI(APIView):
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
def CheckQna(request): # param : qna_no
    qna = Qna.objects.get(qna_no = request.data.get('qna_no'))
    serializer = QnaSerialize(qna, many = False)
    
    return Response(serializer.data, status=status.HTTP_200_OK)
    
    

