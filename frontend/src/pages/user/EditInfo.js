import React, { useState } from "react";
// import styles from "./EditInfo.module.css";
import styles from "../../styles/EditInfo.module.css";

const EditInfo = () => {
    const [currentPage, setCurrentPage] = useState('first');
    const goToSecondPage = async () => {
        setCurrentPage('second');
    };
    const goToThirdPage = async () => {
        setCurrentPage('third');
    };
    const goToFourthPage = async () => {
        setCurrentPage('fourth');
    };

    const goToFifthPage = async () => {
        setCurrentPage('fifth');
    };

    return (
        <div>
            {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} />}
            {currentPage === 'second' && <SecondPage goToThirdPage={goToThirdPage} />}
            {currentPage === 'third' && <ThirdPage goToFourthPage={goToFourthPage} />}
            {currentPage === 'fourth' && <FourthPage goToFifthPage={goToFifthPage} />}
            {currentPage === 'fifth' && <FifthPage />}
        </div>
    );
};



const FirstPage = ({goToSecondPage}) => {

    // 틀만들기
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
    });

    // return에서 인풋내용들을 사용할수있게 변수저장
    const {name, email} = inputs;

    // 변경사항 저장
    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputs({
            ...inputs,
            [name]: value
        });
    }
    
    return (
        <div>
            <div>
                <label>이름</label>
                <input type="text" name="name" value={name} onChange={onChange}/>
            </div>
            <div>
                <label>이메일</label>
                <input type="text" name="email" value={email} onChange={onChange}/>
            </div>
            <p>name : {name}</p>
            <p>email  : {email}</p>
            <button onClick={goToSecondPage} src={'../../assets/img/search_bg.png'} >다음</button>
        </div>
    )};

const SecondPage = ({goToThirdPage}) => {
    return(
        <div>
            <div className={styles.page2main}>
                <div className={styles.page2main1}>회원정보 수정</div>
                <div className={styles.page2main2}>원하시는 버튼을 클릭해주세요</div>
            </div>
            <div className={styles.page2box}>
                <div className={styles.page2box2}>왼쪽 박스</div>
                <div className={styles.page2box2}>가운데 박스</div>
                <div className={styles.page2box2}>오른쪽 박스</div>
            </div>
            <button onClick={goToThirdPage} src={'../../assets/img/search_bg.png'} >다음</button>
        </div>
    );
};

const ThirdPage = ({goToFourthPage}) => {
    return(
        <div>
            <div>
                <div>회원정보 수정</div>
                <div>원하시는 버튼을 클릭해주세요</div>
            </div>
            <div>별명변경</div>
            <button onClick={goToFourthPage} src={'../../assets/img/search_bg.png'} >다음</button>
        </div>
    );
};

const FourthPage = ({goToFifthPage}) => {
    return(
        <div>
            <div>비밀번호 변경</div>
        </div>
    );

};
const FifthPage = () => {
    return(
        <div>
            <div>별명변경</div>
            <div>비밀번호 변경</div>
            <div>회원 탈퇴</div>
        </div>
    );
};

// export default Input;

export { EditInfo };