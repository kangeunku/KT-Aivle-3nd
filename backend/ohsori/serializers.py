from rest_framework import serializers
from .models import Users, Good, Basket, Faq, Qna, Survey

class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        
class GoodSerialize(serializers.ModelSerializer):
    class Meta:
        model = Good
        fields = "__all__"

class BasketSerialize(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = "__all__"
        
class FaqSerialize(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = "__all__"
        
class QnaSerialize(serializers.ModelSerializer):
    class Meta:
        model = Qna
        fields = "__all__"

class SurveySerialize(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = "__all__"