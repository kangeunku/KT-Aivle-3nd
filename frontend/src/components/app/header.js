import React, { useEffect, useState} from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../common/csrftoken';
import { GlobalHotKeys } from "react-hotkeys";

const Header = ({ changeislogn }) => {
  const [nameState, setnameState] = useState("사용자");
  const [cookies, setCookie, removeCookie] = useCookies(['usercookie']);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('usercookienickname', { path: '/' });
    removeCookie('usercookieid', { path: '/' });
    removeCookie('sessionid', { path: '/' });
    removeCookie('csrftoken', { path: '/' });
    setnameState("사용자")
    navigate('/home');
    // changeislogn(false)
    window.location.reload();
  }
  const Hotkey_head = () => {
    // 핫키 설정
    const keyMap_head = {
        spaceEsc_key: 'ctrl+space'
    };
    const logoutClick = () => {
        console.log('ctrl+esc');
        logout();
        // document.getElementById("logout").focus();
      };
    // 핫키 적용 함수
    const handlers_head = {
        spaceEsc_key: logoutClick,
    };
    return (
        <>
            <GlobalHotKeys keyMap={keyMap_head} handlers={handlers_head}></GlobalHotKeys>
        </>
    );
  };
  useEffect(() => {
    setnameState(getCookie("usercookieid"))
  }, []);

    return (
      <>
        <Hotkey_head/>
        <header className="header">
          <div className="head_btn_box">
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn" id="logout" onClick={()=>{logout()}}></button>
          </div>
          <p className="welcome_txt">{nameState}님 환영합니다</p>
        </header>  
        {/* <div className="head_box"></div> */}
      </>
    );
  }

export {Header}