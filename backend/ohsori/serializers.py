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

# class DecodeSerializer(serializers.ModelSerializer) :

#     def create(self, validated_data):
#         product = Product.objects.create(**validated_data)

# 		#이미지 디코딩하기 
#         bulk_list = []
#         num = 1
#         for image_string in self.context.get("images"): #base64로 인코딩된 이미지들을 불러온다.
#             header, data = image_string.split(';base64,')
#             data_format, ext = header.split('/')
#             try:
#                 image_data = base64.b64decode(data)
#                 image_root = settings.MEDIA_ROOT + '\\' + str(product.id) + "_" + str(num) + "." + ext
#                 with open(image_root, 'wb') as f:
#                     f.write(image_data)
#                     bulk_list.append(ProductImg(product=product, image=f'{product.id}_{num}.{ext}'))
#                 num += 1
#             except TypeError:
#                 self.fail('invalid_image')

#         images = ProductImg.objects.bulk_create(bulk_list)

#         return product

#     class Meta:
#         model = Product
#         fields = '__all__'