import React, {useState, useEffect,useRef, forwardRef, } from 'react';
import styled from "styled-components";
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';


const Resultpopup = styled.div`
    position: fixed;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    width:40vw;
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

const modal_ = forwardRef((props, ref) =>{
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        props.setModal_State(false);
      }
    }

    function BtnEvent(){
      //alert('모달창 내부 작업을 해도 모달창이 꺼지지 않습니다.');
      props.setModal_State(false);
    }

      return (
        <>
          <Resultpopup ref={wrapperRef}>
            <br></br>
            <p 
            style={{textAlign:"center", color:"#008080",
            fontSize:30, fontWeight:600,  }}> 개인정보 수집 및 이용에 대한 동의 안내</p>

            <div style={{paddingLeft:30, width:"95%"}}>
            <dl >
                <br></br>
                <dt></dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>'오소리'는 다음과 같이 이용자의 개인정보를 수집 활용하는 것에 대해 동의함을 확인합니다. </dd>
                  <dd></dd>
                </div><hr style={{width:"90%"}}/>

                <dt>제1조 (목적)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>
                    본 동의서는 서비스 향상을 목적으로 개인정보를 수집, 활용하기 위하여 체결됩니다.</dd>
                </div>
                <hr style={{width:"90%"}}/>

                <dt>제2조 (수집정보 내역)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>오소리는 사용자의 별명을 수집합니다. </dd></div>
                <hr style={{width:"90%"}}/>

                <dt>제3조 (보유, 활용기간)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>① 이 약관은 회원가입 시 약관을 공지하거나 이용자의 요구 시 약관을 이용자에게 통지함으로써 효력이 발생됩니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>② '오소리'가 약관을 개정할 경우 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 '오소리'는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>③ '오소리'가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관이 적용됩니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>④ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 대한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.</dd>
                </div><hr style={{width:"90%"}}/>

                <dt></dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>이용자는 위의 약관을 잘 이해하였으며, 아래와 같이 개인정보를 수집, 활용하는 것에 대해 동의합니다. </dd>
                </div><hr style={{width:"90%"}}/>

            </dl>
            </div>

            <button 
              style ={{
                display:"block",
                margin:"auto",
                marginTop:"50px",
                marginBottom:"50px",
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

export default modal_;