from rest_framework import serializers
from .models import Users, Good, Basket, Faq, Qna, Survey

class UserSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('user_no', 'user_id', 'nickname', 'use_yn')
        
class GoodSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Good
        fields = ('good_no', 'url', 'good_name', 'good_info', 'reg_date', 'use_yn')

class BasketSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Basket
        fields = ('basket_no', 'user_no', 'good_no', 'use_yn', 'reg_date')
        
class FaqSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Faq
        fields = ('question', 'answer', 'reg_date', 'use_yn')
        
class QnaSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Qna
        fields = ('qna_no', 'user_no', 'question', 'answer', 'type', 'img_url', 'reg_date', 'use_yn')

class SurveySerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Survey
        fields = ('survey_id', 'question', 'answer', 'group', 'reg_date', 'use_yn', 'user_no')