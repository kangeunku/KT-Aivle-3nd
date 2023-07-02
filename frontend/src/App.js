import React, { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { Home, Basket, EditInfo, Support, Choicelogin, Test } from "./pages";
import { Header } from "./components";
import { Logoslide } from "./components/app/logoslide"


import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';


const App = () => {
  const [islogin, setloginState] = useState(false);
  const [navState, setnavState] = useState("home");

  const changeislogn = (value) => {
    setloginState(value);
  };


  const Navigate = () => {


    return (
      <>
        <Hotkey_global />
        <nav className="nav">
          <ul className="nav_lsit">
            <li className={navState === "home" ? "active_list" : null}>
              <Link to="/home" onClick={() => setnavState("home")}>검색</Link>
            </li>
            <li className={navState === "basket" ? "active_list" : null}>
              <Link to="/basket" onClick={() => setnavState("basket")}>찜목록</Link>
            </li>
            <li className={navState === "editinfo" ? "active_list" : null}>
              <Link to="/editinfo" onClick={() => setnavState("editinfo")}>회원정보 수정</Link>
            </li>
            <li className={navState === "support" ? "active_list" : null}>
              <Link to="/support" onClick={() => setnavState("support")}>고객센터</Link>
            </li>
            {/* <li className={navState === "test" ? "active_list" : null}>
              <Link to="/test" onClick={() => setnavState("test")}>테스트섹션</Link>
            </li> */}
          </ul>
        </nav>
      </>
    );
  }

  // 핫키 생성
  const Hotkey_global = () => {
    // 핫키 설정
    const keyMap_g = {
      spaceQ_key: 'space+q',
      spaceW_key: "space+w",
      spaceE_key: "space+e",
      spaceR_key: "space+r",
      // keypress, keydown, keyup.
      // space_down: { sequence: "space", action: "keydown" }
    };

    const homeClick = () => {
      console.log('space+q');
      setnavState("home");
    };
    const basketClick = () => {
      console.log('space + w');
    };
    const editinfoClick = () => {
      console.log('space + e');
    };
    const supportClick = () => {
      console.log('space + r');
    };

    // 핫키 적용 함수
    const handlers_g = {
      spaceQ_key: homeClick,
      spaceW_key: basketClick,
      spaceE_key: editinfoClick,
      spaceR_key: supportClick
    };

    return (
      <>
        <GlobalHotKeys keyMap={keyMap_g} handlers={handlers_g}>
        </GlobalHotKeys>
      </>
    );
  };
  if (islogin == false) {
    return (
      <div className='App'>
        <div className="index_wrap">
          <h1 className="logo">
            {/* <a onClick={() =>{setloginState(true)}}>logo</a> */}

            <Modal></Modal>
            <Link to="/home" onClick={() => { setnavState("home"); setloginState(true) }}></Link>
          </h1>
          <Choicelogin changeislogn={changeislogn} />
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <Hotkey_global />

        <div className='App'>
          <div className="wrap">
            <div className="side">
              <h1 className="logo">
                {/* <Link to="/home" onClick={() => {setnavState("home"); setloginState(true)}}></Link> */}
                <a onClick={() => { setloginState(false) }}>logo</a>
              </h1>
              <Navigate></Navigate>
            </div>
            <section className="content">
              <Header />
              <div className="container">
                <Routes>
                  {/* 라우터가 적용될 페이지 */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/basket" element={<Basket />} />
                  <Route path="/editinfo" element={<EditInfo />} />
                  <Route path="/support" element={<Support />} />
                  {/* <Route path="/test" element={<Test />} /> */}
                </Routes>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

}

// 레이어팝업 영역
const Popup = ({ handleClose }) => {
  const modalRef = useRef(null);

  const closeWithAnimation = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("closing");
      setTimeout(() => {
        modalRef.current.classList.remove("closing");
        handleClose();
      }, 300);
    }
  };
  return (
    <div ref={modalRef} className="intor_graphpop">
      <div className="content">
        <h1 className="logo">
          <a>logo</a>
        </h1>
        <p>복잡한 쇼핑 정보를 <br />간단하게 알고 싶다면?</p>
        <p>ARS를 통한 음성인식 주문 시스템</p>
        <p>대체텍스트 제공과 요약</p>
        <p>
          상품 검색부터 옵션 선택까지 10분이면 가능<br />
          상품 이미지 대체텍스트 제공과 요약으로 중요한 정보만 쏙!
        </p>
        {Logoslide}
        <button onClick={closeWithAnimation} className="start_closing">Close</button>
      </div>
    </div>
  );
};

function Modal() {
  const [visible, setVisible] = useState(true);

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && <Popup handleClose={closePopup} />}
    </>
  );
}



export default App;
