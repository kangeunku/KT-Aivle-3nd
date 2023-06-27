from rest_framework import serializers
from .models import Users

class UsersSerialize(serializers.ModelSerializer):
    class Meta:
        model = Users 
        fields = "__all__"

# Register Serializer
class RegisterSerialize(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = Users
        fields = ('username','password','password2','nickname')
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_username(self, value):
        if Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("이미 사용 중인 ID입니다.")
        return value

    def validate(self, data):
        password = data.get('password')
        password2 = data.pop('password2')

        if password != password2:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        return data

    def create(self, validated_data):
        user = Users.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            nickname=validated_data.get('nickname', None))  # nickname 추가
        return user