from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from django.http import HttpResponse, JsonResponse
from django.conf import settings

from ..APIs.google_Vision import ocr
from ..APIs.clova_summary import request_summary

import requests
import os, glob, io
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from ..models import Goods
from ..serializers import GoodsSerialize


@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'GET':
        return Response({'status' : 'Ready to Activate Selenium'})
    
    else:
        visible_selenium()
        return Response({'status': 'time out'})
    

def visible_selenium():
    options = Options()
    # options.add_argument("--remote-debugging-port=9222")
    # options.add_argument('--headless') # 랜더링 없이 브라우저를 컨트롤
    options.add_argument("--disable-gpu") # 랜더링이 없으면 gpu를 쓸일이 없으므로 비활성화
    options.add_argument('--no-sandbox')
    # options.add_argument("--single-process") # 드라이버의 cpu 및 메모리 점유율 낮추기
    options.add_argument("--disable-dev-shm-usage")
    print(options)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get('https://smartstore.naver.com/storyoutlet/products/4142362905')
    driver.implicitly_wait(4)
    time.sleep(120)
    driver.close()