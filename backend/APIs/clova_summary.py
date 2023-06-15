import sys
import requests
import json

CLIENT_ID = 'vtb0g8hvo4'
CLIENT_SECRET = 'kyhMcROp4PKYTnGJU2KEe1VSemBsatbsoOqCAKuG'
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
            'summaryCount': 1
        }
    }

    response = requests.post(URL, headers=header, data=json.dumps(data).encode('UTF-8'))
    rescode = response.status_code

    if rescode == 200:
        print(response.text)
    else:
        print('Error: ' + response.text)
        