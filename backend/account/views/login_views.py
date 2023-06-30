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
    '''
    프론트에서 POST 요청으로 username, password, password2, nickname 전송
    장고에서 유효성 검사 후 DB저장
    
    '''
    serializer_class = RegisterSerialize
    permissions_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            
            # 회원가입 후 로그인
            login(request, user) 

            return Response({
                "user": UsersSerialize(user, context=self.get_serializer_context()).data,
            })
        else:
            return Response({"회원가입 실패" : "계정이 옳바르지 않습니다"})
# @method_decorator(csrf_exempt, name = "dispatch")
class LoginAPI(KnoxLoginView):
    '''
    프론트에서 POST 요청으로 username, password 전송
    장고에서 유효성 검사 후 로그인
    '''
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            # 로그인한 계정이 use_yn = "n" 인 경우 탈퇴한 회원으로 로그인 못함
            if user.use_yn == 'n':
                return Response({"message": "탈퇴한 회원입니다."}, status=status.HTTP_401_UNAUTHORIZED)
            login(request, user)
            return Response({"message" : f"{user.nickname}님 환영합니다"})
        
        else:
            return Response({"로그인 실패" : "계정이 옳바르지 않습니다"})