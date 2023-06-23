# Generated by Django 4.2 on 2023-06-22 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ohsori", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="faq",
            name="reg_date",
        ),
        migrations.AddField(
            model_name="goods",
            name="goods_point",
            field=models.FloatField(default=5, help_text="상품별점"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="goods",
            name="goods_price",
            field=models.IntegerField(default=5, help_text="상품가격"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="goods",
            name="goods_thumb",
            field=models.ImageField(help_text="상품대표이미지", null=True, upload_to=None),
        ),
        migrations.AddField(
            model_name="survey",
            name="group",
            field=models.TextField(default=5, help_text="그륩번호"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="baskets",
            name="reg_date",
            field=models.DateTimeField(auto_now_add=True, help_text="찜한날짜"),
        ),
        migrations.AlterField(
            model_name="goods",
            name="use_yn",
            field=models.CharField(default="y", help_text="사용여부", max_length=2),
            preserve_default=False,
        ),
    ]
