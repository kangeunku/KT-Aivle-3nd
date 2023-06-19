import React, { useState, useRef } from "react";

// const { useState ,useRef} = React;

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
    <div ref={modalRef} className="graphpop">
      <div className="content">
        <img src="./ico.png" alt="" />
        <h2>안녕하세요 주은호입니다</h2>
        <button onClick={closeWithAnimation}>Close</button>
      </div>
    </div>
  );
};

function Modal() {
  const [visible, setVisible] = useState(false);

  const showPopup = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <>
      <button onClick={showPopup} className="modal_btn">modal</button>
      {visible && <Popup handleClose={closePopup} />}
    </>
  );
}

export { Modal }