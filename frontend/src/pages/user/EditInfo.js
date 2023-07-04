import React, { useState, useEffect } from "react";
import styles from "../../styles/EditInfo.module.css";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import { GlobalHotKeys } from "react-hotkeys";

const EditInfo = (props) => {
    const [currentPage, setCurrentPage] = useState('first');

    // 동일한 링크를 클릭시 처음화면으로 초기화
    useEffect(() => {
        props.relanding(false);
        setCurrentPage('first');
    }, [props.state]);

    const goToSecondPage = () => {
        setCurrentPage('second');
    };

    const goToThirdPage = () => {
        setCurrentPage('third');
    };

    const goToFourthPage = () => {
        setCurrentPage('fourth');
    };

    const goToFifthPage = () => {
        setCurrentPage('fifth');
    };

    return (
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} />}
        {currentPage === 'second' && (
            <SecondPage
                goToThirdPage={goToThirdPage}
                goToFourthPage={goToFourthPage}
                goToFifthPage={goToFifthPage}
            />
        )}
        {currentPage === 'third' && <ThirdPage goToSecondPage={goToSecondPage}/>}
        {currentPage === 'fourth' && <FourthPage goToSecondPage={goToSecondPage}/>}
        {currentPage === 'fifth' && <FifthPage  changeislogin={props.changeislogin}/>}
        </div>
    );
};

const Popup = ({ onClose, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            onClose();
        }, 2000);
    }, []);

    return (
        <div className={styles.popup1}>
            <div className={styles.popup1_txt}>{message}</div>
            <div className={styles.popup1_lgimg}></div>
        </div>
    );
};

const submitPassword = async (password) => {
    try {
        // 비밀번호를 백엔드로 전달하는 비동기 요청을 수행합니다.
        // 비밀번호 일치 여부에 따라 handleSuccess 또는 handleFailure 콜백 함수를 호출합니다.
        const url = "http://127.0.0.1:8000/v1/checkpassword/";
        const data = {
            "password": password,
        };

        const response = await axios.post(url, data, {withCredentials: true});
        // console.log(response.statusText);

        if (response.statusText === 'OK'){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

const FirstPage = ({goToSecondPage}) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [password, setPassword] = useState("");

    const handlePasswordSubmit = async() => {
        if (password) {
            try {
                const isPasswordCorrect = await submitPassword(password);
                console.log(isPasswordCorrect);
                if (isPasswordCorrect) {
                    goToSecondPage();
                } else {
                    setPopupMessage('비밀번호가 일치하지 않습니다.');
                    setPopupVisible(true);
                }
            } catch (error) {
                    console.error(error);
            }
        } else {
            setPopupMessage("비밀번호를 입력하세요");
            setPopupVisible(true);
            setTimeout(()=>{
                handlePopupClose();
            }, 1000);
        }
    };

    const handleButtonClick = (message) => {
        setPopupMessage(message);
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    const Hotkey_ed_1 = () => {
        // 핫키 설정
        const keyMap_ed_1 = {
            ctrl_shift_key: 'ctrl+shift'
        };

        const pwFocus = () => {
            console.log('ctrl + shift(ed_1)');
            document.getElementById("pw").focus();
        };

        // 핫키 적용 함수
        const handlers_ed_1 = {
            ctrl_shift_key: pwFocus,
        };

        return (
            <>
                <GlobalHotKeys keyMap={keyMap_ed_1} handlers={handlers_ed_1}>
                </GlobalHotKeys>
            </>
        );
    };

    return(
        <>
        <Hotkey_ed_1/>
        <div className={styles.editbody}>
            <div className={styles.editbox1}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.editbox11}>회원정보 수정</div>
            </div>
            <ol className={styles.editbox2}>
                <li>회원정보 수정을 위해 비밀번호를 입력해주세요</li>
            </ol>
            <div className={styles.edit_form1}>
                <div className={styles.edit_form1_txt}>비밀번호 입력</div>
                <div className={styles.edit_form1_box2}>
                    <input className={styles.edit_form1_input} id="pw" type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button className={styles.button_main} onClick={handlePasswordSubmit}>
                    <div>입력</div>
                </button>
            </div>
            {popupVisible && (
                <Popup onClose={handlePopupClose} message={popupMessage} />
            )}
        </div>
        </>
    );};

const SecondPage = ({goToThirdPage, goToFourthPage, goToFifthPage}) => {

    const Hotkey_ed_2 = () => {
        // 핫키 설정
        const keyMap_ed_2 = {
            space_1_key: '1',
            space_2_key: 'shift + 2',
            space_3_key: 'space + 3'
        };

        const toNickChange = () => {
            console.log('space + 1(ed_2)');
            goToThirdPage();
        };

        const topwChange = () => {
            console.log('space + 2(ed_2)');
            goToFourthPage();
        };

        const toOut = () => {
            console.log('space + 3(ed_2)');
            goToFifthPage();
        };
        // 핫키 적용 함수
        const handlers_ed_2 = {
            space_1_key: toNickChange,
            space_2_key: topwChange,
            space_3_key: toOut
        };

        return (
            <>
                <GlobalHotKeys keyMap={keyMap_ed_2} handlers={handlers_ed_2}>
                </GlobalHotKeys>
            </>
        );
    };

    return(
        <>
        <Hotkey_ed_2/>
        <div>
            <div className={styles.editbody}>
                <div className={styles.editbox1}>
                    <div className={styles.page2logo2} ></div>
                    <div className={styles.editbox11}>회원정보 수정</div>
                </div>
                <div className={styles.editbox2}>원하는 메뉴를 선택해주세요</div>
                <div className={styles.page2box}>
                    <div className={styles.page2box2} id="nickchange" onClick={goToThirdPage}>
                        <img className={styles.page2box2_img1} alt=""  />
                        <div className={styles.page2box2_txt1}>별명 변경</div>
                        <div className={styles.page2box2_txt2}>별명을 변경할 수 있습니다</div>
                    </div>
                    <div className={styles.page2box2} onClick={goToFourthPage}>
                        <img className={styles.page2box2_img2} alt=""  />
                        <div className={styles.page2box2_txt1}>비밀번호 변경</div>
                        <div className={styles.page2box2_txt2}>비밀번호를 변경할 수 있습니다</div>
                    </div>
                    <div className={styles.page2box2} onClick={goToFifthPage}>
                        <img className={styles.page2box2_img3} alt="" />
                        <div className={styles.page2box2_txt1}>회원 탈퇴</div>
                        <div className={styles.page2box2_txt2}>더 이상 서비스를 이용하고 싶지 않습니다</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

const ThirdPage = ({goToSecondPage}) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [nicknameval, setNicknameval] = useState("");
    const [chgPage, setChgPage] = useState(false);

    const handleButtonClick = async (message) => {
        if (nicknameval) {
            try {
                const url = "http://127.0.0.1:8000/v1/setnickname/";
                const data = {
                    'nickname': '"' + nicknameval + '"',
                };
                const response = await axios.post(url, data, {withCredentials: true});
                // console.log(response.statusText);
    
                if (response.statusText === 'OK'){
                    setChgPage(true);
                    setPopupMessage(message);
                    setPopupVisible(true);
                    
                } else {
                    setPopupVisible(false);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPopupMessage("별명을 입력하세요");
            setPopupVisible(true);
            setChgPage(false);
            setTimeout(()=>{
                handlePopupClose();
            }, 1000);
        }
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
        if (chgPage){
            goToSecondPage();
        }
    };

    //닉네임 enteredNickname은 입력된 닉네임으로한다
    const handleNicknameChange = (event) => {
        const enteredNickname = event.target.value;
        setNicknameval(enteredNickname);
    };
    
    // 닉네임 유효성 검사. 지금은 4글자 이상으로 해뒀고 회의후 바꾸기
    const isNicknameValid = nicknameval.match(/^[가-힣]*$/) && nicknameval.length >= 2;

    const Hotkey_ed_3 = () => {
        // 핫키 설정
        const keyMap_ed_3 = {
            ctrl_shift_key: 'ctrl+shift'
        };

        const pwFocus = () => {
            console.log('ctrl + shift(ed_3)');
            document.getElementById("newNick").focus();
        };

        // 핫키 적용 함수
        const handlers_ed_3 = {
            ctrl_shift_key: pwFocus,
        };

        return (
            <>
                <GlobalHotKeys keyMap={keyMap_ed_3} handlers={handlers_ed_3}>
                </GlobalHotKeys>
            </>
        );
    };

    return(
        <>
        <Hotkey_ed_3/>
        <div>
            <div className={styles.editbody}>
                <div className={styles.editbox1}>
                    <div className={styles.page2logo2} ></div>
                    {/* 위에 디자인 까맣게할거면 editbox11 ->editbox12로고치기 */}
                    <div className={styles.editbox11}>별명 변경</div>
                </div>
                <ol className={styles.editbox3}>
                    <li>서비스 이용시 사용할 새로운 별명을 입력해주세요.</li>
                    <li>별명에는 한국어만 사용이 가능합니다.</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>새로운 별명 입력</div>
                    <div className={styles.edit_form1_box2} style={{ display: 'flex' }}>
                        <input
                            className={styles.edit_form1_input}
                            id="newNick"
                            type="text"
                            value={nicknameval}
                            onChange={handleNicknameChange}
                            placeholder="새로운 별명을 입력해 주세요"
                        />
                        <button className={styles.button_main} onClick={() => handleButtonClick(`별명이 ${nicknameval}로 변경되었습니다`)}
                        disabled={!isNicknameValid}>
                            <div>변경한다</div>
                        </button>
                    </div>
                    <div>
                        {popupVisible && (
                        <Popup onClose={handlePopupClose} message={popupMessage} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

const FourthPage = ({goToSecondPage, changeislogin}) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [chgPage, setChgPage] = useState(false);

    //비밀번호 유효성검사, 비밀번호 1과 2의 값이 같은지 확인할것
    const [password1val, setPassword1val] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    
    const handleButtonClick = async (message) => {
        if(isPasswordValid2 && password1 & password2) {
            try {
                const url = "http://127.0.0.1:8000/v1/setpassword/";
                const data = {
                    "new_password": password1,
                };
    
                const response = await axios.post(url, data, {withCredentials: true});
                // console.log(response.statusText);
    
                if (response.statusText === 'OK'){
                    setPopupMessage(message);
                    setPopupVisible(true);
                    setChgPage(true);
                } else {
                    setPopupVisible(false);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPopupMessage("비밀번호를 정확하게 입력하세요");
            setPopupVisible(true);
            setChgPage(false);
            setTimeout(()=>{
                handlePopupClose();
            }, 1000);
        }
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
        if (chgPage){
            goToSecondPage();
        }
    };

    const [isBVisible, setIsBVisible] = useState(false);

    const handleButtonClick2 = () => {
        setIsBVisible(true);
    }

    // pw 유효성 검사. pw1과 pw2가 같은지 검사하지만 보안 문제에 걸릴 수도있어서 상의하기
    const isPasswordValid1 = /^[a-zA-Z0-9]{4,}$/.test(password1);

    const isPasswordValid2 = password1===password2;

    const Hotkey_ed_4 = () => {
        // 핫키 설정
        const keyMap_ed_4 = {
            ctrl_shift_key: 'ctrl+shift',
            space1_key: 'space+1'
        };

        const pwFocus = () => {
            console.log('ctrl + shift(ed_4)');
            document.getElementById("newPw").focus();
        };

        const pwFocus_2 = () => {
            console.log('space+1');
            document.getElementById("newPwCheck").focus();
        }

        // 핫키 적용 함수
        const handlers_ed_4 = {
            ctrl_shift_key: pwFocus,
            space1_key:pwFocus_2
        };

        return (
            <>
                <GlobalHotKeys keyMap={keyMap_ed_4} handlers={handlers_ed_4}>
                </GlobalHotKeys>
            </>
        );
    };

    return(
        <>
        <Hotkey_ed_4/>
        <div>
            <div className={styles.editbody}>
                <div className={styles.editbox1}>
                    <div className={styles.page2logo2} ></div>
                    <div className={styles.editbox11}> 비밀번호 변경</div>
                </div>
                <ol className={styles.editbox3}>
                    <li>사용할 새로운 비밀번호를 입력해주세요.</li>
                    <li>이전 비밀번호와는 달라야합니다.</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>새로운 비밀번호 입력</div>
                    <div className={styles.edit_form1_box2} style={{display:"flex"}}>
                        <input
                            className={styles.edit_form1_input}
                            id="newPw"
                            type="password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>
                    <div>
                        <button className={styles.button_main} onClick= {handleButtonClick2} disabled={!password1}>입력</button>
                    </div>
                </div>

                {isBVisible && (
                    <div className={styles.edit_form1} style={{ marginTop: "50px" }}>
                        <div className={styles.edit_form1_txt}>새로운 비밀번호 입력 (확인)</div>
                        <div className={styles.edit_form1_box2} style={{display:"flex"}}>
                        <input
                            className={styles.edit_form1_input}
                            id="newPwCheck"
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="다시한번 비밀번호를 입력해주세요"
                        />
                    </div>
                        <div>
                            <button className={styles.button_main} onClick={() => handleButtonClick("비밀번호가 변경되었습니다")}>
                                <div>변경한다</div>
                            </button>
                            {popupVisible && (
                            <Popup onClose={handlePopupClose} message={popupMessage} />
                            )}
                        </div>
                    </div>
                )}
                </div>
        </div>
        </>
    );
};

const FifthPage = ({changeislogin}) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [password, setPassword] = useState("");
    
    const [chgPage, setChgPage] = useState(false);

    const navigate = useNavigate();

    const handleButtonClick = async (message) => {
        if (password) {
            try {
                const url = "http://127.0.0.1:8000/v1/deleteuser/";
                const data = {
                    'password': password,
                };
    
                const response = await axios.post(url, data, {withCredentials: true});
                // console.log(response.statusText);
    
                if (response.statusText === 'OK') {
                    setPopupMessage(message);
                    setPopupVisible(true);
                    setChgPage(true);
                    
                } else {
                    setPopupVisible(false);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPopupMessage("비밀번호를 입력하세요");
            setPopupVisible(true);
            setChgPage(false);
            setTimeout(()=>{
                handlePopupClose();
            }, 1000);
        }
        
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
        if (chgPage){
            navigate('/home'); 
            changeislogin(false);
        }
    };

    const Hotkey_ed_5 = () => {
        // 핫키 설정
        const keyMap_ed_5 = {
            ctrl_shift_key: 'ctrl+shift',
        };

        const pwFocus = () => {
            console.log('ctrl + shift(ed_5)');
            document.getElementById("toOut").focus();
        };

        // 핫키 적용 함수
        const handlers_ed_5 = {
            ctrl_shift_key: pwFocus,
        };

        return (
            <>
                <GlobalHotKeys keyMap={keyMap_ed_5} handlers={handlers_ed_5}>
                </GlobalHotKeys>
            </>
        );
    };
    return(
        <>
        <Hotkey_ed_5/>
        <div>
            <div className={styles.editbody}>
                <div className={styles.editbox1}>
                    <div className={styles.page2logo2} ></div>
                    <div className={styles.editbox11}>회원 탈퇴</div>
                </div>
                <ol className={styles.editbox3}>
                    <li>탈퇴 시 별명을 포함한 모든 회원 정보가 삭제됩니다.</li>
                    <li>작성했던 1 : 1 문의도 삭제되며 복구할 수 없습니다.</li>
                    <li>회원탈퇴를 원한다면 비밀번호를 입력해주세요</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>비밀번호 입력</div>
                    <div className={styles.edit_form1_box2} style={{ display: 'flex' }}>
                        <input
                            className={styles.edit_form1_input}
                            id="toOut"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className={styles.button_main} onClick={() => handleButtonClick("회원탈퇴가 완료되었습니다.\n그동안 이용해주셔서 감사합니다.")}>
                            <div>탈퇴한다,</div>
                        </button>
                        {popupVisible && (
                        <Popup onClose={handlePopupClose} message={popupMessage} />
                        )}
                    </div>
                </div>
            </div>

        </div>
        </>
    );
};

// export default Input;

export { EditInfo };