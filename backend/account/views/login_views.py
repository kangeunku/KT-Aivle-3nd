from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions, status

from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

from ..serializers import UsersSerialize, RegisterSerialize
from ..models import CustomToken, Users

from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator

from django.contrib.auth import login, authenticate

# @method_decorator(csrf_exempt, name = "dispatch")
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerialize
    permissions_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # 회원가입 후 로그인
        login(request, user)

        return Response({
            "user": UsersSerialize(user, context=self.get_serializer_context()).data,
        })

# 회원가입할때의 토큰을 저장하니깐 로그아웃한 후 다시 로그인했을때 db에 저장되어있는 토큰으로는 정보조회, 로그아웃을 못한다
# 그래서 로그인할때마다 토큰을 저장하고 다시 로그인하면 다시 새로운 토큰으로 저장되게 하기
# @method_decorator(csrf_exempt, name = "dispatch")
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # 로그인한 계정이 use_yn = "n" 인 경우 탈퇴한 회원으로 로그인 못함

        if user.use_yn == 'n':

            return Response({"message": "탈퇴한 회원입니다."}, status=status.HTTP_401_UNAUTHORIZED)
        
        login(request, user)
        response = super().post(request, format=None)

        # Get the token from the response
        token = response.data['token']

        # Delete existing token if exists
        CustomToken.objects.filter(user=user).delete()

        # Save the new token in CustomToken
        CustomToken.objects.create(user=user, token=token)

        return response