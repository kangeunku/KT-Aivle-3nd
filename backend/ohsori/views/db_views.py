from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.db import connection
from django.conf import settings

import base64
import os

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

        strSql = f"""select ob.reg_date, og.goods_url, og.goods_name, og.goods_star, og.goods_thumb, og.goods_price, gs.whole_summary
                    from ohsori_basket ob 
                    INNER join ohsori_good og 
                    on ob.goods_no = og.goods_no 
                    INNER join goods_summary gs
                    on ob.goods_no = gs.goods_no
                    WHERE ob.username = '{request.user.username}' and ob.use_yn = 'y'""" 
        result = cursor.execute(strSql)
        goods = cursor.fetchall()
        
        basket = {}
        num = 1
        for i in goods:
            temp = {'date' : i[0], 'goods_url' : i[1], 'goods_name' : i[2], 'goods_star' : i[3], 'goods_thumb' : i[4], 'goods_price' :i[5], 'goods_summary':i[6]}
            basket[num] = temp
            num += 1
        # print(goods)
        # basket = {'reg_data' :}
        # basket = json.dumps(basket, default=str)
        return Response(basket)
        
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
            Baskets.objects.get(goods_no = goods_no, username = request.user.username, use_yn = 'y')
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
    def get(self, request): # qna 페이지 GET 요청시 qna에 있는 모든 상품 전달
        users = Users.objects.get(username = request.user.username)
        user_qna = users.qna.filter(use_yn = 'y')
        serializer = QnaSerialize(user_qna, many = True)
        return Response(serializer.data)

    def post(self, request): # params :     l 
        qna = Qna.objects.create(username = Users.objects.get(username = request.user.username))
        # qna.username = Users.objects.get(username = request.user.username) # 세션에서 유저정보 담아서 어떻게어떻게 하기
        qna.type = request.data.get('type') # 선택으로 type 설정
        qna.subject = request.data.get('subject')
        qna.question = request.data.get('question') # 질문 받기
        try:
            image_string = request.data.get('img_url')['src']
            header, data = image_string.split(';base64,')
            data_format, ext = header.split('/')
            
            try:
                image_data = base64.b64decode(data)
                temp = qna.qna_no
                image_root = settings.MEDIA_ROOT + '\\' + str(temp) + '.' + ext
                with open(image_root, 'wb') as f:
                    f.write(image_data)
                    qna.img_file =f"{temp}.{ext}"
                    # qna.img_file =f"http://127.0.0.1:8000/media/data/{username}/{temp}.{ext}"
            except TypeError:
                pass
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