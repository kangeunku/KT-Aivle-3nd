from django.contrib import admin
from .models import Users, Goods, Baskets, Faq, Qna, Survey, CustomToken, Goods_summary
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'nickname', 'is_staff', 'is_superuser', 'use_yn') # 권한여부 display (일반유저, 관리자유저)

class CustomTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'token')
    
# admin 페이지에 연결

admin.site.register(Users, CustomUserAdmin) # 회원가입한 사람들
admin.site.register(CustomToken, CustomTokenAdmin) # 로그인때 생기는 토큰을 저장하는 테이블
admin.site.register(Goods)
admin.site.register(Baskets)
admin.site.register(Faq)
admin.site.register(Qna)
admin.site.register(Survey)
admin.site.register(Goods_summary)


