import React, { useState } from "react";
import { Modal } from "../../components";
import { Send_api } from "../../components";

const Login = () => {
    const[form, setFrom] = useState({
        "username": "",
        "password": "",
    });

    const join_btn = () => {
        let response_data = Send_api(4, form);
    }

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
            </div>
            <button className="next_step_btn" onClick={()=> join_btn()}>로그인</button>
            setId()
            <Modal />
        </>
    );
}

// export default Input;

export { Login }; 