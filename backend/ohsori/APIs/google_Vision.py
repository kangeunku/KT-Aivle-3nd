from google.cloud import vision
import os

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.abspath('big-05-19-417a99505603.json')

client_options = {'api_endpoint': 'eu-vision.googleapis.com'}
client = vision.ImageAnnotatorClient(client_options=client_options)

def ocr(raw_image):
    image = vision.Image(content=raw_image)
    response = client.text_detection(image=image)
    texts = response.text_annotations
    if len(texts) > 0:
        whole_extraction = texts[0].description
    else:
        whole_extraction = ''
    print('OCR 완료')
    return whole_extraction