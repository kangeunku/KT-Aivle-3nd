from django.contrib import admin
from .models import User, Good, Basket, Faq, Qna, Survey
# Register your models here.

# admin 페이지에 연결
admin.site.register(User)
admin.site.register(Good)
admin.site.register(Basket)
admin.site.register(Faq)
admin.site.register(Qna)
admin.site.register(Survey)