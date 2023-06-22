from rest_framework import serializers
from .models import Users, Goods, Baskets, Faq, Qna, Survey

class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        
class GoodsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = "__all__"

class BasketsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Baskets
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