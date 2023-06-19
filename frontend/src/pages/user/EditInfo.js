import React, { useState } from "react";

const EditInfo = () => {
    const [suportState, setsuportState] = useState("Support");

    if(suportState == 'Support'){
        return (
            <div className="index_content">
                <div className="choice_tab">
                    <h2 className="welcome">
                        고객센터
                    </h2>
                    <p className="index_txt">로그인 혹은 회원가입을 선택해주세요<br/>
                        <b>1번</b>을 누르면 <b>회원가입</b>으로, 
                        <b>2번</b>을 누르면 <b>로그인</b>으로 이동합니다.
                    </p>
                </div>
                <div className="choice_container">
                    <a className="choice_box" onClick={() => setsuportState("nickname")}>
                        <p className="choice_a_txt">
                            <strong>별명 변경</strong>
                            처음 오소리를 이용하신다면 회원가입을 통해 다양한 서비스를 이용해보세요
                        </p>
                    </a>
                    <a className="choice_box" onClick={() => setsuportState("password")} >
                        <p className="choice_a_txt">
                            <strong>비밀번호 변경</strong>
                            한번 오소리를 이용해보았다면 로그인 후 서비스를 이용해보세요!
                        </p>
                    </a>
                    <a className="choice_box" onClick={() => setsuportState("out")} >
                        <p className="choice_a_txt">
                            <strong>회원 탈퇴</strong>
                            한번 오소리를 이용해보았다면 로그인 후 서비스를 이용해보세요!
                        </p>
                    </a>
                </div>
            </div>
        );
    }
    else if(suportState == 'password'){
        return(
            <div className="index_content">
                password
            </div>
        )

    }
    else if(suportState == 'out'){
        return(
            <>
                ut
            </>
        )
    }
    else if(suportState == 'nickname'){
        return(
            <>
                nickname
            </>
        )
    }
}

 

export { EditInfo };