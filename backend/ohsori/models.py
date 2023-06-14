from django.db import models
 
class Users(models.Model):
    user_no = models.AutoField(help_text="사용자 고유번호",primary_key=True)
    user_id = models.CharField(max_length=100, help_text='아이디(이메일)')
    nickname = models.CharField(max_length=50, help_text='별명')
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed = False
        db_table = 'ohsori_user'
    
class Good(models.Model):
    good_no = models.AutoField(help_text="상품고유번호", primary_key=True)
    url = models.URLField (help_text="상품url")
    good_name = models.CharField(max_length=200, help_text='상품이름')
    good_info = models.TextField (help_text='상품정보')
    reg_date = models.DateTimeField(help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_good'
        
class Basket(models.Model):
    basket_no = models.AutoField(help_text="찜하기 고유번호", primary_key=True)
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    good_no = models.ForeignKey(Good, on_delete=models.CASCADE, null=True)
    reg_date = models.DateTimeField(help_text="등록일자")
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_basket'
    

class Faq(models.Model):
    question = models.CharField(help_text='상품이름')
    answer = models.TextField (help_text='상품정보')
    reg_date = models.DateTimeField(help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_faq'
    
class Qna(models.Model):
    qna_no = models.AutoField(help_text="상품고유번호", primary_key=True)
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    question = models.CharField(help_text='질문')
    answer = models.TextField (help_text='답변')
    type = models.CharField(help_text='질문유형')
    img_url = models.URLField (help_text="이미지url")
    reg_date = models.DateTimeField(help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    class Meta:
        # managed =False
        db_table = 'ohsori_qna'

class Survey(models.Model):
    survey_id = models.AutoField(help_text="설문아이디", primary_key=True)
    question = models.CharField(help_text='질문')
    answer = models.TextField (help_text='답변')
    group = models.CharField (help_text='그룹번호')
    reg_date = models.DateTimeField(help_text="등록일자") 
    use_yn = models.CharField(max_length=2, help_text="사용여부")
    user_no = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    class Meta:
        # managed =False
        db_table = 'ohsori_survey'
    