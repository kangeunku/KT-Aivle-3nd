
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions


class Test(APIView):

    permission_classes = [permissions.IsAuthenticated]


    def get(self, request):
        print(request)
        print(request.user)
        print(request.data)
        print(request.session)
        print(request.user.is_authenticated)
        print(request.user.username)
        print(request.user.use_yn)

        return Response('Good')

