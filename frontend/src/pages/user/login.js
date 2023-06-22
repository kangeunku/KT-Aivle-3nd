import React, { useState } from "react";
import { Modal } from "../../components";

const Login = () => {
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
                    <input type="input" className="input_form" />
                </label>  
                <label>
                    비밀번호 확인
                    <input type="password" className="input_form" />
                </label> 
            </div>
            <button className="next_step_btn">로그인</button>
            <Modal />
        </>
    );
}

// export default Input;

export { Login }; 