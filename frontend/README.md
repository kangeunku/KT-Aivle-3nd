# 파일구조설명
public - favicon, logo, index.html


src - assets - 이미지, 파일등

    - components - 공토으로 사용하는 것들

    - pages - 페이지 로직실행되는 곳
            - items - 상품 리스트, 찜하기, 상품 상세
            - main - 메인, 검색
            - payment - 결제화면
            - support - 고객센터, Q&A
            - user - 로그인, 회원가입, 마이페이지
    - styles - css 파일


App.js - 라우터기능
















# node error
노드 깃에 올리고 다운받으면서 패키지 충돌
  - npm cache clean --force 명령어로 캐시를 삭제한다.
  - node_modules 폴더를 삭제한다.
  - package-lock.json 파일을 삭제한다.
  - npm install 명령어를 입력해서 node_modules와 package-lock.json를 다시 설치해준다. 