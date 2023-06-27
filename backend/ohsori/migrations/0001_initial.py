# Generated by Django 4.2 on 2023-06-27 04:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Faq",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.CharField(help_text="질문")),
                ("answer", models.TextField(help_text="답변")),
                ("use_yn", models.CharField(help_text="사용여부", max_length=2)),
            ],
            options={
                "db_table": "ohsori_faq",
            },
        ),
        migrations.CreateModel(
            name="Goods",
            fields=[
                (
                    "goods_no",
                    models.AutoField(
                        help_text="상품고유번호", primary_key=True, serialize=False
                    ),
                ),
                (
                    "goods_url",
                    models.URLField(help_text="상품url", max_length=500, unique=True),
                ),
                ("goods_name", models.CharField(help_text="상품이름", max_length=200)),
                ("goods_star", models.TextField(help_text="상품 별점")),
                ("goods_price", models.IntegerField(help_text="상품가격")),
                ("goods_thumb", models.URLField(help_text="상품 대표 이미지")),
                ("reg_date", models.DateTimeField(auto_now_add=True, help_text="등록일자")),
                ("use_yn", models.CharField(help_text="사용여부", max_length=2, null=True)),
            ],
            options={
                "db_table": "ohsori_good",
            },
        ),
        migrations.CreateModel(
            name="Survey",
            fields=[
                (
                    "survey_id",
                    models.AutoField(
                        help_text="설문아이디", primary_key=True, serialize=False
                    ),
                ),
                ("group", models.TextField(help_text="그륩번호")),
                ("score", models.IntegerField(help_text="점수")),
                ("answer", models.TextField(blank=True, help_text="건의사항")),
                ("reg_date", models.DateTimeField(auto_now_add=True, help_text="등록일자")),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "ohsori_survey",
            },
        ),
        migrations.CreateModel(
            name="Qna",
            fields=[
                (
                    "qna_no",
                    models.AutoField(
                        help_text="문의 번호", primary_key=True, serialize=False
                    ),
                ),
                ("question", models.CharField(help_text="개인질문")),
                ("answer", models.TextField(blank=True, help_text="개인답변")),
                ("type", models.CharField(help_text="질문유형")),
                ("qna_img", models.URLField(help_text="이미지url", null=True)),
                ("reg_date", models.DateTimeField(auto_now_add=True, help_text="등록일자")),
                ("use_yn", models.CharField(help_text="사용여부", max_length=2)),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="Qna",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "ohsori_qna",
            },
        ),
        migrations.CreateModel(
            name="Goods_summary",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "summary",
                    models.JSONField(default=dict, help_text="상품 상세 정보 및 이미지 요약"),
                ),
                ("whole_summary", models.TextField(help_text="상품전체요약")),
                ("detail", models.JSONField(default=dict, help_text="상품 배송 정보 및 옵션")),
                (
                    "goods_no",
                    models.ForeignKey(
                        db_column="goods_no",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="summary",
                        to="ohsori.goods",
                    ),
                ),
            ],
            options={
                "db_table": "goods_summary",
            },
        ),
        migrations.CreateModel(
            name="Baskets",
            fields=[
                (
                    "basket_no",
                    models.AutoField(
                        help_text="찜하기 고유번호", primary_key=True, serialize=False
                    ),
                ),
                ("reg_date", models.DateTimeField(auto_now_add=True, help_text="찜한날짜")),
                ("use_yn", models.CharField(help_text="사용여부", max_length=2)),
                (
                    "goods_no",
                    models.ForeignKey(
                        db_column="goods_no",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user",
                        to="ohsori.goods",
                    ),
                ),
                (
                    "username",
                    models.ForeignKey(
                        db_column="username",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="baskets",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "ohsori_basket",
            },
        ),
    ]
