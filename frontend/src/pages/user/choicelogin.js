import React, { useState, useRef, useEffect } from "react";
import { Join } from "./join";
import { Login } from "./login";

import {useNavigate} from "react-router-dom"
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';

import { TextToSpeech } from "../../components";

const Choicelogin = ({ changeislogn }) => {
    const [navState, setnavState] = useState("choicelogin");

    // tts 상태 지정
    const [starttts, setstarttts] = useState(false);
    const ref_tts = useRef(starttts);

    const ttsStart = () => {
        ref_tts.current = true;
    };
    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    const Navigate = useNavigate();

    const goJoin = () => {
        Navigate('/join');
    }

    const goLogin = () => {
        Navigate('/login');
    }
    // 핫키 생성
  const Hotkey_choicelogin = () => {
    // 핫키 설정
    const keyMap_cl = {
        space1_key: 'space+1',
        space2_key: "space+2",
        need_tts: "shift+q",
        stop_tts: "shift+d",
        // keypress, keydown, keyup.
        // space_down: { sequence: "space", action: "keydown" }
    };

    const joinClick = () => {
        console.log('space + 1');
        setnavState("join");
        goJoin();
    };
    const loginClick = () => {
        console.log('space + 2');
        setnavState("login");
        goLogin();
    };
    // tts 실행
    const need_tts = () => {
        ttsStart();
        setstarttts(ref_tts.current);
    }
    // tts 중단
    const stop_tts = () => {
        console.log("111111")
        handleAudio();
    }
    
    // 핫키 적용 함수
    const handlers_cl = {
        space1_key:joinClick,
        space2_key:loginClick,
        need_tts:need_tts,
        stop_tts:stop_tts,
    };
    
    return (
        <>
            <GlobalHotKeys keyMap={keyMap_cl} handlers={handlers_cl}>
            </GlobalHotKeys>
        </>
      );
    };
    const tts_choice_type =`
    오소리는 가입된 회원에게 서비스를 제공하고 있습니다.
    계정이 없으시면 스페이스바와 1번을 동시에 눌러 회원가입을 진행해주세요.
    계정이 있으시면  스페이스바와 2번을 동시에 눌러 로그인을 진행해주세요.
    `
    
    if(navState == 'choicelogin'){
        
        return (
            <>
            <Hotkey_choicelogin />
            <div className="index_content">
                <div className="choice_tab">
                    <h2 className="welcome">
                        환영합니다!
                    </h2>
                    <p className="index_txt">로그인 혹은 회원가입을 선택해주세요<br/>
                        <b>1번</b>을 누르면 <b>회원가입</b>으로, 
                        <b>2번</b>을 누르면 <b>로그인</b>으로 이동합니다.
                    </p>
                </div>
                <div className="choice_container">
                    <a className="choice_box" onClick={() => setnavState("join")}>
                        <p className="choice_a_txt">
                            <strong>회원 가입</strong>
                            처음 오소리를 이용하신다면 회원가입을 통해 다양한 서비스를 이용해보세요
                        </p>
                    </a>
                    <a className="choice_box" onClick={() => setnavState("login")} >
                        <p className="choice_a_txt">
                            <strong>로그인</strong>
                            한번 오소리를 이용해보았다면 로그인 후 서비스를 이용해보세요!
                        </p>
                    </a>
                </div>
            </div>
            {starttts && <TextToSpeech value={tts_choice_type} />}
            </>
        );
    }
    else if(navState == 'join'){
        return(
            <div className="index_content">
                <Join changeislogn={changeislogn}/>
            </div>
        )

    }
    else if(navState == 'login'){
        return(
            <div className="index_content">
                <Login changeislogn={changeislogn}/>
            </div>
        )
    }
}

export { Choicelogin }; 