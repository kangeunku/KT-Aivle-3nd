import React, {useState, useEffect,useRef, forwardRef, } from 'react';
import styled from "styled-components";
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';


const Resultpopup = styled.div`
    position: fixed;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    width:30vw;
    height:800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    overflow:auto;
    justify-content:center;
`;

const modal = forwardRef((props, ref) =>{
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        props.setModalState(false);
      }
    }

    function BtnEvent(){
      //alert('모달창 내부 작업을 해도 모달창이 꺼지지 않습니다.');
      props.setModalState(false);
    }
    
        // 핫키 생성
    // const Hotkey_local = () => {
    //       // 핫키 설정
    //       const keyMap = {
    //           enter_key: 'enter',
    //       };
  
    //       const enterClick = () => {
    //           console.log('enter');
    //           BtnEvent();
    //       };
  
    //       // 핫키 적용 함수
    //       const handlers = {
    //           enter_key: enterClick,
    //       };
          
    //       return (
    //           <>
    //               <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
    //               </GlobalHotKeys>
    //           </>
    //       );
    //   };
        // 핫키 생성
        const Hotkey_local = () => {
          // 핫키 설정
          const keyMap = {
              enter_key: 'space+1',
              spacebar_key: "space+w",
              // keypress, keydown, keyup.
              space_down: { sequence: "enter", action: "keydown" }
          };
  
          const handleClick = () => {
              console.log('space+1');
              BtnEvent();
          };
          const spaceClick = () => {
              console.log('space + w');
          };
          const spacedownClick = () => {
              console.log('enter down');
          };
  
          // 핫키 적용 함수
          const handlers = {
              enter_key: handleClick,
              spacebar_key: spaceClick,
              space_down: spacedownClick,
          };
          
          return (
              <>
                  <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
                  </GlobalHotKeys>
              </>
          );
      };

      return (
        <>
          <Hotkey_local/>

          <Resultpopup ref={wrapperRef}>
            <br></br>
            <p 
            style={{textAlign:"center", color:"#008080",
            fontSize:30, fontWeight:600,  }}> 서비스 이용약관</p>


            <button 
              style ={{
                display:"block",
                margin:"auto",
                marginTop:"100px",
                Bottom:"5%",
                backgroundColor : "white",
                width : "180px",
                height: "40px",
                borderRadius: "10px",
                fontSize:"20px",
                fontWeight:700,
                textAlign: "center",
                border:"3px solid #285a43",
                color : "#285a43",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"

              }}onClick={BtnEvent}>
              닫기
            </button>
          </Resultpopup>
        </>
      )
  
});

export default modal;