from rest_framework import serializers
from .models import Goods, Baskets, Qna
            
class GoodsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = "__all__"

class BasketsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Baskets
        fields = "__all__"
        
        
class QnaSerialize(serializers.ModelSerializer):
    class Meta:
        model = Qna
        fields = "__all__"
