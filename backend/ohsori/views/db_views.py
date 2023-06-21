from django.http import HttpResponse
from django.db import connection

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from ..serializers import UserSerialize, GoodSerialize, BasketSerialize, FaqSerialize, QnaSerialize, SurveySerialize
from ..models import Users, Good, Basket, Faq, Qna, Survey

# db 사용
def listFunc():
    datas = Users.objects.all()
    data = UserSerialize(datas, many=True)
    print("xxxxxxxxxxxxxxxxxxxx")
    print(data.data)
    print("xxxxxxxxxxxxxxxxxxxx")
    return data

def sqljoin():
    sql = ""
    # sql = "select * from osori_user"
    # cursor = connection.cursor()
    # # sql 반영
    # cursor.execute(sql)
    # # 배열 형식으로 받아옴
    # datas = cursor.fetchall()
    # data = UserSerialize(datas, many=True)
    # return data
    
class GoodAPI(APIView): # 상품 정보 API 1
    def get(self, request, good_no): # 
        try:
            good = Good.objects.get(good_no = good_no)
            # good = Good.objects.get(good_no = request.data.get('good_no'))
            serializer = GoodSerialize(good)
            return Response(serializer.data, status = status.HTTP_200_OK)
        except Good.DoesNotExist:
            good = Good()
            good.good_info = "오전 11시455분" # 모델을 통해 넣을 정보들 
            good.good_url = "https://www.235432n142av.com/322534/"
            good.good_name = "졸려어155134541"
            good.good_yn = "Y"
            good.save()
            return Response('정보가 없네요, 정보 저장했습니다')

 # 정참조 users = Users.objects.get(name='뽀삐') /n  Users_basket = users.basket.all()
class BasketAPI(APIView):
    def get(self, request, user_no):
        users = Users.objects.get(user_no = user_no)
        user_basket = users.basket.filter(basket_yn = 'Y')
        serializer = BasketSerialize(user_basket, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class BasketAddAPI(APIView): 
    def post(self, request): # basket_yn True or False // 요청 params : url
        good= Good.objects.get(good_url = request.data.get('good_url'))
        basket = Basket()
        basket.good_no = good
        basket.user_no = Users.objects.get(user_no = request.data.get('user_no'))
        basket.basket_yn = 'Y'
        serializer = BasketSerialize(basket)
        basket.save()
        print(basket)
        return Response(serializer.data)
    
class BasketDelAPI(APIView):
    def get(self, request, basket_no):
        basket = Basket.objects.get(basket_no = basket_no)
        basket.basket_yn = "N"
        basket.save()
        return Response(status=status.HTTP_200_OK)
            
        