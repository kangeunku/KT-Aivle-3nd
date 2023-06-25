from django.db import models
from account.models import CustomUser # 커스텀 유저 모델 불러오기
from django.contrib.auth import get_user_model # 기본 유저모델을 가져오면 error 발생
User = get_user_model()

from knox.models import AuthToken

# 사용자 정보와 토큰키를 같이  받기위한 모델
class CustomToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=500) 



class Users(models.Model):
    user_no = models.AutoField(help_text="사용자 고유번호",primary_key=True)
    user_id = models.CharField(max_length=100, help_text='아이디(이메일)')
    nickname = models.CharField(max_length=50, help_text='별명')
    user_yn = models.CharField(max_length=2, help_text="사용여부") # y, n,
    
    class Meta:
        # managed = False
        db_table = 'ohsori_user'
    
class Goods(models.Model):
    goods_no = models.AutoField(help_text="상품고유번호", primary_key=True)
    goods_url = models.URLField (help_text="상품url") 
    goods_name = models.CharField(max_length=200, help_text='상품이름')
    goods_info = models.TextField (help_text='상품정보')
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자")
    use_yn = models.CharField(max_length=2, help_text="사용여부", null= True)
    goods_json = models.JSONField(default=dict) # goods_views의 get_detail에서 얻어온 정보를 저장 가능한지 확인용
    
    
    class Meta:
        # managed =False
        db_table = 'ohsori_good'


class Baskets(models.Model):
    basket_no = models.AutoField(help_text="찜하기 고유번호", primary_key = True)
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="basket") # 정참조 users = Users.objects.get(name='뽀삐') /n  Users_basket = users.basket.all()
    goods_no = models.ForeignKey(Goods,  on_delete=models.CASCADE, related_name="user")                         
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자")
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_basket'

class Faq(models.Model):
    question = models.CharField(help_text='질문')
    answer = models.TextField (help_text='답변')
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_faq'
    
class Qna(models.Model):
    qna_no = models.AutoField(help_text="문의 번호", primary_key=True)
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="Qna")
    question = models.CharField(help_text='개인질문')
    answer = models.TextField (help_text='개인답변', blank = True)
    type = models.CharField(help_text='질문유형')
    qna_img = models.URLField (help_text="이미지url", null =True)
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_qna'

class Survey(models.Model):
    survey_id = models.AutoField(help_text="설문아이디", primary_key=True)
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE) # 사용자가 null=True는 제외
    score = models.IntegerField(help_text='점수') # 1 ~ 5점
    answer = models.TextField (help_text='건의사항', blank=True)
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자") 
    
    class Meta:
        # managed =False
        db_table = 'ohsori_survey'