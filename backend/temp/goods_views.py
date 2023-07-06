from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from django.conf import settings

from ..ohsori.APIs.google_Vision import ocr
from ..ohsori.APIs.clova_summary import request_summary

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

from ..ohsori.models import Goods, Goods_summary


def save_goods_imgs(goods_url):
    '''네이버 쇼핑몰 페이지에서 상품에 대한 상세 이미지 링크를 추출해 media > data > images > product_id 아래에
    3자리 숫자로 인덱싱에 저장하는 함수 입니다. 그후, 이미지 파일이 저장된 디렉토리에 접근하기 위한 product_id를 반환합니다.
    %주의% 이 함수는 Goods 테이블에 존재하지 않는 상품에 접근할때 사용되어야 합니다.
    '''
    
    options = Options()
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument('--headless') # 랜더링 없이 브라우저를 컨트롤
    options.add_argument("--disable-gpu") # 랜더링이 없으면 gpu를 쓸일이 없으므로 비활성화
    options.add_argument('--no-sandbox')
    options.add_argument("--single-process")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(goods_url)
    driver.implicitly_wait(2)

    div_elements = driver.find_elements(By.CLASS_NAME, 'se-image')

    visual_elements = []
    for div_element in div_elements:
        images = div_element.find_elements(By.TAG_NAME, 'img')
        visual_elements.extend(images)

    # 이미지 링크를 담을 리스트
    image_elements = []
    
    # 이미지 파일이 저장될 디렉토리 생성 및 지정
    root_path = settings.IMAGE_PATH
    product_id = goods_url.split('/products/')[-1]
    image_path = os.path.join(root_path, product_id)
    os.makedirs(image_path, exist_ok=True)
    
    # 상품 상세 이미지 인덱싱
    cnt = 0
    for idx, element in enumerate(visual_elements):
        src = element.get_attribute('data-src')

        # 이미지 데이터만 접근
        if src[-3:] == 'jpg' or src[-4:] == 'w860':
            response = requests.get(src) # -> 멀티 스레드 적용

            # 유효한 이미지 데이터만 분류
            if response.status_code == 200:
                
                # case 1 : 상품 상세 이미지 링크 담기
                image_elements.append(src)
                
                # # case 2 : 상품 상세 이미지를 장고 서버에 저장하기
                # filename = os.path.join(image_path, f'test{cnt}.jpg')
                # cnt += 1
                # with open(filename, 'wb') as f:
                #     f.write(response.content)
                
                # case 2-2 : 이미지 분할 가능성 체크하고 MEDIA 파일에 저장하기
                cnt = img_split2save(response.content, image_path, cnt)
                
            else:
                print(f'{idx+1} 번째 링크는 유효하지 않습니다: {src}')
        else:
            print(f'{idx+1} 번째 링크 속 데이터는 jpg 형식이 아닙니다: {src}')
            
        print(f'{idx+1} 번째 링크 처리 완료')
    
    driver.close()
    print(f'상세 이미지 추출 완료')
    
    return product_id

def img_split2save(img_content, save_path, idx, front_width=6, front_height=5):
    '''save_goods_imgs에 내부 로직에 사용되는 함수입니다. 이미지 소스 링크를 받아서 크기를 확인 후,
    frontend에서 보여질 가로 세로 비율을 이용한 분할 기준으로 분할한 뒤,
    media > data > images > product_id 경로에 저장합니다. 모든 과정이 끝나면 인덱스 번호를 갱신하여 반환합니다.
    '''
    raw_image = Image.open(io.BytesIO(img_content))
    raw_width, raw_height = raw_image.size
    
    # 현재 이미지 인덱스
    current = idx
    # 원본 이미지와 프론트엔드 이미지 창의 비율
    scaler = raw_width // front_width
    # 비율에 맞게 분할할 크기 지정
    cutter = front_height * scaler
    # 확정 분할 횟수
    split_times = raw_height // cutter
    # 분할 후 마지막 이미지의 높이
    leftover_height = raw_height % cutter
    
    for start in range(split_times + 1):
        # 파일이 저장될 경로
        filepath = os.path.join(save_path, f'{current:03d}.jpg')
        start_h = start * cutter
        
        # 분할 후 남은 이미지 데이터 처리 후 저장
        if split_times == start:
            if leftover_height > scaler:
                raw_image.crop((0, start_h, raw_width, raw_height)).save(filepath)
                current += 1
                
        # 이미지 분할 후 저장
        else:
            end_h = start_h + cutter
            raw_image.crop((0, start_h, raw_width, end_h)).save(filepath)
            current += 1
             
    return current


def ocr2summary(product_id):
    '''특정 상품의 product_id를 받아 images 디렉토리에 저장된 상품 상세 이미지 파일에 접근 한 후,
    OCR, 텍스트 요약, 사용 이미지 선별, 전체 텍스트 요약까지의 과정을 이어주는 hub함수입니다.
    '''
    # 상세 이미지 경로 접근
    image_root = settings.IMAGE_PATH
    image_dir = os.path.join(image_root, str(product_id))
    img_pathes = glob.glob(os.path.join(image_dir, '*'))

    # OCR -> 병렬 스레드 전 - 144.28
    start_time = time.time()
    sentence_lst = []
    for filepath in img_pathes:
        sentence_lst.append(text_extraction(filepath))
    end_time = time.time()
    print(f'OCR 작업 완료 : {end_time - start_time}')
    
    start_time = time.time()
    # 텍스트 요약 - APIs/clova_summary.request_summary -> 병렬 스레드화
    summary_lst = []
    # 요약 정보의 유무에 따라서 사용할 이미지 선별
    is_show = []
    for sentence in sentence_lst:
        if sentence:
            summary = request_summary(sentence.replace('\n', ' '), 1)
            summary_lst.append(summary)
            if summary:
                # 정상적으로 요약이 성공한 경우
                is_show.append(1)
            else:
                # 이미지에서 추출된 텍스트 데이터가 너무 적은 경우
                is_show.append(0)
        else:
            print('해당 이미지에는 추출할 텍스트가 없습니다.')
            summary_lst.append(sentence)
            is_show.append(0)
    end_time = time.time()
    print(f'텍스트 요약 작업 완료 : {end_time - start_time}')
    
    whole_summary = ' '.join(summary_lst)
    final_summary = request_summary(whole_summary, 3)
    
    return {
            # 'img_pathes' : img_pathes, # 처리 순서 확인용
            'text_lst' : sentence_lst, # 분할된 이미지에서 추출된 텍스트
            'summary_lst' : summary_lst, # 분할된 이미지별 요약 텍스트
            'is_show' : is_show, # 요약 텍스트 유무에 따른 사용 여부 결정 리스트
            'final_summary' : final_summary, # 전체 이미지에 대한 요약 텍스트
            }

def text_extraction(filepath):
    '''ocr2summary 함수의 내부 로직에 이용되는 함수입니다.
    각 이미지 파일에 대한 OCR 작업을 처리 후 추출된 텍스트를 반환합니다.
    '''
    
    with io.open(filepath, 'rb') as image_file:
        content = image_file.read()
    text = ocr(content)
        
    return text


def get_img_content(filepath):
    '''ocr2summary_premium 함수의 내부 로직에 이용되는 함수입니다.
    입력으로 받아온 경로에 존재하는 이미지 파일을 읽어옵니다.
    '''
    
    with io.open(filepath, 'rb') as image_file:
        content = image_file.read()
    
    return content


def summarization(sentence):
    if sentence:
        summary = request_summary(sentence.replace('\n', ' '), 1)

    else:
        summary = sentence
    
    return summary