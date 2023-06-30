import React, { useState } from "react";
import { Join } from "./join";
import { Login } from "./login";

import {useNavigate} from "react-router-dom"
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';

const Choicelogin = ({ changeislogn }) => {
    const [navState, setnavState] = useState("choicelogin");

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
        space2_key: "space+2"
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

    // 핫키 적용 함수
    const handlers_cl = {
        space1_key:joinClick,
        space2_key:loginClick,
    };
    
    return (
        <>
            <GlobalHotKeys keyMap={keyMap_cl} handlers={handlers_cl}>
            </GlobalHotKeys>
        </>
      );
    };

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