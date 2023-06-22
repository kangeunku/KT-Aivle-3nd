import React, { useState, useRef } from "react";

const Join = () => {
    const [joinState, setjoinState] = useState(1);

    const next_stage = (txt) => {
        if (txt == 'end'){
            console.log("end")
        }
        else{
            console.log("11111")
            setjoinState(joinState + 1);
        }
    }

    if ( joinState == 1 ){
        return (
            <>
                <Joinstepone />
                <button className="next_step_btn" onClick={()=> next_stage()}>다음</button>
            </>
        );
    }
    else if( joinState == 2 ){
        return (
            <>
                <Joinsteptwo />
                <button className="next_step_btn" onClick={()=> next_stage('end')}>다음</button>
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
                    이용 약관 동의
                </h3>
                <p className="index_txt">오소리는 건전한 서비스를 위하여 사용자의 별명, 찜 목록 등의 정보를 수집 및 이용합니다.<br />
1번 2번 3번을 눌러 각각의 약관에 동의 할 수 있으며 모두 동의하려면 0번을 눌러주세요.
                </p>
            </div>
            <ul className="terms_list">
                <li>
                    <input type="checkbox" className="check_terms" />
                    1. 서비스 이용 약관 (필수)
                    <button className="terms_show_btn">전문 보기</button>
                </li>
                <li>
                    <input type="checkbox" className="check_terms" />
                    2. 개인정보 수집 및 이용에 대한 동의 안내 (필수)
                    <button className="terms_show_btn">전문 보기</button>
                </li>
                <li>
                    <input type="checkbox" className="check_terms" />
                    위 약관에 모두 동의합니다.
                </li>
            </ul>
        </>
    );
}

const Joinsteptwo = () => {
    return (
        <>
            {/* <h2 className="subtitle_join">
                <a>회원가입</a>
            </h2> */}
            <div className="choice_tab">
                <h3 className="welcome">
                    개인정보 입력
                </h3>
                <p className="index_txt">사용할 아이디/비밀번호/별명을 입력해주세요.</p>
                <div className="step_two_form">
                    <label>
                        아이디 입력(1)
                        <input type="input" className="input_form" />
                    </label> 
                    <label>
                        비밀번호 입력(2)
                        <input type="password" className="input_form" />
                    </label> 
                    <label>
                        비밀번호 확인(3)
                        <input type="password" className="input_form" />
                    </label> 
                    <label>
                        별명 입력(4)
                        <input type="input" className="input_form" />
                    </label>  
                </div>
            </div>
            
        </>
    );
}


// export default Input;

export { Join }; 