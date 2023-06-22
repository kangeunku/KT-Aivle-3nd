import React, { useState } from "react";
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// useHotkeys 훅은 여러 개의 키나 조합된 키, 화살표 키, 기능 키 등을 처리
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// 장고 전송 함수, state  
const Send = (state, data, callback) => {
    const csrftoken = document.getElementsByName("csrftoken").value;
    axios.get("http://127.0.0.1:8000/", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        params:{
            state: state,
            data: data,
            callback: callback,
        }
    })
    .then(function (response) {
        console.log(response);
        console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
    });
}

// stt 서비스 생성
const Stt_common = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
}

// 핫키 생성
const Hotkey_start = () => {
    // 핫키 설정
    const keyMap = {
        enter_key: 'enter',
        spacebar_key: "space+w",
        // keypress, keydown, keyup.
        space_down: { sequence: "space", action: "keydown" }
    };

    const handleClick = () => {
        console.log('enter');
    };
    const spaceClick = () => {
        console.log('space + w');
    };
    const spacedownClick = () => {
        console.log('space down');
    };

    // 핫키 적용 함수
    const handlers = {
        enter_key: handleClick,
        spacebar_key: spaceClick,
        space_down: spacedownClick,
    };
    
    return (
        <>
            <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
            </GlobalHotKeys>
        </>
    );
};

export { Send, Stt_common, Hotkey_start };






