from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    nickname = models.TextField()
    use_yn = models.CharField(max_length=2, help_text="사용여부") # y, n,
    pass

class CustomToken(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    token = models.CharField(max_length=500)

class Goods(models.Model):
    goods_no = models.AutoField(help_text="상품고유번호", primary_key=True)
    goods_url = models.URLField (help_text="상품url") 
    goods_name = models.CharField(max_length=200, help_text='상품이름')
    goods_info = models.TextField (help_text='상품정보')
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자")
    goods_thumb = models.ImageField(help_text='상품대표이미지', upload_to=None, height_field=None, width_field=None, max_length=None, null=True)
    goods_price = models.IntegerField(help_text = "상품가격", null=True)
    goods_point = models.FloatField(help_text = "상품별점", null=True)
    use_yn = models.CharField(max_length=2, help_text="사용여부", null=True)
    
    class Meta:
        db_table = 'ohsori_good'


class Baskets(models.Model):
    basket_no = models.AutoField(help_text="찜하기 고유번호", primary_key = True)
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="basket") # 정참조 users = Users.objects.get(name='뽀삐') /n  Users_basket = users.basket.all()
    goods_no = models.ForeignKey(Goods,  on_delete=models.CASCADE, related_name="user")                         
    reg_date = models.DateTimeField(auto_now_add = True, help_text="찜한날짜")
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        db_table = 'ohsori_basket'

class Faq(models.Model):
    question = models.CharField(help_text='질문')
    answer = models.TextField (help_text='답변')
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
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
    group = models.TextField(help_text ="그륩번호")
    score = models.IntegerField(help_text='점수') # 1 ~ 5점
    answer = models.TextField (help_text='건의사항', blank=True)
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자") 
    
    class Meta:
        # managed =False
        db_table = 'ohsori_survey'