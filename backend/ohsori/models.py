from django.db import models

from account.models import Users

class Goods(models.Model):
    goods_no = models.AutoField(help_text="상품고유번호", primary_key=True)
    goods_url = models.URLField (help_text="상품url", max_length=500, unique = True) 
    goods_name = models.CharField(max_length=200, help_text='상품이름')
    goods_star = models.TextField(help_text='상품 별점') 
    goods_price = models.IntegerField(help_text='상품가격')
    goods_thumb = models.URLField (help_text="상품 대표 이미지")
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자")
    use_yn = models.CharField(max_length=2, help_text="사용여부", null= True)
    
    class Meta:
        db_table = 'ohsori_good'

class Goods_summary(models.Model):
    goods_no = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name="summary", db_column="goods_no")
    summary = models.JSONField(default=dict, help_text ="상품 상세 정보 및 이미지 요약")
    whole_summary = models.TextField(help_text= "상품전체요약")
    detail = models.JSONField(default=dict, help_text= "상품 배송 정보 및 옵션")

    class Meta:
        db_table = "goods_summary"
        
class Baskets(models.Model):
    basket_no = models.AutoField(help_text="찜하기 고유번호", primary_key = True)
    username = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="baskets",db_column="username") 
    goods_no = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name="goods", db_column="goods_no")                         
    reg_date = models.DateTimeField(auto_now_add = True, help_text="찜한날짜")
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        db_table = 'ohsori_basket'

def user_directory_path(instance, filename):
    return 'user_{}/{}'.format(instance.name, filename)
    
class Qna(models.Model):
    qna_no = models.AutoField(help_text="문의 번호", primary_key=True)
    username = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="qna",db_column="username")
    subject = models.CharField(max_length=20, help_text='질문제목', null = True, blank = True)
    question = models.CharField(help_text='질문')
    answer = models.TextField (help_text='개인답변', blank = True)
    type = models.CharField(help_text='질문유형', null = True, blank = True)
    img_file = models.FileField(upload_to=user_directory_path, help_text="이미지 파일", null =True, blank=True)
    reg_date = models.DateTimeField(auto_now_add = True, help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    
    class Meta:
        # managed =False
        db_table = 'ohsori_qna'
