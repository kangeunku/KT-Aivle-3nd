from django.contrib import admin
from .models import Users, Goods, Baskets, Faq, Qna, Survey
# Register your models here.

# admin 페이지에 연결
admin.site.register(Users)
admin.site.register(Goods)
admin.site.register(Baskets)
admin.site.register(Faq)
admin.site.register(Qna)
admin.site.register(Survey)