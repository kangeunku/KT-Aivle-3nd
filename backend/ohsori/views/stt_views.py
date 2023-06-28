from __future__ import division

import re
import sys, os

from google.cloud import speech

from six.moves import queue
from django.conf import settings
import base64, wave

from rest_framework.decorators import api_view
from rest_framework.response import Response

from symspellpy_ko import KoSymSpell, Verbosity #symspellpy 기반 단어 교정 라이브러리
from jamo import h2j, j2hcj
from .unicode import join_jamos # unicode.py 불러오기

@api_view(['GET'])
def transcribe_streaming(request) -> speech.RecognitionConfig: #stream_file : bs64
    if request.method == 'GET':
        """Streams transcription of the given audio file."""
        client = speech.SpeechClient()
        stream_file = request.data.get('bs64')
        wav_data = base64.b64decode(stream_file)
        
        wav_path = os.path.join(settings.AUDIO_PATH, 'eunku'+'_sound.wav') #user_no -> username 지금은 패스 !! 변경필요
        with open(wav_path, 'wb') as file:
            file.write(wav_data)
        with open(wav_path, "rb") as audio_file:
            content = audio_file.read()
        
        # In practice, stream should be a generator yielding chunks of audio data.
        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
            language_code="ko-KR",
        )
        
        response = client.recognize(config=config, audio=audio)

        # 변환된 텍스트 추출
        transcript = ""
        for result in response.results:
            transcript += result.alternatives[0].transcript + " "
        # print('transcript: \n', transcript)
        result = word_correction(transcript)
        dict = {}
        dict['stt'] = transcript
        dict['result'] = result
        return Response(dict)

def word_correction(text):
    whole_words = ['검색', '찜목록', '회원정보수정', '고객센터', 
                   '더보기','일번','이번','삼번','사번','오번', '1번',
                   '2번','3번','4번','5번', '회원 정보 수정','고객 센터','찜 목록','더 보기']
    
    if text in whole_words:
        return text
    
    sym_spell = KoSymSpell()
    sym_spell.create_dictionary(['ㄱㅓㅁㅅㅐㄱ', 'ㅉㅣㅁㅁㅗㄱㄹㅗㄱ', 
                                'ㅎㅚㅇㅝㄴㅈㅓㅇㅂㅗㅅㅜㅈㅓㅇ', 'ㄱㅗㄱㅐㄱㅅㅔㄴㅌㅓ', 'ㄷㅓㅂㅗㄱㅣ']) 
    
    word_jamo = j2hcj(h2j(text)) # 단어를 자소로 분해하기 겅생 -> ㄱㅓㅇㅅㅐㅇ
    temp = sym_spell.lookup(word_jamo, Verbosity.ALL, max_edit_distance=2)
    
    if not temp:
        return '다시 말씀해주세요'
    else:
        for suggestion in temp:
            text_correction = suggestion.term
            return join_jamos(text_correction)