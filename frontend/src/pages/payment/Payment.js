import React, { useState } from "react";
import axios from 'axios';


// 장고 전송 함수, state  
const Send_api = (state, data) => {
    const url = "http://127.0.0.1:8000/"

    const state_dir = {
        0 : "main/search1/", // 카테고리 검색
        1 : "main/search2/", // 상품 검색
        2 : "goods/test/", // 상품 조회
        3 : "register/", // 회원가입
        4 : "login/",  // 로그인
    }
    console.log(url + state_dir[state])
    const url_fix = url + state_dir[state]
    
    axios.post(url_fix, data)
    .then(function (response) {
        console.log(response);
        console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
    });
}


const Test = () => {
    // const [num, setNumber] = useState(0);
    const data = {
        "username": "hijoo",
        "password": "12345",
        "password2": "12345",
        "nickname": "hijoo"
    }

    return (
        <>
            <div className="container_about">
                <div className="item">
                    <div className="quote">
                        <p>웹 디자인 및 프론트엔드</p>
                        <span className="name">이수지</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>ai, github 관리, 백엔드</p>
                        <span className="name">강호준</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>ai, 백엔드</p>
                        <span className="name">강은구</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>웹 디자인 및 프론트엔드</p>
                        <span className="name">모광윤</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>ai, 백엔드</p>
                        <span className="name">김원진</span>
                    </div>
                </div>
                <div className="item">
                    <div className="quote">
                        <p>프론트엔드, 백엔드</p>
                        <span className="name">주은호</span>
                    </div>
                </div>
            </div>
            <div className="second_section">
                <div class="container">
                    <div class="card card0">
                        <div class="border">
                        <h2>김광호</h2>
                        <div class="icons">
                           팀장 <br/>
                           백엔드<br/>
                           프론트엔드
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Test };
