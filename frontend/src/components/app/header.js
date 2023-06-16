import React from "react"

const Header = () => {
    return (
      <>
        <header className="header">
          <div className="head_btn_box">
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
          </div>
          <p className="welcome_txt">주은호님 환영합니다</p>
        </header>  
        {/* <div className="head_box"></div> */}
      </>
    );
  }

export {Header}