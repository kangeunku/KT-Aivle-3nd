import React, { useState, useRef, useEffect, useCallback } from "react";
import Modal from "./modal.js"
import Modal_ from "./modal_.js"

import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import termsData1 from '../../assets/txt/terms.json'
import termsData2 from '../../assets/txt/terms2.json'
import { useCookies } from 'react-cookie';

import { TextToSpeech } from "../../components";


const Join = ({ changeislogn }) => {
    const [joinState, setjoinState] = useState(1);

    // tts 상태 지정
    const [starttts, setstarttts] = useState(false);
    const [termsone, settermsone] = useState(false);
    const [termstwo, settermstwo] = useState(false);

    const next_stage = (txt) => {
        if (txt === 'end') {
            console.log("end");
            setjoinState(2);
        }
        else {
            setjoinState(joinState + 1);
        }
    }

    // 오디오중지
    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    // 핫키 생성
    const Hotkey_local_1 = () => {
        // 핫키 설정
        const keyMap_1 = {
            enter_key: 'enter',
            jointts: 'shift+q',
            stoptts: 'shift+d',
            termsone: 'shift+1',
            termstwo: 'shift+2',
        };
        
        const nextClick = () => {
            console.log('enter');
            if (joinState == 1) next_stage();
            else if (joinState == 2) next_stage('end');
        };
        
        // tts 중단
        const stopttsClick = () => {
            if ((starttts == true) || (termsone == true) || (termstwo == true)){
                handleAudio();
            }
            setstarttts(false);
            settermsone(false);
            settermstwo(false);
        }
        // 약관 일번
        const termsoneClick = () => {
            settermsone(true);
            console.log('termsoneClick');
        };

        // 약관 이번
        const termstwoClick = () => {
            settermstwo(true);
            console.log('termstwoClick');
        };

        // 페이지 소계
        const jointtsClick = () => {
            setstarttts(true);
            console.log('jointts');
        };

        // 핫키 적용 함수
        const handlers_1 = {
            enter_key: nextClick,
            jointts: jointtsClick,
            termsone:termsoneClick,
            termstwo:termstwoClick,
            stoptts:stopttsClick,
        };


        return (
            <>
                <GlobalHotKeys keyMap={keyMap_1} handlers={handlers_1}></GlobalHotKeys>
            </>
        );
    };
    let ttstemone = ""
    let ttstemtwo = ""
    
    for (let i in termsData1){
        ttstemone += termsData1[i].index + termsData1[i].content
    }
    for (let i in termsData2){
        ttstemtwo += termsData2[i].index + termsData2[i].content
    }

    // 약관안내 문구
    const ttsjoinstepone =`회원가입 약관체크 페이지 입니다. 
    서비스 이용 약관을 들으시려면 스페이스버튼과 숫자 일 버튼을 동시에 눌러주세요.
    개인정보 관련 이용약관을 들으시려면 스페이스버튼과 숫자이 버튼을 동시에 눌러주세요.
    `;

    if (joinState == 1) {
        return (
            <>
                <Hotkey_local_1 />
                <Joinstepone />
                {starttts && <TextToSpeech value={ttsjoinstepone} />}
                {termsone && <TextToSpeech value={ttstemone} />}
                {termstwo && <TextToSpeech value={ttstemtwo} />}
                <button className="next_step_btn" onClick={() => next_stage()}>다음</button>
            </>
        );
    }
    else if (joinState === 2) {
        return (
            <>
                <Joinsteptwo changeislogn={changeislogn} />
                {/* <button className="next_step_btn" onClick={() => next_stage('end')}>다음</button> */}
            </>
        );
    }
    else {

    }

}

const Joinstepone = () => {
    const [ModalState, setModalState] = useState('false'); //모달창의 상태를 보관해 둘 useState입니다.
    const [Modal_State, setModal_State] = useState('false');
    
    function OnOffModal() { //모달창 상태를 변경하는 함수입니다.
        if (ModalState === true) {
            setModalState(false);
        } else {
            setModalState(true);
        }
    }

    function OnOffModal_() {
        if (Modal_State === true) {
            setModal_State(false);
        } else {
            setModal_State(true);
        }
    }
        // 핫키 생성
    const Hotkey_local_2 = () => {
        // 핫키 설정
        const keyMap_2 = {
            space1_key: '1',
            space2_key: "2",
            space3_key: "3"
        };

        const termClick = () => {
            console.log('space+1');
            OnOffModal();
        };

        const term2Click = () => {
            console.log('space+2');
            OnOffModal_();
        };

        const checkboxClick = () => {
            console.log('space + 3');
            document.getElementById('AllCheckBox').focus(); 
            //모두 동의로 포커스 이동 후 space로 check -> tab 눌러 다음 버튼으로 이동 -> enter
        };

        // 핫키 적용 함수
        const handlers_2 = {
            space1_key: termClick,
            space2_key: term2Click,
            space3_key: checkboxClick,
        };

        return (
            <>
                <GlobalHotKeys keyMap={keyMap_2} handlers={handlers_2}>
                </GlobalHotKeys>
            </>
        );
    };

    const dataLists = [ // 체크 박스에 사용할 데이터
        { id: 1, data: "1. 서비스 이용 약관 (필수)" },
        { id: 2, data: "2. 개인정보 수집 및 이용에 대한 동의 안내 (필수)" }
    ]

    const [checkedList, setCheckedLists] = useState([]); //체크박스들 상태 관리 위한 배열

    const onCheckedAll = useCallback( //전체 체크 클릭시 발생하는 함수
        (checked) => {
            if (checked) {
                const checkedListArray = [];

                dataLists.forEach((list) => checkedListArray.push(list.id));
                //dataLists의 모든 정보를 checkedList에 넣는다.

                setCheckedLists(checkedListArray);
            }
            else {
                setCheckedLists([]);//전체 클릭 해제 시 배열 비워 모두 해제시킴
            }

        }, [dataLists]
    );

    const onCheckedElement = useCallback(//개별 체크 클릭 시 발생하는 함수
        (checked, list) => {
            if (checked) { //클릭된 개별 체크박스의 list를 기존의 checkedList 배열에 추가
                setCheckedLists([...checkedList, list.id]);
            }
            else {//아닌 경우 filter 메소드 이용 걸러냄
                setCheckedLists(checkedList.filter((el) => el !== list.id));
            }
        }, [checkedList]
    );

    return (
        <>
            {/* <h2 className="subtitle_join">
                <a>회원가입</a>
            </h2> */}
            <Hotkey_local_2 />

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
                    {dataLists.map((list) => (
                        <div style={{ margin: 20 }}>
                            <label htmlFor={list.id}>{list.data}</label>
                            <input
                                id={list.id}
                                key={list.id}
                                type="checkbox"
                                className="check_terms"
                                onChange={(e) => onCheckedElement(e.target.checked, list)}
                                checked={checkedList.includes(list.id) ? true : false}
                            />
                            <button className="terms_show_btn" onClick={OnOffModal}>전문 보기</button>
                            {ModalState === true && (
                                <Modal
                                    title={list.id === 1 ? "서비스 이용약관" : "개인정보 수집 및 이용에 대한 동의 안내"}
                                    termsData={list.id === 1 ? termsData1 : termsData2}
                                    setModalState={setModalState}
                                />
                            )}
                        </div>

                    ))
                    }
                    {/* <input type="checkbox" className="check_terms" 
                        key={1}
                        onChange={(e)=>onCheckedElement(e.target.checked, dataLists.list)}
                        checked={checkedList.includes(dataLists.list)?true:false}
                    />
                    1. 서비스 이용 약관 (필수)
                    <button className="terms_show_btn" onClick={OnOffModal}>전문 보기</button>
                    {ModalState === true ? //모달 상태가 true면 1번, false면 2번이 작동합니다.
                    <Modal setModalState={setModalState}/> : ""} */}
                </li>
                {/* <li>
                    <input type="checkbox" className="check_terms" />
                    2. 개인정보 수집 및 이용에 대한 동의 안내 (필수)
                    <button className="terms_show_btn" onClick={OnOffModal}>전문 보기</button>
                    {ModalState === true ? //모달 상태가 true면 1번, false면 2번이 작동합니다.
                    <Modal setModalState={setModalState}/> : ""}
                </li> */}
                <li>
                    <input type="checkbox" className="check_terms" id="AllCheckBox"
                        onChange={(e) => onCheckedAll(e.target.checked)}
                        checked={
                            checkedList.length === 0
                                ? false
                                : checkedList.length === dataLists.length
                                    ? true
                                    : false
                        }
                    />
                    위 약관에 모두 동의합니다.
                </li>
            </ul>
        </>
    );
}

const Joinsteptwo = ({ changeislogn }) => {
    const [cookies, setCookie] = useCookies(['usercookie']);
    const navigate = useNavigate();
    const [starttts, setstarttts] = useState(false);

    const [form, setFrom] = useState({
        "username": "",
        "password": "",
        "password2": "",
        "nickname": "",
        username_val: false,
        password_val: false,
        password2_val: false,
        nickname_val: false,
    });
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const join_btn = async () => {
        try {
            const url = "http://127.0.0.1:8000/v1/register/"
            // console.log(form)
            const response = await axios.post(url, form, { withCredentials: true })
            const res = JSON.stringify(response.statusText);
            
            setCookie('usercookienickname', form.nickname, { path: '/' });
            setCookie('usercookieid', form.username, { path: '/' });

            setPopupMessage("환영합니다.");

            console.log(res);
            setPopupVisible(true);
            setTimeout(()=>{
                handlePopupClose();
            }, 2000);
            changeislogn(true);
            navigate('/home');
            
        } catch (error) {
            setPopupMessage("회원가입에 실패했습니다. 아이디와 비밀번호, 별명을 확인해 주세요.");
            setPopupVisible(true);
            setTimeout(()=>{
                handlePopupClose();
            }, 2000);
            console.log(error);
        };
    };

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
        const isValidNickname = nickname.match(/^[가-힣]*$/) && nickname.length >= 2;
        setFrom({ ...form, nickname, nickname_val: isValidNickname });
    };

    // 오디오중지
    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    const isAllFieldsValid = form.username_val && form.password_val && form.password2_val && form.nickname_val;
        
    // 핫키 생성
    const Hotkey_local_3 = () => {
        // 핫키 설정
        const keyMap_3 = {
            space1_key: 'space+1',
            space2_key: "ctrl+q",
            space3_key: 'space+3',
            space4_key: "space+4",
            jointts: 'shift+q',
            stoptts: 'shift+d',
            // enter_key: "alt+ctrl"
        };
        
        // const EnterClick = () => {
        //     const inputRef = useRef(null);
        //     console.log('enter');
        //     if (inputRef.current) {
        //         inputRef.current.blur();
        //     }
        // }
        const idinputClick = () => {
            console.log('idinputClick');
            document.getElementById('id').focus();
        };

        // document.activeElement.
        const pwinputClick = () => {
            console.log('space + 2');
            document.getElementById('pw1').focus();
        };
        const pwinputClick_ = () => {
            console.log('space + 3');
            document.getElementById('pw2').focus();
        };
        const nickClick = () => {
            console.log('space + 4');
            document.getElementById('nick').focus();
        }

        // 핫키 적용 함수
        const handlers_3 = {
            space1_key: idinputClick,
            space2_key: pwinputClick,
            space3_key: pwinputClick_,
            space4_key: nickClick,
            // enter_key: EnterClick
        };
        
        return (
            <>
                <GlobalHotKeys keyMap={keyMap_3} handlers={handlers_3}>
                </GlobalHotKeys>
            </>
        );
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };
    
    const ttsjoinform = `회원가입페이지 입니다. 탭키를 눌러 진입하여 입력하여주세요.
    아이디는 ${form.username ==''? "빈칸" : form.username}으로 입력하셨습니다.
    비밀번호는 ${form.password ==''? "빈칸" : form.password}으로 입력하셨습니다.
    비밀번호 확인은  ${form.password2 ==''? "빈칸" : form.password2}으로 입력하셨습니다.
    별명은  ${form.nickname ==''? "빈칸" : form.nickname}으로 입력하셨습니다.
    다시듣고 싶으시다면 쉬프트 버튼과 디버튼을 동시에 누른후
    쉬프트 버튼과 큐버튼을 동시에 눌러주세요.
    `;

    return (
        <>
        <Hotkey_local_3/>
            <div className="choice_tab">
                <h3 className="welcome">
                    개인정보 입력
                </h3>
                <p className="index_txt">사용할 아이디/비밀번호/별명을 입력해주세요.</p>
                <div className="step_two_form">
                    <label>
                        <h5> <strong style={{ color: "red" }}>1</strong> 아이디 입력</h5>
                        <input type="input" className="input_form" value={form.username} onChange={e => { setFrom({ ...form, username: e.target.value }); handleUsernameChange(e); }} placeholder="아이디를 입력해주세요" />
                        <p className="input_form_txt" style={{ color: form.username_val ? 'green' : 'red' }}>특수문자 사용 불가, 두 글자 이상 </p>
                    </label>
                    <label>
                        <h5> <strong style={{ color: "red" }}>2</strong> 비밀번호 입력 </h5>
                        <input type="password" className="input_form" value={form.password} onChange={e => { setFrom({ ...form, password: e.target.value }); handleUserpwChange(e); }} placeholder="비밀번호를 입력해주세요" />
                        <p className="input_form_txt" style={{ color: form.password_val ? 'green' : 'red' }}>4글자 이상으로 </p>
                    </label>
                    <label>
                        <h5> <strong style={{ color: "red" }}>3</strong> 비밀번호 확인 </h5>
                        <input type="password" className="input_form" value={form.password2} onChange={e => { setFrom({ ...form, password2: e.target.value }); handleUserpw2Change(e); }} placeholder="비밀번호를 다시한번 입력해주세요" />
                        <p className="input_form_txt" style={{ color: form.password2_val ? 'green' : 'red' }}>앞과 일치하게 입력해주세요 </p>
                    </label>
                    <label>
                        <h5> <strong style={{ color: "red" }}>4</strong> 별명 입력 </h5>
                        <input type="input" className="input_form" value={form.nickname} onChange={e => { setFrom({ ...form, nickname: e.target.value }); handleNicknameChange(e); }} placeholder="별명을 입력해주세요" />
                        <p className="input_form_txt" style={{ color: form.nickname_val ? 'green' : 'red' }}>한국어로만 입력해주세요 </p>
                    </label>
                </div>
            </div>
            <button className="next_step_btn" onClick={() => join_btn()}> 회원가입 </button>
            {popupVisible && (<Popup onClose={handlePopupClose} message={popupMessage} />)}
            {starttts && <TextToSpeech value={ttsjoinform} />}
        </>
    );
}

const Popup = ({ onClose, message }) => {
    return (
        <div className="popup1">
            <div className="popup1_txt">{message}</div>
            <div className="popup1_lgimg"></div>
        </div>
    );
};

// export default Input;

export { Join }; 