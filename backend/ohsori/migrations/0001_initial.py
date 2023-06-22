# Generated by Django 4.2 on 2023-06-22 05:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(help_text='질문')),
                ('answer', models.TextField(help_text='답변')),
                ('reg_date', models.DateTimeField(auto_now_add=True, help_text='등록일자')),
                ('use_yn', models.CharField(help_text='사용여부', max_length=2)),
            ],
            options={
                'db_table': 'ohsori_faq',
            },
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('goods_no', models.AutoField(help_text='상품고유번호', primary_key=True, serialize=False)),
                ('goods_url', models.URLField(help_text='상품url')),
                ('goods_name', models.CharField(help_text='상품이름', max_length=200)),
                ('goods_info', models.TextField(help_text='상품정보')),
                ('reg_date', models.DateTimeField(auto_now_add=True, help_text='등록일자')),
                ('use_yn', models.CharField(help_text='사용여부', max_length=2, null=True)),
            ],
            options={
                'db_table': 'ohsori_good',
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_no', models.AutoField(help_text='사용자 고유번호', primary_key=True, serialize=False)),
                ('user_id', models.CharField(help_text='아이디(이메일)', max_length=100)),
                ('nickname', models.CharField(help_text='별명', max_length=50)),
                ('user_yn', models.CharField(help_text='사용여부', max_length=2)),
            ],
            options={
                'db_table': 'ohsori_user',
            },
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('survey_id', models.AutoField(help_text='설문아이디', primary_key=True, serialize=False)),
                ('score', models.IntegerField(help_text='점수')),
                ('answer', models.TextField(blank=True, help_text='건의사항')),
                ('reg_date', models.DateTimeField(auto_now_add=True, help_text='등록일자')),
                ('user_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ohsori.users')),
            ],
            options={
                'db_table': 'ohsori_survey',
            },
        ),
        migrations.CreateModel(
            name='Qna',
            fields=[
                ('qna_no', models.AutoField(help_text='문의 번호', primary_key=True, serialize=False)),
                ('question', models.CharField(help_text='개인질문')),
                ('answer', models.TextField(blank=True, help_text='개인답변')),
                ('type', models.CharField(help_text='질문유형')),
                ('qna_img', models.URLField(help_text='이미지url', null=True)),
                ('reg_date', models.DateTimeField(auto_now_add=True, help_text='등록일자')),
                ('use_yn', models.CharField(help_text='사용여부', max_length=2)),
                ('user_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Qna', to='ohsori.users')),
            ],
            options={
                'db_table': 'ohsori_qna',
            },
        ),
        migrations.CreateModel(
            name='Baskets',
            fields=[
                ('basket_no', models.AutoField(help_text='찜하기 고유번호', primary_key=True, serialize=False)),
                ('reg_date', models.DateTimeField(auto_now_add=True, help_text='등록일자')),
                ('use_yn', models.CharField(help_text='사용여부', max_length=2)),
                ('goods_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='ohsori.goods')),
                ('user_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='basket', to='ohsori.users')),
            ],
            options={
                'db_table': 'ohsori_basket',
            },
        ),
    ]
