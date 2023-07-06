from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

import requests
from bs4 import BeautifulSoup as bs
from urllib import parse
from time import sleep
from concurrent.futures import ThreadPoolExecutor


def get_item_link(item_lst): # 멀티 스레딩 적용가능
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
            item_lst_pp.append(item_lst[idx])
            print(f'{idx}번째 상품 추가 완료')

    return item_lst_pp