import React, { useState } from "react";
import { Modal } from "../../components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {  Home } from "../../pages";
import {  Header } from "../../components";
import { useCookies } from 'react-cookie';
import { TextToSpeech } from "../../components";

import axios from "axios";

import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';

const Login = ({ changeislogn }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['usercookie']);
    const [starttts, setstarttts] = useState(false);

    const[form, setFrom] = useState({
        "username": "",
        "password": "",
        // username_val : false,
        // password_val : false,
    });

    const navigate = useNavigate();


    const join_btn = async () => {
        const url = "http://127.0.0.1:8000/v1/login/"

        await axios.post(url, form, {withCredentials: true})
        .then(function (response) {
            // setResult(JSON.stringify(response.data))
            // setResult(response.data);
            // console.log(response);
            // console.log(JSON.stringify(response.statusText));
            const res = JSON.stringify(response.statusText);

            // 나중에 닉네임 전달받으면 넣어줄것
            // let cookie_name = "사과"

            setCookie('usercookienickname',response.data.nickname, { path: '/' });
            setCookie('usercookieid', form.username, { path: '/' });
            
            // 로그인 처리및 홈이동
            
            if(res === '"OK"'){
                changeislogn(true);
                navigate('/home');
            }
            
        })
        .catch(function (error) {
            console.log(error);
        })   
    };

    const handleUsernameChange = (e) => {
        const username = e.target.value;
        const isValidUsername = username.match(/^[a-zA-Z0-9가-힣]*$/) && username.length >= 2;
        setFrom({ ...form, username, username_val: isValidUsername });
    };

    const handleUserpwChange = (e) => {
        const password = e.target.value;
        const isValidUserpw = password.length >= 4;
        setFrom({ ...form, password, password_val: isValidUserpw });
    };

       // 오디오중지
    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    const isAllFieldsValid = form.username_val && form.password_val;
    // 핫키 생성
    const Hotkey_lg = () => {
        // 핫키 설정
        const keyMap_lg = {
            space1_key: 'space+1',
            space2_key: "space+2",
            jointts: 'shift+q',
            stoptts: 'shift+d',
        };
        

        const idinputClick = () => {
            console.log('space + 1');            
            document.getElementById('id').focus();
        };

        const pwinputClick = () => {
            console.log('space + 2');
            document.getElementById('pw').focus();
        };

        const jointtsClick = () => {
            setstarttts(true)
        }
        const stop_tts = () => {
            setstarttts(false)
            handleAudio();
        }

        // 핫키 적용 함수
        const handlers_lg = {
            space1_key: idinputClick,
            space2_key: pwinputClick,
            jointts: jointtsClick,
            stoptts: stop_tts,
        };
        
        return (
            <>
                <GlobalHotKeys keyMap={keyMap_lg} handlers={handlers_lg}>
                </GlobalHotKeys>
            </>
        );
    };
    const ttslogin =`로그인이다 이좌식아.
    아이디는 ${form.username ==''? "빈칸" : form.username}으로 입력하셨습니다.
    비밀번호는 ${form.password ==''? "빈칸" : form.password}으로 입력하셨습니다.
    
    `;
    return (
        <>
            {/* <h2 className="subtitle_join">
                <a>로그인</a>
            </h2> */}
            <Hotkey_lg />
            <div className="choice_tab">
                <h3 className="welcome">
                    로그인
                </h3>
                <p className="index_txt">
                    로그인하려면 별명과 비밀번호를 입렵해야합니다. <br/>
                    1번을 눌러 별명으로 이동할 수 있으며 2번을 눌러 비밀번호로 이동할 수 있습니다.
                </p>
            </div>
            <div className="step_two_form login_step">
                <label>
                    <h5> <strong style={{color:"red"}}>1</strong> 아이디 입력 </h5>
                    <input type="input" id = "id" className="input_form" value={form.username} onChange={e=> {setFrom({...form, username: e.target.value}); handleUsernameChange(e);}} placeholder="아이디를 입력해주세요" />
                    <p className="input_form_txt" style={{color: form.username_val ? 'green' : 'red'}}>특수문자 사용 불가, 두 글자 이상 </p>
                </label>  
                <label>
                    <h5> <strong style={{color:"red"}}>2</strong> 비밀번호 입력 </h5>
                    <input type="password" id="pw" className="input_form" value={form.password} onChange={e=> {setFrom({...form, password: e.target.value}); handleUserpwChange(e);}} placeholder="비밀번호를 입력해주세요" />
                    <p className="input_form_txt" style={{color: form.password_val ? 'green' : 'red'}}>4글자 이상으로 </p>
                </label> 
                <button className="next_step_btn" onClick={() => join_btn()}>로그인</button>
                {/* <link to="/home" className="next_step_btn">로그인</link> */}
            </div>
            <button className="next_step_btn" onClick={()=> {join_btn()}} disabled={!isAllFieldsValid}> 
                <strong style={{color:"red"}}>0</strong> 로그인
            </button>
            {/* setId() */}
            {starttts && <TextToSpeech value={ttslogin} />} 
        </>
    );
    
}

// export default Input;

export { Login }; 