from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from ..models import CustomToken, Users

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, logout, login

# 비밀번호 변경   # insomnia에서 비밀번호 변경에서 crsf 오류 뜸 포기함 

@method_decorator(csrf_exempt, name = "dispatch")

class CheckPasswordAPI(APIView): # View 쓰니깐 405 error뜸
    permission_classes = [IsAuthenticated]# 로그인한 사용자만 접근 가능
    
    def post(self, request):
        user = Users.objects.get(username=request.user.username)
        password = request.data.get('password') # 현재 비밀번호
        if user.check_password(password):
            return Response({'status': 'succes'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'fail(Incorrect Password)'}, status=status.HTTP_404_NOT_FOUND)

class SetPasswordAPI(APIView): # View 쓰니깐 405 error뜸
    permission_classes = [IsAuthenticated]# 로그인한 사용자만 접근 가능
    
    def post(self, request):
        user = Users.objects.get(username=request.user.username)
        
        new_password = request.data.get('new_password') # 바꿀 비밀번호
        
        logout(request)
        
        user.set_password(new_password)
        user.save()
        
        # # 로그인
        user = authenticate(request, username=user.username, password=new_password)
        login(request, user)
        
        return Response({'status': 'success'})

# 별명 변경 View
@method_decorator(csrf_exempt, name = "dispatch")
class SetNicknameAPI(APIView):
    
    permission_classes = [IsAuthenticated] # 로그인한 사용자만 접근 가능
    
    def post(self, request):
        try:
            user = Users.objects.get(username=request.user.username)
        except Users.DoesNotExist:
            return Response({'status': 'fail'}, status=status.HTTP_404_NOT_FOUND)

        nickname = request.data.get('nickname')
        user.nickname = nickname
        user.save()
        return Response({'status': 'success'})
    

# 회원탈퇴 View
@method_decorator(csrf_exempt, name = "dispatch")
class DeleteUserAPI(APIView):
    permission_classes = [IsAuthenticated] # 로그인한 사용자만 접근 가능
    #def delete(self, request): # delete 쓰니깐 url에서 어떻게 탈퇴가 되는지 확인이 안됨
    def post(self, request):
        try:
            user = Users.objects.get(username=request.user.username)
        except Users.DoesNotExist:
            return Response({'status': 'fail'}, status=status.HTTP_404_NOT_FOUND)
        password = request.data.get('password') # 비밀번호 입력
        if not user.check_password(password): # 비밀번호가 틀리면 fail
            return Response({'status': 'fail'}, status=status.HTTP_400_BAD_REQUEST)
        # user.delete() # 회원삭제 -> 우리는 회원정보 삭제가 아니라 use_yn = "n" 으로만 바꾸고 db에 저장
        user.use_yn = 'n'
        user.save()
        # 로그아웃 처리 및 토큰 삭제(탈퇴한 회원의 토큰은 custom token 테이블에 저장될 필요가 없다고 판단)
        logout(request)
        CustomToken.objects.filter(user=user).delete()
        return Response({'status': 'success'})