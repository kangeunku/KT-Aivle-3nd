from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response

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
    
    def put(self, request): # param : basket_no // 미완
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


class QnaAPI(APIView):
    def post(self, request): # params :     l 
        qna = Qna()
        qna.username = Users.objects.get(username = request.user.username) # 세션에서 유저정보 담아서 어떻게어떻게 하기
        qna.question = '집에 가고 싶은데 어떻게 해야 하나요' # 질문 받기
        # qna.answer = '우리가 답변 하기' # 추후에 관리자가 답변 수정
        qna.type = '사이트 문의' # 선택으로 type 설정
        # qna.img_url = 'asdfasdf.jpg'  # if문으로 img가 있으면 넣기 null = True라 공백 가능
<<<<<<< HEAD
        qna.use_yn = 'Y'
        qna.save()
        return Response('등록되었습니다')
    # 사용 삭제 추가하기
=======
        qna.use_yn = 'y'
>>>>>>> 1907b6f3276c22eb119aad5354318dbbb1357c7d

class FaqAPI(APIView):
    def get(self, request):
        faq = Faq.objects.all()
        serializer = FaqSerialize(faq)
        return Response(serializer.data)