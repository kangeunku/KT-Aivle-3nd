import React, { useState, useRef } from "react";
import { Send_api } from "../../components";

const Join = () => {
    const [joinState, setjoinState] = useState(1);

    const next_stage = (txt) => {
        if (txt === 'end'){
            console.log("end")
        }
        else{
            setjoinState(joinState + 1);
        }
    }

    if ( joinState === 1 ){
        return (
            <>
                <Joinstepone />
                <button className="next_step_btn" onClick={()=> next_stage()}>다음</button>
            </>
        );
    }
    else if( joinState === 2 ){
        return (
            <>
                <Joinsteptwo />
            </>
        );
    }
    else{

    }

}

const Joinstepone = () => {

    return (
        <>
            {/* <h2 className="subtitle_join">
                <a>회원가입</a>
            </h2> */}
            <div className="choice_tab">
                <h3 className="welcome">
                    회원가입 - 이용 약관 동의
                </h3>
                <p className="index_txt">
                    회원가입은 이용약관 동의 개인정보 입력의 순으로 진행됩니다.<br />
                    오소리는 양질의 서비스를 제공하기 위하여 사용자의 별명, 찜 목록 등의 정보를 수집 및 이용합니다.<br />
                    1번과 2번을 눌러 각각의 약관을 읽고 동의할 수 있으며 모두 동의하려면 0번을 눌러주세요.
                </p>
            </div>
            <ul className="terms_list">
                <li>
                    <input type="checkbox" className="check_terms" />
                    <strong style={{color:"red"}}>1</strong> 서비스 이용 약관 (필수)
                    <button className="terms_show_btn">전문 보기</button>
                </li>
                <li>
                    <input type="checkbox" className="check_terms" />
                    <strong style={{color:"red"}}>2</strong> 개인정보 수집 및 이용에 대한 동의 안내 (필수)
                    <button className="terms_show_btn">전문 보기</button>
                </li>
                <li>
                    <input type="checkbox" className="check_terms" />
                    <strong style={{color:"red"}}>0</strong> 위 약관에 모두 동의합니다.
                </li>
            </ul>
        </>
    );
}

const Joinsteptwo = () => {
    const[form, setFrom] = useState({
        "username": "",
        "password": "",
        "password2": "",
        "nickname": "",
        username_val : false,
        password_val : false,
        password2_val : false,
        nickname_val : false,
    });

    const join_btn = () => {
        let response_data = Send_api(3,form)
        console.log('입력성공')
    }

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

    const handleUserpw2Change = (e) => {
        const password2 = e.target.value;
        const isValidUserpw2 = form.password === password2
        setFrom({ ...form, password2, password2_val: isValidUserpw2 });
    };
    
    const handleNicknameChange = (e) => {
        const nickname = e.target.value;
        const isValidNickname = nickname.match(/^[a-zA-Z0-9가-힣]*$/) && nickname.length >= 1;
        setFrom({ ...form, nickname, nickname_val: isValidNickname });
    };

    const isAllFieldsValid = form.username_val && form.password_val && form.password2_val && form.nickname_val;

    return (
        <>
           <div className="choice_tab">
                <h3 className="welcome">
                    개인정보 입력
                </h3>
                <p className="index_txt">사용할 아이디/비밀번호/별명을 입력해주세요.</p>
                <div className="step_two_form">
                    <label>
                        <h5> <strong style={{color:"red"}}>1</strong> 아이디 입력</h5>
                        <input type="input" className="input_form" value={form.username} onChange={e=> {setFrom({...form, username: e.target.value}); handleUsernameChange(e);}} placeholder="아이디를 입력해주세요"/>
                        <p className="input_form_txt" style={{color: form.username_val ? 'green' : 'red'}}>특수문자 사용 불가, 두 글자 이상 </p>
                    </label> 
                    <label>
                        <h5> <strong style={{color:"red"}}>2</strong> 비밀번호 입력 </h5>
                        <input type="password" className="input_form" value={form.password} onChange={e=> {setFrom({...form, password: e.target.value}); handleUserpwChange(e);}} placeholder="비밀번호를 입력해주세요"/>
                        <p className="input_form_txt" style={{color: form.password_val ? 'green' : 'red'}}>4글자 이상으로 </p>
                    </label> 
                    <label>
                        <h5> <strong style={{color:"red"}}>3</strong> 비밀번호 확인 </h5>
                        <input type="password" className="input_form" value={form.password2} onChange={e=> {setFrom({...form, password2: e.target.value}); handleUserpw2Change(e);}} placeholder="비밀번호를 다시한번 입력해주세요"/>
                        <p className="input_form_txt" style={{color: form.password2_val ? 'green' : 'red'}}>앞과 일치하게 입력해주세요 </p>                    
                    </label> 
                    <label>
                        <h5> <strong style={{color:"red"}}>4</strong> 별명 입력 </h5>
                        <input type="input" className="input_form" value={form.nickname}  onChange={e=> {setFrom({...form, nickname: e.target.value}); handleNicknameChange(e);}} placeholder="별명을 입력해주세요"/>
                        <p className="input_form_txt" style={{color: form.nickname_val ? 'green' : 'red'}}>특수문자는 넣을 수 없습니다 </p>
                    </label>  
                </div>
            </div>
            <button className="next_step_btn" onClick={()=> join_btn()} disabled={!isAllFieldsValid}> <strong style={{color:"red"}}>0</strong> 회원가입 </button>
        </>
    );
}


// export default Input;

export { Join }; 