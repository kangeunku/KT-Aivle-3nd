from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from django.http import HttpResponse, JsonResponse

import requests
from bs4 import BeautifulSoup as bs
from urllib import parse
from time import sleep

def index(request):
    return HttpResponse('I am main.index')

@api_view(['POST'])
def first_search(request):
    query = request.data.get('query')
    result = get_filtering_info(query)
    return Response(result)


@api_view(['POST'])
def second_search(request):
    params = {'query':request.data.get('query'),
            'display':request.data.get('display'),
            'start':request.data.get('start'),
            'sort':request.data.get('sort'),
            'filter':'naverpay',
            'exclude':''}
    result = get_item_link(get_filtered_items(**params))
    return Response(result)

def get_filtering_info(query):

    params = {
        'query' : query,
        'cat_id' : '',
        'frm' : 'NVSHATC',
    }

    encoded_params = parse.urlencode(params, doseq=True)
    url = f'https://search.shopping.naver.com/search/all?{encoded_params}'

    response = requests.get(url)

    dom = bs(response.text, 'html.parser')

    # 카테고리 받아오기
    filtering_dict = {}

    query_checker = dom.select_one('#container > div.style_inner__i4gKy > div.filter_finder__E_I19')

    # 검색어에 문제가 있을 경우 고려
    if not query_checker:
        print('검색 결과가 없습니다. 검색어를 다시한번 확인해주세요.')

    else:
        filter_elements = query_checker.select('div.filter_finder__E_I19 > div > div')

        # 대분류 - key
        for each in filter_elements:

            category = each.select_one('div.filter_finder_tit__x1gjS').get_text().replace('더보기', '')

            # 가격과 배송/혜택/색상 카테고리는 검색 결과가 존재할 경우 항상 등장한다.
            # 게다가 다른 카테고리와는 다른 구성을 가지고 있다. 따라서 다음과 같은 처리를 해준다.
            if category == '가격' or category == '배송/혜택/색상':
                flag = 1
            else: flag = 2

            filtering_dict[category] = []


            # 소분류 - value
            for element in each.select('div ul > li > a'):

                element_lst = element.select('span')

                # 1개를 초과하는 추가 정보는 없다고 가정한다.
                if len(element_lst) == flag:
                    additional = element_lst[-1].text
                    content = element.text.replace(additional, '')

                # 1개가 아닐 경우가 있음에 유의하자.
                else:
                    content = element.text

                filtering_dict[category].append(content)

    return filtering_dict

def get_filtered_items(query, display=100, start=1, sort='sim', filter='naverpay', exclude=''):
    '''필터링 정보와 검색어를 입력받아 필터링된 상품과 함께 naver open api에서 제공하는 상품의 세부 정보들을 얻어오는 함수입니다.
        필요 라이브러리 : urllib.urlencode, requests, bs4

    params:
        query : str : 필터링 정보 + 검색어
        display : int default=100 : 한번에 표시할 상품 개수 (10 ~ 100)
        start : int default=1 : 검색 시작 위치(1부터 시작)
        sort : str default='sim' : 검색 결과 정렬 방법 - sim(유사도 정렬 후 네이버 랭킹순 정렬), date, asc, dsc
        filter : str default='naverpay' : 검색 결과에 포함할 상품 유형 - None(모든 유형), naverpay(네이버 페이 연동 상품)
        exclude : str default='' : 검색 결과에서 제외될 상품 유형 - used, rental, cbshop

    return:
        item_lst : list > dict : 최대 100 ~ 1개의 상품에 대하여 세부정보를 dict 형태로 가지고 있는 list
    '''
    # query부분에 담을 정보 저장
    params = {
        'query' : query,
        'display' : display,
        'start' : start,
        'sort' : sort,
        'filter' : filter,
        'exclude' : exclude,
    }

    # naver open api 사용 양식에 따라 utf-8 인코딩
    encoded_params = parse.urlencode(params, doseq=True)

    # header 추가 - 정보 보안 조치 필요!
    naver_api_headers = {
            'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'X-Naver-Client-Id': 'TAktb1nKZQIUuuOd1QEQ',
            'X-Naver-Client-Secret': 'UL5EU5TmhC',
        }

    url = f'https://openapi.naver.com/v1/search/shop.json?{encoded_params}'
    response = requests.get(url, headers=naver_api_headers)
    item_lst = response.json()['items']

    # 예외처리 - 2차 검색 결과 필터링 조건에 맞는 상품이 없는 경우
    if response.json()['total'] == 0:
        return [{'error' : '2차 검색 결과 필터링 조건에 맞는 상품이 발견되지 않았습니다.'}]

    return item_lst


def get_item_link(item_lst):
    '''get_filtered_items 함수에서 반환한 item_lst를 입력받아 각 상품이 가진 gate link 데이터를 실제 쇼핑몰 link 데이터로 변환해주는 함수입니다.
    params:
        item_lst : lst > dict : get_filtered_items 함수에서 반환된 lst
    return:
        item_lst_pp : lst > dict : gate link가 실제 쇼핑몰 link로 변환된 item_lst
            - 만약 link가 https://cr. 로 시작한다면, 네이퍼 쇼핑몰이 아닌 다른 쇼핑몰 사이트로 이동하는 것이다.
    '''
    # 네이버 쇼핑몰로 리다이렉트 되는 링크를 가진 상품들만을 모아놓기 위한 빈 리스트
    item_lst_pp = []

    gate_link_headers = {
        'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    }

    for idx, item in enumerate(item_lst):
        gate_link = item['link']
        sleep(0.1)
        response = requests.get(gate_link, headers=gate_link_headers)
        document = bs(response.text, 'html.parser')
        item_link = document.select('#wrap > div.product_bridge_product__n_89z > a.product_btn_link__XRWYu')[1].attrs['href']

        # 게이트 링크 이후에 얻은 url도 리다이렉트 되어 다른 url로 변환되기에 처리해준다.
        response2 = requests.get(item_link, headers=gate_link_headers)
        item_link_rd = response2.url


        if item_link_rd.startswith('https://cr.'):
            print(f'{idx}번째 상품은 네이버 쇼핑몰 웹페이지에서 제공되는 상품이 아닙니다.')
        else:
            item_lst[idx]['link'] = item_link_rd
            item_lst[idx]['gate_link'] = gate_link
            item_lst_pp.append(item_lst[idx])
            print(f'{idx}번째 상품 추가 완료')

    return item_lst_pp