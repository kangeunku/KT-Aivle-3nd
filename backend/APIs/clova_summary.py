import requests
import json
from os import path
import environ

if __name__=='__main__':
    import sys
    sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
    from base.settings import BASE_DIR
else:
    from ..base.settings import BASE_DIR

env = environ.Env(DEBUG=(bool, True))
environ.Env.read_env(
    env_file=path.join(BASE_DIR, '.env')
)

CLIENT_ID = env('CLOVA_CLIENT_ID')
CLIENT_SECRET = env('CLOVA_CLIENT_SECRET')
URL = 'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize'

header = {
    'Accept': 'application/json;UTF-8',
    'Content-Type': 'application/json;UTF-8',
    'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET
}
def request_summary(text):
    data = {
        'document': {
            'content': f'{text}'
        },
        'option': {
            'language': 'ko',
            'model': 'general',
            'tone': 2,
            'summaryCount': 2
        }
    }

    response = requests.post(URL, headers=header, data=json.dumps(data).encode('UTF-8'))
    rescode = response.status_code

    if rescode == 200:
        print(response.text)
    else:
        print('Error: ' + response.text)

    # return -> {"summary":"text"}
