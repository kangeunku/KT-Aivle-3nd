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