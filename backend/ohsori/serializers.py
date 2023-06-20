from rest_framework import serializers
from .models import Users, Good, Basket, Faq, Qna, Survey, Test

class UserSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        
class GoodSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Good
        fields = "__all__"

class BasketSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Basket
        fields = "__all__"
        
class FaqSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Faq
        fields = "__all__"
        
class QnaSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Qna
        fields = "__all__"

class SurveySerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Survey
        fields = "__all__"

class TestSerialize(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"