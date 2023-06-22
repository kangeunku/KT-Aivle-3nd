from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
# 키값을 settings에 등록해놓았기때문
from django.conf import settings


def index(request):
    question_list = "sssssssssssss"
    context = {'question_list': question_list}
    return render(request, 'index.html', context)


# json 데이터 받아서 다른 함수와 연결하는 함수
def send(request):
    data = request.POST.get('data','')
    state = request.POST.get('state','')
    callback = request.POST.get('callback','')
    
    # 실행시킬 함수 딕셔너리
    func_dic = {
        'test_result' : test_result,
    }
    # 등록된 함수 실행
    data_return = func_dic[state](data)
    
    # 전송될 데이터 형식 
    result = {
        'data' : data_return,
        'callback': callback
    }
    return JsonResponse(result)

def test_result(request):
    prompt = "하하이것은 거짓이다"
    answer ="ddddddd"
    result= {
        'question' : prompt,
        'answer' : answer
    }
    return result

