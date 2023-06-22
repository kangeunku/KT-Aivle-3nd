import React, { useState } from "react";
import { Join } from "./join";
import { Login } from "./login";

const Choicelogin = () => {
    const [navState, setnavState] = useState("choicelogin");

    if(navState == 'choicelogin'){
        return (
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
        );
    }
    else if(navState == 'join'){
        return(
            <div className="index_content">
                <Join />
            </div>
        )

    }
    else if(navState == 'login'){
        return(
            <div className="index_content">
                <Login />
            </div>
        )
    }
}

export { Choicelogin }; 