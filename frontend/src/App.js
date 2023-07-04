import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

import { Home, Basket, EditInfo, Support, Choicelogin, Test } from "./pages";
import { Header,TextToSpeech } from "./components";

import { GlobalHotKeys } from 'react-hotkeys';
// import getCookie from "./components/common/csrftoken"


const App = () => {
  const [islogin, setloginState] = useState(false);
  const [navState, setnavState] = useState("home");
  const [reState, setreState] = useState(false);
  const location = useLocation();

  const changeislogin = (value) => {
    setloginState(value);
  };

  const relanding = (value) => {
    setreState(value);
  };

  useEffect(() => {
    if ((getCookie("sessionid") != undefined) && (getCookie("usercookieid") != undefined) && (getCookie("usercookienickname") != undefined)) {
      changeislogin(true)
    }
    else {
      changeislogin(false)
    }
  }, [islogin]);

  useEffect(() => {
    let local_loc = location.pathname
    let replaced_str = local_loc.replace('/', '');
    setnavState(replaced_str)
  }, [navState]);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].replace(' ', '');
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const Navigate = useNavigate();

  const goHome = () => {
    Navigate('/home');
  }

  const goBasket = () => {
    Navigate('/basket');
  }

  const goEditinfo = () => {
    Navigate('/editinfo');
  }

  const goSupport = () => {
    Navigate('/support');
  }

  const goTest = () => {
    Navigate('/test');
  }

  const ReNavigate = () => {
    return (
      <>
        <Hotkey_global />
        <nav className="nav">
          <ul className="nav_lsit">
            <li className={navState === "home" ? "active_list" : null}>
              <Link to="/home" onClick={() => navState === "home" ? relanding(true) : setnavState("home")}>검색</Link>
            </li>
            <li className={navState === "basket" ? "active_list" : null}>
              <Link to="/basket" onClick={() => navState === "basket" ? relanding(true) : setnavState("basket")}>찜목록</Link>
            </li>
            <li className={navState === "editinfo" ? "active_list" : null}>
              <Link to="/editinfo" onClick={() => navState === "editinfo" ? relanding(true) : setnavState("editinfo")}>회원정보 수정</Link>
            </li>
            <li className={navState === "support" ? "active_list" : null}>
              <Link to="/support" onClick={() => navState === "support" ? relanding(true) : setnavState("support")}>고객센터</Link>
            </li>
            <li className={navState === "test" ? "active_list" : null}>
              <Link to="/test" onClick={() => setnavState("test")}>테스트섹션</Link>
            </li>
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
      console.log('space + q');
      setnavState("home");
      goHome();
    };
    const basketClick = () => {
      console.log('space + w');
      setnavState("basket");
      goBasket();
    };
    const editinfoClick = () => {
      console.log('space + e');
      setnavState("editinfo");
      goEditinfo();
    };
    const supportClick = () => {
      console.log('space + r');
      setnavState("support");
      goSupport();
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
          <Choicelogin changeislogn={changeislogin} />
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
              <ReNavigate></ReNavigate>
            </div>
            <section className="content">
              <Header changeislogn={changeislogin} />
              <div className="container">
                <Routes>
                  {/* 라우터가 적용될 페이지 */}
                  <Route path="/" element={<Home state={reState} relanding={relanding} />} />
                  <Route path="/home" element={<Home state={reState} relanding={relanding} />} />
                  <Route path="/basket" element={<Basket state={reState} relanding={relanding} />} />
                  <Route path="/editinfo" element={<EditInfo state={reState} relanding={relanding} changeislogin={changeislogin} />} />
                  <Route path="/support" element={<Support state={reState} relanding={relanding} />} />
                  <Route path="/test" element={<Test />} />
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
  const [starttts, setstarttts] = useState(false);
  const ref_tts = useRef(starttts);

  const ttsStart = () => {
    ref_tts.current = true;
  };

  useEffect(() => {
    ttsStart();
    setstarttts(ref_tts.current);
  }, []);

  const closeWithAnimation = () => {
    handleAudio();
    ref_tts.current = false;
    setstarttts(ref_tts.current);
  
    if (modalRef.current) {
      modalRef.current.classList.add("closing");
      setTimeout(() => {
        modalRef.current.classList.remove("closing");
        handleClose();
      }, 300);
    }
  };
  // 핫키 생성
  const Hotkey_modal = () => {
    // 핫키 설정
    const keyMap_modal = {
      enter_key: 'enter',
      tts_stop: 'shift+d',
    };

    const closeClick = () => {
      console.log('enter');
      closeWithAnimation();
    };

    const stoptts = () => {
      handleAudio();
    }

    // 핫키 적용 함수
    const handlers_modal = {
      enter_key: closeClick,
      tts_stop: stoptts,
    };
    return (
      <>
        <GlobalHotKeys keyMap={keyMap_modal} handlers={handlers_modal}>
        </GlobalHotKeys>
      </>
    );
  };

  const handleAudio = () => {
    const audioElement = document.querySelector("audio");
    audioElement.pause();
  };

  //로고슬라이드
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    'logosl_1',
    'logosl_2',
    'logosl_3',
    'logosl_4',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const tts_content =`
  음성 기반 온라인 쇼핑 안내 도우미 오소리입니다!
  복잡한 온라인 쇼핑 과정을 간단하게 바꾸고 싶다면? ARS를 통한 음성인식 쇼핑 도우미인 오소리를 이용해보세요.
  상품 이미지 정보에 대한 대체 텍스트 제공과 요약으로 쇼핑에 꼭 필요한 정보를 전달드립니다. 
  상품 검색부터 상품 상세 옵션 선택까지 모든 서비스를 음성으로 이용해보세요.
  진입한 페이지에서 쉬프트 버튼과 큐버튼을 동시에 누르면 음성 서비스를 제공합니다.
  음성 서비스를 중단하고 싶으시면 쉬프트버튼과 디버튼을 동시에 눌러주세요.
  음성 서비스를 다시듣고싶으시면 쉬프트버튼과 디버튼은 동시에 누른후 쉬프트버튼과 큐버튼을 동시에 눌러주세요.
  `

  return (
    <>
      <Hotkey_modal />
      <div ref={modalRef} className="intor_graphpop">
        <div className="content">
          <h1 className="logo">
            <a>logo</a>
          </h1>
          <p>복잡한 쇼핑 정보를 <br />간단하게 알고 싶다면?</p>
          <div className="slide-container">
            {activeSlide === 0 && <h4>ARS를 통해 원하는 상품을 검색하고</h4>}
            {activeSlide === 1 && <h4>상세 카테고리를 선택하면</h4>}
            {activeSlide === 2 && <h4>추천상품이나옵니다</h4>}
            {activeSlide === 3 && <h4>상품이미지 대체텍스트 제공과 요약으로 중요한 정보만!</h4>}
            <div
              className={slides[activeSlide]}
              alt={`Slide ${activeSlide + 1}`}
            />
          </div>
          <button onClick={() => {closeWithAnimation()}} className="start_closing">시작하기</button>
          {/* <button onClick={()=>{ttsStart()}} className="start_closing">음성안내시작</button>
          <button onClick={()=>{handleAudio()}} className="start_closing">멈추기</button> */}
          {starttts && <TextToSpeech value={tts_content} />}
        </div>
      </div>
    </>
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
