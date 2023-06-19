# 우리조 주소록

https://docs.google.com/spreadsheets/d/1-I0aIXAd2Wye8K-R6XHoq3Aj18zZheTxx-nDMknlu9A/edit?usp=sharing


# 아나콘다 세팅
// 파이썬 3.9.16의 big_project 환경 세팅
 - conda create -n big_project python=3.9.16
// 환경 실행
 - conda activate big_project
// 설치해야할것 설치
 - pip install -r requirements.txt


# 리액트 세팅
 - nodeenv --node=18.16.0 --npm=9.6.6 -p
 - cd frontend
 - npm update
 - npm install
 // 실행
 - npm start

# 장고 세팅
 - cd backend
 - python manage.py makemigrations
 - python manage.py migrate
 - python manage.py createsuperuser
 - python manage.py runserver
db 관리자에 등록 admin.py

# 보안 유지
    # .gitignore를 만들어 .git의 관리를 받지 않는 파일및 폴더들을 설정 했습니다.
    # API키 같은 보안을 요구하는 정보들을 따로 담아두는 파일을 만들었습니다.
    # 해당 파일들은 .git의 관리를 받지 않으니, 직접 다운로드 받으셔서 후설한 위치에 두어주세요.
1. pull from origin/main
2. 다음과 같은 파일들이 제대로된 위치에 있는지 확인하세요.
 - .env -> backend내의 manage.py와 동일한 디렉토리 위치
 - big_05-19-417a99505603.json -> backend내 manage.py와 동일한 디렉토리 위치
 - OAuth_big0519 -> .git과 동일한 위치
 - .gitignore -> .git과 동일한 위치
3. 파일들이 제 위치에 없다면 직접 이동시키거나, 다운로드 받아서 이동시키세요.
4. .env 파일의 변수이름 = '값' 구조에서 띄어쓰기를 제거하세요
    ex) example_api = '1wedxads3' -> example_api='1wedxads3'
5. frontend에서는 위 과정에서 추가했던 .env파일 내부에 REACT_APP_으로 시작하는 key가 포함돼 있어야 합니다.