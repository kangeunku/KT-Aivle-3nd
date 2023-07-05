from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

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

from ..models import Goods, Goods_summary
from ..serializers import GoodsSerialize
    
        
@api_view(['POST'])
def get_details(request):
    # 상품이 이미 DB에 저장되어 있는 경우 - 조회 및 필요정보 추출 로직
    try:
        goods_url = request.data.get('goods_url')
        goods = Goods.objects.get(goods_url = goods_url)
        goods_summary = Goods_summary.objects.get(goods_no=goods.goods_no)
        
        is_show, img_pathes = goods_summary.summary['is_show'], goods_summary.summary['img_pathes']
        summary_lst, whole_summary = goods_summary.summary['summary_lst'], goods_summary.whole_summary
        
        img_pathes_front = [img_pathes[idx] for idx, value in enumerate(is_show) if value != 0]
        img_pathes_front = ['http://127.0.0.1:8000/media/data/images/'
                            + value.split('\\')[-2] + '/' 
                            + value.split('\\')[-1]
                            for value in img_pathes_front]
        
        summary_lst_front = [summary_lst[idx] for idx, value in enumerate(is_show) if value != 0]
        
        
        front_result = {'img_pathes': img_pathes_front,
                        'summary_lst': summary_lst_front,
                        'whole_summary': whole_summary,
                        'detail': goods_summary.detail
                        }
        
        return Response(front_result) # 상품 정보 회신
    
    # 상품이 DB에 저장되어 있지 않은 경우 - 크롤링 및 추출 후 DB 저장 및 전달 로직
    except Goods.DoesNotExist:
        goods_url = request.data.get('goods_url')
        # 상세 이미지 저장 후 product_id 가져오기
        product_id = save_goods_imgs(goods_url)
        
        result = {'detail_options' : get_goods_options(goods_url),
                'output' : ocr2summary(product_id),
                }
        
        goods_name, goods_star = result['detail_options']['goods_name'], result['detail_options']['goods_star']
        goods_price, goods_thumb = int(result['detail_options']['goods_price'].replace(',', '')), result['detail_options']['goods_thumb']
        img_pathes, is_show = result['output']['img_pathes'], result['output']['is_show']
        summary_lst, final_summary = result['output']['summary_lst'], result['output']['final_summary']
        # DB로 가기
        goods = Goods() 
        goods.goods_url = goods_url
        goods.goods_name = goods_name
        goods.goods_star = goods_star
        goods.goods_price = goods_price
        goods.goods_thumb = goods_thumb
        goods.use_yn = "y"
        goods.save()
        
        goods_no = Goods.objects.only('goods_no').get(goods_url = goods_url)
        # goods_no = Goods.objects.get(goods_no = Goods.objects.get(goods_url = goods_url).only('goods_no'))
        goods_summary = Goods_summary()
        goods_summary.goods_no = goods_no
        goods_summary.summary = {'is_show' : is_show,
                                'summary_lst' : summary_lst,
                                'img_pathes': img_pathes}
        goods_summary.whole_summary = final_summary
        goods_summary.detail = result['detail_options']
        goods_summary.save()

        # 프론트로가기
        img_pathes_front = [img_pathes[idx] for idx, value in enumerate(is_show) if value != 0]
        img_pathes_front = ['http://127.0.0.1:8000/media/data/images/'
                            + value.split('\\')[-2] + '/' 
                            + value.split('\\')[-1]
                            for value in img_pathes_front]
        summary_lst_front = [summary_lst[idx] for idx, value in enumerate(is_show) if value != 0]
        front_result = {'img_pathes': img_pathes_front,
                        'summary_lst': summary_lst_front,
                        'whole_summary': final_summary,
                        'detail': result['detail_options'],
                        }

        return Response(front_result) 


#######################################################

def save_goods_imgs(goods_url):
    '''save_goods_imgs 함수에 병렬 스레드를 적용한 VIP 회원 및 시각장애인들을 위한
    프리미엄 함수입니다. 스레드의 갯수를 뜻하는 max_workers는 사용 가능한 CPU 수 + 4로
    설정하는 것이 일반적으로 좋습니다.
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

    # 상품 상세 이미지에 대한 링크가 담긴 엘리먼트 리스트
    visual_elements = []
    for div_element in div_elements:
        images = div_element.find_elements(By.TAG_NAME, 'img')
        visual_elements.extend(images)

    
    # 이미지 파일이 저장될 디렉토리 생성 및 지정
    root_path = settings.IMAGE_PATH
    product_id = goods_url.split('/products/')[-1]
    image_path = os.path.join(root_path, product_id)
    os.makedirs(image_path, exist_ok=True)
    
    start_time = time.time()
    # 상품 상세 이미지 링크를 담을 리스트
    src_lst = []
    for idx, element in enumerate(visual_elements):
        src = element.get_attribute("data-src")
        if src[-3:] == 'jpg' or src[-4:]=='w860':
            src_lst.append(src)
            
            
    driver.close()
    # 상품 상세 이미지 링크에 대한 유효성 검증에 병렬 스레드 적용
    with ThreadPoolExecutor(max_workers=8) as pool:
        responses = list(pool.map(requests.get, src_lst))
    
    # 상품 상세 이미지 인덱싱
    cnt = 0
    for src, response in zip(src_lst, responses):
        if response.status_code == 200:
            cnt = img_split2save(response.content, image_path, cnt)
    
    end_time = time.time()
    
    print(f'상세 이미지 추출 완료 : {end_time - start_time}초')
    
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


def get_goods_options(goods_url):
    '''Selenium과 webdriver_manager를 이용해
    네이버 쇼핑몰 페이지에서 각종 정보들을 얻어서 딕셔너리 형식으로 반환하는 함수입니다. 
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
    
    option_info = {}
    
    # 상품 대표 이미지
    thumbnail_element = driver.find_element(By.CLASS_NAME, '_2tT_gkmAOr')
    goods_thumb = thumbnail_element.find_element(By.TAG_NAME, 'img').get_attribute('data-src')
    option_info['goods_thumb'] = goods_thumb
    
    # 상품 별점
    reviews = driver.find_elements(By.CLASS_NAME, '_2Q0vrZJNK1')
    goods_star_element = reviews[1].find_element(By.CLASS_NAME, '_2pgHN-ntx6')
    goods_star = goods_star_element.text.replace('\n', '')
    option_info['goods_star'] = goods_star
    
    # 상품 가격 및 상세 옵션에 대한 정보를 담고 있는 엘리먼트
    fieldset_element = driver.find_element(By.CLASS_NAME, '_10hph879os')
    
    # 상품 이름
    goods_name_element = fieldset_element.find_element(By.CLASS_NAME, '_22kNQuEXmb')
    goods_name = goods_name_element.text
    option_info['goods_name'] = goods_name
    
    # 상품 가격
    goods_price_element = fieldset_element.find_elements(By.CLASS_NAME, '_1LY7DqCnwR')
    goods_price = goods_price_element[-1].text
    option_info['goods_price'] = goods_price
    
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
    try:
        necessary_opt_field = fieldset_element.find_element(By.CLASS_NAME, 'bd_2dy3Y')
        is_necessary_opt = necessary_opt_field.find_elements(By.CLASS_NAME, 'bd_3hLoi')
    except:
        is_necessary_opt = []
    
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
    '''get_goods_options의 내부 로직에 사용되는 함수이며,
    계층적으로 구조가 이루어진 필수 옵션 카테고리가 가진 정보에 접근 및 추출하기 위한 dfs 함수 입니다. 
    '''
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
        
        show_necessary.click()

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

def ocr2summary(product_id):
    '''특정 상품의 product_id를 받아 images 디렉토리에 저장된 상품 상세 이미지 파일에 접근 한 후,
    OCR, 텍스트 요약, 사용 이미지 선별, 전체 텍스트 요약까지의 과정을 이어주는 hub함수입니다.
    '''
    # 상세 이미지 경로 접근
    image_root = settings.IMAGE_PATH
    image_dir = os.path.join(image_root, str(product_id))
    img_pathes = glob.glob(os.path.join(image_dir, '*'))

    # OCR -> 16.7 ~ 19.03
    start_time = time.time()
    
    img_content_lst = []
    for filepath in img_pathes:
        img_content_lst.append(get_img_content(filepath))

    with ThreadPoolExecutor(max_workers=8) as pool:
        sentence_lst = list(pool.map(ocr, img_content_lst))
        
    end_time = time.time()
    print(f'OCR 작업 완료 : {end_time - start_time}')
    
    # 텍스트 요약
    # 요약 정보의 유무에 따라서 사용할 이미지 선별
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=8) as pool:
        summary_lst = list(pool.map(summarization, sentence_lst))
        
    is_show = [1 if summary!='' else 0 for summary in summary_lst]
    
    end_time = time.time()
    print(f'텍스트 요약 작업 완료 : {end_time - start_time}')
    
    # 전체 텍스트 요약
    whole_summary = ' '.join([summary_lst[idx] for idx, value in enumerate(is_show) if value == 1])
    print(whole_summary)
    final_summary = request_summary(whole_summary, 3)
    
    return {
            'img_pathes' : img_pathes, # 상품 상세 이미지가 저장된 경로가 담긴 리스트
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
    '''ocr2summary 함수의 내부 로직에 이용되는 함수입니다.
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
    