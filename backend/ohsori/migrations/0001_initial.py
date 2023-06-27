# Generated by Django 4.2 on 2023-06-26 08:31

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="Users",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        blank=True, max_length=254, verbose_name="email address"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                (
                    "username",
                    models.CharField(max_length=50, primary_key=True, serialize=False),
                ),
                ("nickname", models.TextField()),
                ("use_yn", models.CharField(help_text="사용여부", max_length=2)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
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
            name="CustomToken",
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
                ("token", models.CharField(max_length=500)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
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
