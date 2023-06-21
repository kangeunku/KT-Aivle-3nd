from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from django.http import HttpResponse, JsonResponse

import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def index(request):
    return HttpResponse('I am item.index')

@api_view(['GET', 'POST'])
def get_imgs(request):
    if request.method == 'GET':
        return Response({'status' : 200})
    else:
        item_url = request.data.get('item_url')
        result = {'detail_img_link' : get_item_imglink(item_url)}
    
    return Response(result)

def get_item_imglink(item_url):
    
    options = Options()
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument('--headless') # 랜더링 없이 브라우저를 컨트롤
    options.add_argument("--disable-gpu") # 랜더링이 없으면 gpu를 쓸일이 없으므로 비활성화
    options.add_argument('--no-sandbox')
    options.add_argument("--single-process")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    item_url = 'https://smartstore.naver.com/homgol/products/5811396719'
    driver.get(item_url)
    driver.implicitly_wait(4)

    div_elements = driver.find_elements(By.CLASS_NAME, '_9F9CWn02VE')

    visual_elements = []
    for div_element in div_elements:
        images = div_element.find_elements(By.TAG_NAME, 'img')
        visual_elements.extend(images)

    image_elements = []
    for idx, element in enumerate(visual_elements):

        src = element.get_attribute('data-src')

        if src[-3:] == 'jpg' or src[-4:] == 'w860':
            response = requests.get(src)

            if response.status_code == 200:
                image_elements.append(src)
            else:
                print(f'유효하지 않은 이미지 링크입니다: {src}')
        else:
            print(f'jpg 형식의 이미지 데이터가 아닙니다: {src}')
    
    driver.close()
    
    return image_elements