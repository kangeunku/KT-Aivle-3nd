import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send_api } from "../../components";
import Modal from "./modal.js"
// import {Hotkey_start} from "../../components/common/common.js"
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';
// import {local_Hotkey} from './join';

const Join = () => {
    const [joinState, setjoinState] = useState(1);

    const next_stage = (txt) => {
        if (txt == 'end') {
            console.log("end")
        }
        else{
            setjoinState(joinState + 1);
        }
    }

        // 핫키 생성
        const Hotkey_local_1 = () => {
            // 핫키 설정
            const keyMap_1 = {
                enter_key: 'enter'
            };
    
            const nextClick = () => {
                console.log('enter');
                if(joinState == 1) next_stage();
                else if(joinState == 2) next_stage('end');
            };
           
    
            // 핫키 적용 함수
            const handlers_1 = {
                enter_key: nextClick,
            };
            
            return (
                <>
                    <GlobalHotKeys keyMap={keyMap_1} handlers={handlers_1}>
                    </GlobalHotKeys>
                </>
            );
        };

    if (joinState == 1) {
        return (
            <>
                <Hotkey_local_1 />
                <Joinstepone />
                <button className="next_step_btn" onClick={() => next_stage()}>다음</button>
            </>
        );
    }
    else if (joinState == 2) {
        return (
            <>
                <Joinsteptwo />
                <button className="next_step_btn" onClick={() => next_stage('end')}>다음</button>
            </>
        );
    }
    else {

    }

}




const Joinstepone = () => {
    const [ModalState, setModalState] = useState('false'); //모달창의 상태를 보관해 둘 useState입니다.

    function OnOffModal() { //모달창 상태를 변경하는 함수입니다.
        if (ModalState === true) {
            setModalState(false);
        } else {
            setModalState(true);
        }
    }
        // 핫키 생성
    const Hotkey_local_2 = () => {
        // 핫키 설정
        const keyMap_2 = {
            space1_key: 'space+1',
            spacebar_key: "space+w",
            // keypress, keydown, keyup.
            space_down: { sequence: "space", action: "keydown" }
        };

        const termClick = () => {
            console.log('space+1');
            OnOffModal();
        };
        const spaceClick = () => {
            console.log('space + w');
        };
        const spacedownClick = () => {
            console.log('space down');
        };

        // 핫키 적용 함수
        const handlers_2 = {
            space1_key: termClick,
            spacebar_key: spaceClick,
            space_down: spacedownClick,
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
            <Hotkey_local_2/>
            

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
                {dataLists.map((list) => (
                    
                    <div style={{
                        margin:20
                    }}>
                        <label for={list.id}>{list.data}</label>
                        <input
                            id={list.id}
                            key={list.id}
                            type="checkbox"
                            className="check_terms"
                            onChange={(e) => onCheckedElement(e.target.checked, list)}
                            checked={checkedList.includes(list.id) ? true : false}
                        />
                        <button className="terms_show_btn" onClick={OnOffModal}>전문 보기</button>
                        {ModalState === true ? //모달 상태가 true면 1번, false면 2번이 작동합니다.
                        <Modal setModalState={setModalState}/> : ""}
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
                <input type="checkbox" className="check_terms"
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

const Joinsteptwo = () => {
    const[form, setFrom] = useState({
        "username": "",
        "password": "",
        "password2": "",
        "nickname": ""
    });

    const join_btn = () => {
        let response_data = Send_api(3,form)
    }

    return (
        <>
           <div className="choice_tab">
                <h3 className="welcome">
                    개인정보 입력
                </h3>
                <p className="index_txt">사용할 아이디/비밀번호/별명을 입력해주세요.</p>
                <div className="step_two_form">
                    <label>
                        아이디 입력(1)
                        <input type="input" className="input_form" value={form.username} onChange={e=> setFrom({...form, username: e.target.value})}/>
                    </label> 
                    <label>
                        비밀번호 입력(2)
                        <input type="password" className="input_form" value={form.password} onChange={e=> setFrom({...form, password: e.target.value})}  />
                    </label> 
                    <label>
                        비밀번호 확인(3)
                        <input type="password" className="input_form" value={form.password2} onChange={e=> setFrom({...form, password2: e.target.value})} />
                    </label> 
                    <label>
                        별명 입력(4)
                        <input type="input" className="input_form" value={form.nickname}  onChange={e=> setFrom({...form, nickname: e.target.value})}/>
                    </label>  
                </div>
            </div>
            <button className="next_step_btn" onClick={()=> join_btn()}>회원가입</button>
            
        </>
    );
}


// export default Input;

export { Join }; 