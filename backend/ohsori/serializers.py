from rest_framework import serializers
from .models import Users, Goods, Baskets, Faq, Qna, Survey

from account.models import CustomUser # 닉네임을 추가한 상속모델

# User Serializer
class User2Serializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser # User -> CustomUser모델로 바꿈
        fields = ('id', 'username','nickname','date_joined')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username','password','password2','nickname')
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("이미 사용 중인 ID입니다.")
        return value

    def validate(self, data):
        password = data.get('password')
        password2 = data.pop('password2')

        if password != password2:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            nickname=validated_data.get('nickname', None))  # nickname 추가
        return user

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