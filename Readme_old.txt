우리조 주소록

https://docs.google.com/spreadsheets/d/1-I0aIXAd2Wye8K-R6XHoq3Aj18zZheTxx-nDMknlu9A/edit?usp=sharing


=====================================================================================
============================
초안 그냥 내가볼용 (임시)
- 콘다 프로젝트 세팅
conda create -n big_project python=3.10

conda activate big_project

pip install -r requirements.txt

=========================================
확인필요
nodeenv --node=18.16.0 node_module

nodeenv -p

nodeenv --node=18.16.0 --npm=9.6.6 -p
===========================================

- 장고 프로젝트 생성
django-admin startproject web_study

장고 앱생성 
python manage.py startapp blog

python manage.py runserver
========================================
장고 db 관련
postgresql설치

모델 생성 후 
python manage.py makemigrations
python manage.py migrate

어드민용 슈퍼유저 사용
python manage.py createsuperuser

프로젝트 > settings.py



blog > admin.py


======================================
리액트세팅
npx create-react-app frontend
npm install axios
npm start

