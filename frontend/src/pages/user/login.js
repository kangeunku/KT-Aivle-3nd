import React, { useState } from "react";
import { Modal } from "../../components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {  Home } from "../../pages";
import {  Header } from "../../components";

import axios from "axios";

const Login = () => {
    const[form, setFrom] = useState({
        "username": "",
        "password": "",
    });

    const navigate = useNavigate();

    const join_btn = async () => {
        const url = "http://127.0.0.1:8000/v1/login/"

        await axios.post(url, form)
        .then(function (response) {
            // setResult(JSON.stringify(response.data))
            // setResult(response.data);
            console.log(JSON.stringify(response.statusText));
            const res = JSON.stringify(response.statusText);

            // if(res === '"OK"'){
            //     navigate();
            // }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    };

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
                    1. 회원등록 할 때 사용한 별명을 입력해주세요. <br/>
                    2. 로그인할 때 필요한 비밀번호를 입력해주세요.
                </p>
            </div>
            <div className="step_two_form login_step">
                <label>
                    별명 입력
                    <input type="input" className="input_form" value={form.username} onChange={e=> setFrom({...form, username: e.target.value})}/>
                </label>  
                <label>
                    비밀번호 확인
                    <input type="password" className="input_form" value={form.password} onChange={e=> setFrom({...form, password: e.target.value})}/>
                </label> 
                <button className="next_step_btn" onClick={() => join_btn()}>로그인</button>
                {/* <link to="/home" className="next_step_btn">로그인</link> */}
            </div>
            
            setId()
            <Modal />
        </>
    );
    
}

// export default Input;

export { Login }; 