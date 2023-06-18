import React, { useEffect, useState } from "react";

const TextToSpeech = (props) => {
    var input = props.body;
    const [ audioSource, setAudioSource ] = useState('');

    useEffect(() => {
        requestTTS(input);
    }, []);

    const reqTTS = (inputText) => {
        const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        const data = {
            input: {
                text: inputText, // 원하는 텍스트를 입력
            },
            voice: {
                languageCode: 'ko-KR',
                name: 'ko-KR-Wavenet-c',
                ssmlGender: 'MALE',
            },
            audioConfig: {
                audioEncoding: "LINEAR16",
            },
        };
        const otherparam = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
            method: "POST",
        };
        // 생성된 사운드 데이터
        return fetch(url, otherparam)
            .then((data) => data.json())
            .then((res) => res.audioContent)
            .catch((error) => {
                console.log(error);
            });
    }

    const requestTTS = async (input) => {
        var text = '';
        
        await reqTTS(input)
            .then(data => {
                text = data
            });
        var binary_string = window.atob(text);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }

        const audioContext = getAudioContext();        
        
        // makeAudio(response)
        const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        // console.log('source : ', source)
        setAudioSource(source)
    }
    
    const getAudioContext = () => {
        AudioContext = window.AudioContext; /* || window.webkitAudioContext */
        const audioContent = new AudioContext();
        return audioContent;
    }

    return(
        <div>
            {/* <h1><a href="/" onClick={(event) => {
                event.preventDefault();
                props.onChangeMode();
            }}>{props.title} */}
            {/* <audio autoplay><source type = "audio/mpeg" src={audioSource}/></audio> */}
        </div>
        
    )
}

export {TextToSpeech};