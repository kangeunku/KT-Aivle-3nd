// import React, { useState } from "react";

// const reqTTS = (inputText) => {
//     const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
//     const data = {
//         input: {
//             text: inputText, // 원하는 텍스트를 입력
//         },
//         voice: {
//             languageCode: 'ko-KR',
//             name: 'ko-KR-Wavenet-c',
//             ssmlGender: 'MALE',
//         },
//         audioConfig: {
//             audioEncoding: "LINEAR16",
//         },
//     };
//     const otherparam = {
//         headers: {
//             "content-type": "application/json; charset=UTF-8",
//         },
//         body: JSON.stringify(data),
//         method: "POST",
//     };
//     // 생성된 사운드 데이터
//     return fetch(url, otherparam)
//         .then((data) => data.json())
//         .then((res) => res.audioContent)
//         .catch((error) => {
//             console.log(error);
//         });
// }

// const RequestTTS = async (input) => {
//     const [audioSource, setAudioSource] = useState('');
//     var text = '';

//     if(input === ''){
//         return null;
//     }

//     await reqTTS(input)
//         .then(data => {
//             text = data
//         });
//     var binary_string = window.atob(text);
//     var len = binary_string.length;
//     var bytes = new Uint8Array(len);
//     for (var i = 0; i < len; i++) {
//         bytes[i] = binary_string.charCodeAt(i);
//     }
    
//     const audioContext = getAudioContext();        
    
//     // makeAudio(response)
//     const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);
    
//     const source = audioContext.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(audioContext.destination);
//     console.log("inside:", source);
//     source.start();
//     // console.log('source : ', source)
//     // URL.getAudioContext
//     setAudioSource(source)

//     return source;
// }
    
// const getAudioContext = () => {
//     // AudioContext = window.AudioContext; /* || window.webkitAudioContext */
//     const audioContent = new AudioContext();
//     return audioContent;
// }

// export { RequestTTS };


import React, { useEffect, useState } from "react";

const TextToSpeech = ({value, onComplete}) => {
    var input = value;
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
        // URL.getAudioContext
        setAudioSource(source);
        onComplete(audioSource);
    }
    
    const getAudioContext = () => {
        AudioContext = window.AudioContext; /* || window.webkitAudioContext */
        const audioContent = new AudioContext();
        return audioContent;
    }

    return(
        <>
        </>
    )
}

export {TextToSpeech};