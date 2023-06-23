import React, { useState, useEffect } from "react";
import styles from "../../styles/EditInfo.module.css";

const EditInfo = () => {
    const [currentPage, setCurrentPage] = useState('first');
  
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
        {currentPage === 'third' && <ThirdPage />}
        {currentPage === 'fourth' && <FourthPage />}
        {currentPage === 'fifth' && <FifthPage />}
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
            <div className={styles.popup1_lgimg}>오소리</div>
        </div>
    );
};


const FirstPage = ({goToSecondPage}) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
  
    const handleButtonClick = (message) => {
      setPopupMessage(message);
      setPopupVisible(true);
    };
  
    const handlePopupClose = () => {
      setPopupVisible(false);
    };

    return(
        <div>
            <div className={styles.page2main}>
                <div className={styles.page2main1}>(v) 회원정보 수정</div>
                <ol className={styles.page2main2 + " " + styles.page2box3}>
                    <li>비밀번호 확인 이후 회원정보 수정이 가능합니다.</li>
                    <li>비밀번호를 입력해주세요.</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>비밀번호 입력</div>
                    <div className={styles.edit_form1_box}>
                        <div className={styles.edit_form1_txt2}>EungoChunJae</div>
                        <div className={styles.edit_form1_checkimg}></div>
                    </div>
                    <div>
                        <button className={styles.button_main} onClick={goToSecondPage}>
                            <div>변경한다</div>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );};

const SecondPage = ({goToThirdPage, goToFourthPage, goToFifthPage}) => {
    return(
        <div>
            <div className={styles.page2main}>
                <div className={styles.page2main1}>회원정보 수정</div>
                <div className={styles.page2main2}>원하시는 메뉴를 선택해주세요</div>
            </div>
            <div className={styles.page2box}>
                <div className={styles.page2box2} onClick={goToThirdPage}>
                    <img className={styles.page2box2_img} alt=""  />
                    <div className={styles.page2box2_txt1}>별명 변경</div>
                    <div className={styles.page2box2_txt2}>별명을 변경할 수 있습니다</div>
                </div>
                <div className={styles.page2box2} onClick={goToFourthPage}>
                    <img className={styles.page2box2_img} alt=""  />
                    <div className={styles.page2box2_txt1}>비밀변호 변경</div>
                    <div className={styles.page2box2_txt2}>비밀번호를 변경할 수 있습니다</div>
                </div>
                <div className={styles.page2box2} onClick={goToFifthPage}>
                    <img className={styles.page2box2_img} alt="" />
                    <div className={styles.page2box2_txt1}>회원 탈퇴</div>
                    <div className={styles.page2box2_txt2}>더 이상 서비스를 이용하고 싶지 않습니다</div>
                </div>
            </div>
        </div>
    );
};

const ThirdPage = ({goToFourthPage}) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
  
    const handleButtonClick = (message) => {
      setPopupMessage(message);
      setPopupVisible(true);
    };
  
    const handlePopupClose = () => {
      setPopupVisible(false);
    };

    return(
        <div>
            <div className={styles.page2main}>
                <div className={styles.page2main1}>(v) 별명 변경</div>
                <ol className={styles.page2main2 + " " + styles.page2box3}>
                    <li>서비스 이용시 사용할 별명을 입력해주세요.</li>
                    <li>별명에는 한국어만 사용이 가능합니다.</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>새로운 별명 입력</div>
                    <div className={styles.edit_form1_box}>
                        <div className={styles.edit_form1_txt2}>은호천재</div>
                        {/* 밍테div는 기술고문님도움받아서 체크버튼 이미지로 교환할 것 일단은 위치잡기위해만든것*/}
                        <div className={styles.edit_form1_checkimg}></div>
                    </div>
                    <div>
                        <button className={styles.button_main} onClick={() => handleButtonClick("별명이 바보은호로 변경되었습니다")}>
                            <div>변경한다</div>
                        </button>
                        {popupVisible && (
                        <Popup onClose={handlePopupClose} message={popupMessage} />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

const FourthPage = () => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
  
    const handleButtonClick = (message) => {
      setPopupMessage(message);
      setPopupVisible(true);
    };
  
    const handlePopupClose = () => {
      setPopupVisible(false);
    };

    const [isBVisible, setIsBVisible] = useState(false);

    const handleButtonClick2 = () => {
      setIsBVisible(true);
    }

    return(
        <div>
            <div className={styles.page2main}>
                <div className={styles.page2main1}>(v) 비밀번호 변경</div>
                <ol className={styles.page2main2 + " " + styles.page2box3}>
                    <li>사용할 새로운 비밀번호를 입력해주세요.</li>
                    <li>이전 비밀번호와는 달라야합니다.</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>새로운 비밀번호 입력</div>
                    <div className={styles.edit_form1_box}>
                        <div className={styles.edit_form1_txt2}>은호천재</div>
                        {/* 밍테div는 기술고문님도움받아서 체크버튼 이미지로 교환할 것 일단은 위치잡기위해만든것*/}
                        <div className={styles.edit_form1_checkimg}></div>
                    </div>
                    <div>
                        <button className={styles.button_main} onClick= {handleButtonClick2}>입력</button>
                    </div>
                </div>

                {isBVisible && (
                    <div className={styles.edit_form1} style={{ marginTop: "150px" }}>
                        <div className={styles.edit_form1_txt}>새로운 비밀번호 입력(확인)</div>
                        <div className={styles.edit_form1_box}>
                            <div className={styles.edit_form1_txt2}>은호천재</div>
                            {/* 밍테div는 기술고문님도움받아서 체크버튼 이미지로 교환할 것 일단은 위치잡기위해만든것*/}
                            <div className={styles.edit_form1_checkimg}></div>
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
    );
};

const FifthPage = () => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
  
    const handleButtonClick = (message) => {
      setPopupMessage(message);
      setPopupVisible(true);
    };
  
    const handlePopupClose = () => {
      setPopupVisible(false);
    };

    return(
        <div>
            <div className={styles.page2main}>
                <div className={styles.page2main1}>(v) 회원 탈퇴</div>
                <ol className={styles.page2main2 + " " + styles.page2box3}>
                    <li>탈퇴 시 별명을 포함한 모든 회원 정보가 삭제됩니다.</li>
                    <li>작성했던 1 : 1 문의도 삭제되며 복구할 수 없습니다.</li>
                </ol>
                <div className={styles.edit_form1}>
                    <div className={styles.edit_form1_txt}>비밀번호 입력</div>
                    <div className={styles.edit_form1_box}>
                        <div className={styles.edit_form1_txt2}>은호눈물</div>
                        {/* 밍테div는 기술고문님도움받아서 체크버튼 이미지로 교환할 것 일단은 위치잡기위해만든것*/}
                        <div className={styles.edit_form1_checkimg}></div>
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
    );
};

// export default Input;

export { EditInfo };