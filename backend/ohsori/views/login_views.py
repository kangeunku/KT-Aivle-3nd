from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.shortcuts import render, redirect
from knox.models import AuthToken

from ..serializers import UsersSerialize, RegisterSerialize

from django.contrib.auth import login, authenticate

from..forms import LoginForm

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerialize

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UsersSerialize(user, context=self.get_serializer_context()).data,
        })
        

# 회원가입할때의 토큰을 저장하니깐 로그아웃한 후 다시 로그인했을때 db에 저장되어있는 토큰으로는 정보조회, 로그아웃을 못한다
# 그래서 로그인할때마다 토큰을 저장하고 다시 로그인하면 다시 새로운 토큰으로 저장되게 하기
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('templates/success.html')  # Replace 'home' with the URL name of your home page
            else:
                form.add_error(None, 'Invalid username or password.')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})
    
# 유저 정보: id, username, nickname, date_joined
class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UsersSerialize

    def get_object(self):
        return self.request.user