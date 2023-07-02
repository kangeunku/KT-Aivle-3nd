import React, { useState } from "react";
import { Modal } from "../../components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {  Home } from "../../pages";
import {  Header } from "../../components";

import axios from "axios";

const Login = ({ changeislogn }) => {
    const[form, setFrom] = useState({
        "username": "",
        "password": "",
        username_val : false,
        password_val : false,
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
            
            // 로그인 처리및 홈이동
            changeislogn(true)
            navigate('/home')
            // if(res === '"OK"'){
            //     navigate();
            // }
            
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

    const isAllFieldsValid = form.username_val && form.password_val;

    return (
        <>
            {/* <h2 className="subtitle_join">
                <a>로그인</a>
            </h2> */}
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
                    <input type="input" className="input_form" value={form.username} onChange={e=> {setFrom({...form, username: e.target.value}); handleUsernameChange(e);}} placeholder="아이디를 입력해주세요" />
                    <p className="input_form_txt" style={{color: form.username_val ? 'green' : 'red'}}>특수문자 사용 불가, 두 글자 이상 </p>
                </label>  
                <label>
                    <h5> <strong style={{color:"red"}}>2</strong> 비밀번호 입력 </h5>
                    <input type="password" className="input_form" value={form.password} onChange={e=> {setFrom({...form, password: e.target.value}); handleUserpwChange(e);}} placeholder="비밀번호를 입력해주세요" />
                    <p className="input_form_txt" style={{color: form.password_val ? 'green' : 'red'}}>4글자 이상으로 </p>
                </label> 
                <button className="next_step_btn" onClick={() => join_btn()}>로그인</button>
                {/* <link to="/home" className="next_step_btn">로그인</link> */}
            </div>
            <button className="next_step_btn" onClick={()=> {join_btn()}} disabled={!isAllFieldsValid}> <strong style={{color:"red"}}>0</strong> 모달</button>
            {/* setId() */}
            
        </>
    );
    
}

// export default Input;

export { Login }; 