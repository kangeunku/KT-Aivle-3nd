import React, { useEffect, useState} from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../common/csrftoken';

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

  useEffect(() => {
    setnameState(getCookie("usercookienickname"))
  }, []);

    return (
      <>
        <header className="header">
          <div className="head_btn_box">
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn" onClick={()=>{logout()}}></button>
          </div>
          <p className="welcome_txt">{nameState}님 환영합니다</p>
        </header>  
        {/* <div className="head_box"></div> */}
      </>
    );
  }

export {Header}