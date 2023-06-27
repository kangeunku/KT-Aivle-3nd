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
        <div>
            <button className="test_btn" onClick={() => {Send_api(3, data)}}> + 1 </button>
            <div> test</div>
        </div>
    )
}

export { Test };
