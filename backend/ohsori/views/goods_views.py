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
    return HttpResponse('I am goods.index')

@api_view(['GET', 'POST'])
def get_details(request):
    if request.method == 'GET':
        return Response({'status' : 200})
    else:
        goods_url = request.data.get('goods_url')
        result = {'detail_img_urls' : get_goods_imglink(goods_url),
                  'detail_options' : get_goods_options(goods_url),
                  }
    
    return Response(result)



def get_goods_imglink(goods_url):
    
    options = Options()
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument('--headless') # 랜더링 없이 브라우저를 컨트롤
    options.add_argument("--disable-gpu") # 랜더링이 없으면 gpu를 쓸일이 없으므로 비활성화
    options.add_argument('--no-sandbox')
    options.add_argument("--single-process")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(goods_url)
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
    print('상세 이미지 추출 완료')
    
    return image_elements


def get_goods_options(goods_url):
    
    options = Options()
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument('--headless') # 랜더링 없이 브라우저를 컨트롤
    options.add_argument("--disable-gpu") # 랜더링이 없으면 gpu를 쓸일이 없으므로 비활성화
    options.add_argument('--no-sandbox')
    options.add_argument("--single-process")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    driver.get(goods_url)
    driver.implicitly_wait(4)
    
    option_info = {}
    
    # 상품 상세 옵션에 대한 정보를 담고 있는 엘리먼트
    fieldset_element = driver.find_element(By.CLASS_NAME, '_10hph879os')
    
    # 배송지 옵션 카테고리 로직
    is_delivary_opt = fieldset_element.find_elements(By.CLASS_NAME, 'bd_3tzwm')
    
    if len(is_delivary_opt) == 0:
        print('배송지 옵션 카테고리가 없습니다.')
        option_info['delivary_opt'] = ''
        
    else:
        delivary_info = {}
        for delivary_element in is_delivary_opt:
            show_delivary = delivary_element.find_element(By.TAG_NAME, 'button')
            print(show_delivary.text) # 카테고리에 떠있는 text
            show_delivary.click()
            # 클릭후 페이지 소스 갱신 및 정보 접근
            listbox = driver.find_elements(By.CLASS_NAME, 'bd_1Z9Jr')
            # 정보 추출
            delivary_info[show_delivary.text] = [each.text for each in listbox]
            # 초기상태로 복귀
            show_delivary.click()
        option_info['delivary_opt'] = delivary_info
            
            
    # 필수 옵션 카테고리 로직
    necessary_opt_field = fieldset_element.find_element(By.CLASS_NAME, 'bd_2dy3Y')
    is_necessary_opt = necessary_opt_field.find_elements(By.CLASS_NAME, 'bd_3hLoi')
    
    if len(is_necessary_opt) == 0:
        print('필수 옵션 카테고리가 없습니다.')
        option_info['necessary_opt'] = ''
    
    else:
        option_info['necessary_opt'] = dfs_get_item_opt(0, len(is_necessary_opt), is_necessary_opt, driver)
    
    
    # 추가 옵션 카테고리 로직
    is_optional_opt = fieldset_element.find_elements(By.CLASS_NAME, 'bd_3LGgw')

    if len(is_optional_opt) == 0:
        print('추가 옵션 카테고리가 없습니다.')
        option_info['optional_opt'] = ''
    else:
        optional_info = {}
        for optional_opt in is_optional_opt:
            show_optional = optional_opt.find_element(By.CLASS_NAME, 'bd_2gVQ5')
            print(show_optional.text)
            show_optional.click()
            # 클릭 후 소스 페이지 갱신
            listbox = driver.find_elements(By.CLASS_NAME, 'bd_1zQEh')

            optional_info[show_optional.text] = [each.text for each in listbox]
            
            # 초기상태로 복귀
            show_optional.click()
        option_info['optional_opt'] = optional_info
        
    driver.close()

    return option_info
    
    
def dfs_get_item_opt(current, max_depth, category_button, driver):
    
    if current == max_depth - 1:
        # 현재 depth가 가진 정보에 접근
        category = category_button[current]
        # 정보 열람 버튼
        show_necessary = category.find_element(By.CLASS_NAME, 'bd_1fhc9')
        print(f'마지막 옵션 카테고리: {show_necessary.text}')
        
        # 정보 열람
        show_necessary.click()
        last_listbox = driver.find_elements(By.CLASS_NAME, 'bd_1y1pd')
        
        # 정보 추출
        driver.implicitly_wait(1)
        extracted = [x.text for x in last_listbox]

        return extracted
        
    temp_dict = {}
    # 현재 depth가 가진 정보에 접근
    category = category_button[current]
    # 정보 열람 버튼

    show_necessary = category.find_element(By.CLASS_NAME, 'bd_1fhc9')
    print(f'{current + 1}번째 옵션 카테고리: {show_necessary.text}')
    # 정보 열람
    show_necessary.click()
    # 정보 접근
    listbox_cnt = len(driver.find_elements(By.CLASS_NAME, 'bd_1y1pd'))
    driver.implicitly_wait(1)
    show_necessary.click()
    
    for idx in range(listbox_cnt):
        
        show_necessary.click()
        listbox = driver.find_elements(By.CLASS_NAME, 'bd_1y1pd')
        button = listbox[idx]
        key = button.text
        button.click()
        temp_dict[key] = dfs_get_item_opt(current+1, max_depth, category_button, driver)


    # 현재 depth에서 접근가능한 모든 정보를 추출완료
    return temp_dict    