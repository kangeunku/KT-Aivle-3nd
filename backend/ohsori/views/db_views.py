from django.http import HttpResponse
from django.db import connection

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from ..serializers import UsersSerialize, GoodsSerialize, BasketsSerialize, FaqSerialize, QnaSerialize, SurveySerialize
from ..models import Users, Goods, Baskets, Faq, Qna, Survey

# db 사용
def listFunc():
    datas = Users.objects.all()
    data = UsersSerialize(datas, many=True)
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
    
class GoodsAPI(APIView): # 상품 정보 API 1
    def get(self, request, goods_url): # 
        try:
            goods = Goods.objects.get(goods_url)
            # good = Good.objects.get(good_no = request.data.get('good_no'))
            serializer = GoodsSerialize(goods)
            return Response(serializer.data, status = status.HTTP_200_OK)
        except Goods.DoesNotExist:
            goods = Goods()
            goods.goods_info = "오전 11시455분" # 모델을 통해 넣을 정보들 
            goods.goods_url = "https://www.235432n142av.com/322534/"
            goods.goods_name = "졸려어155134541"
            goods.use_yn = "Y"
            goods.save()
            return Response('정보가 없네요, 정보 저장했습니다')

 # 정참조 users = Users.objects.get(name='뽀삐') /n  Users_basket = users.basket.all()
class BasketsAPI(APIView):
    def get(self, request, username):
        users = Users.objects.get(username = request.user.username)
        user_baskets = users.baskets.filter(basket_yn = 'Y')
        serializer = BasketsSerialize(user_baskets, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class BasketsAddAPI(APIView): 
    def post(self, request): # basket_yn True or False // 요청 params : url
        goods= Goods.objects.get(goods_url = request.data.get('goods_url'))
        baskets = Baskets()
        baskets.goods_no = goods
        baskets.username = Users.objects.get(username = request.data.get('username'))
        baskets.use_yn = 'Y'
        serializer = BasketsSerialize(baskets)
        baskets.save()
        print(baskets)
        return Response(serializer.data)
    
class BasketsDelAPI(APIView):
    def get(self, request, basket_no):
        basket = Baskets.objects.get(basket_no = basket_no)
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