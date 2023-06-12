from django.db import models
 
# Create your models here.
class Post(models.Model):
    name = models.CharField(max_length = 20)
    content = models.TextField()

# class user(models.Model):
#     user_no = models.AutoField(help_text="사용자 고유번호",primary_key=True)
#     user_id = models.CharField(max_length=100, help_text='아이디(이메일)')
#     nickname = models.CharField(max_length=50, help_text='별명')
#     user_yn = models.BooleanField(initial=True, help="사용여부")
    # class Meta:
    #     managed =False
    #     db_table = 'user'
    
# class basket(models.Model):
#     basket_no = models.AutoField(help_text="찜하기 고유번호", primary_key=True)
#     user_no = models.ForeignKey(user, on_delete=True, null=True)
#     good_no = models.ForeignKey(good, on_delete=True, null=True)
#     reg_date = models.DateTimeField(help="등록일자")
#     user_yn = models.BooleanField(initial=True, help="사용여부")
    
# class good(models.Model):
#     good_no = models.AutoField(help_text="상품고유번호", primary_key=True)
#     url = models.URLField (help_text="상품url", primary_key=True)
#     good_name = models.CharField(max_length=200, help_text='상품이름')
#     good_info = models.TextField (help_text='상품정보')
#     reg_date = models.DateTimeField(help="등록일자") 
#     user_yn = models.BooleanField(initial=True, help="사용여부")

# class faq(models.Model):
#     question = models.CharField(help_text='상품이름')
#     answer = models.TextField (help_text='상품정보')
#     reg_date = models.DateTimeField(help="등록일자") 
#     user_yn = models.BooleanField(initial=True, help="사용여부")
    
# class qna(models.Model):
#     qna_no = models.AutoField(help_text="상품고유번호", primary_key=True)
#     user_no = models.ForeignKey(user, on_delete=True, null=True)
#     question = models.CharField(help_text='질문')
#     answer = models.TextField (help_text='답변')
#     type = models.CharField(help_text='질문유형')
#     img_url = models.URLField (help_text="이미지url", primary_key=True)
#     reg_date = models.DateTimeField(help="등록일자") 
#     user_yn = models.BooleanField(initial=True, help="사용여부")


# class faq(models.Model):
#     survey_id = models.AutoField(help_text="설문아이디", primary_key=True)
#     question = models.CharField(help_text='질문')
#     answer = models.TextField (help_text='답변')
#     group = models.CharField (help_text='그룹번호')
#     reg_date = models.DateTimeField(help="등록일자") 
#     user_yn = models.BooleanField(initial=True, help="사용여부")
#     user_no = models.ForeignKey(user, on_delete=True, null=True)