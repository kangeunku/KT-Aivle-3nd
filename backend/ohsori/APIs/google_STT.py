from __future__ import division

import re
import sys, os

from google.cloud import speech

import pyaudio, cgi
from six.moves import queue
from django.conf import settings
import base64, wave

def transcribe_streaming(user_no, stream_file) -> speech.RecognitionConfig:
    """Streams transcription of the given audio file."""
    client = speech.SpeechClient()

    wav_data = base64.b64decode(stream_file)
    
    wav_path = os.path.join(settings.AUDIO_PATH, f'{user_no}', '_sound.wav')
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
    return transcript