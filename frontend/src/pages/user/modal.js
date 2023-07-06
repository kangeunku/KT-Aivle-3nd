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

      return (
        <>
          <Resultpopup ref={wrapperRef}>
            <br></br>
            <p 
            style={{textAlign:"center", color:"#008080",
            fontSize:30, fontWeight:600,  }}> 서비스 이용약관</p>

            <div style={{paddingLeft:30, width:"95%"}}>
            <dl >
                <br></br>
                <dt>제1조 (목적)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>
                  이 약관은 오소리 사이버 몰에서 제공하는 인터넷 관련 서비스를 이용함에 있어 오소리와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</dd>
                </div>
                <hr style={{width:"90%"}}/>

                <dt>제2조 (정의)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>①  이 약관에서 사용되는 다음 용어의 정의는 아래와 같습니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 20}}>-  '오소리'는 시각장애인의 웹 편의성 개선을 위해 서비스를 제공하는 19조 및 19조의 사이트입니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 20}}>-  '이용자'는 '오소리'에 회원가입하여 이 약관에 따라 오소리가 제공하는 서비스를 받는 자를 말합니다.</dd></div>
                <hr style={{width:"90%"}}/>

                <dt>제3조 (약관의 효력 및 변경)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>① 이 약관은 회원가입 시 약관을 공지하거나 이용자의 요구 시 약관을 이용자에게 통지함으로써 효력이 발생됩니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>② '오소리'가 약관을 개정할 경우 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 '오소리'는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>③ '오소리'가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관이 적용됩니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>④ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 대한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.</dd>
                </div><hr style={{width:"90%"}}/>

                <dt>제4조 (서비스의 제공 및 변경)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>① '오소리'는 다음과 같은 업무를 수행합니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 20}}>- 1. 네이버 쇼핑 크롤링을 통한 검색 상품과 가격 별점 등 정보 제공</dd>
                  <dd style={{marginBottom:7, marginLeft: 20}}>- 2. OCR을 통한 대체 텍스트 제공과 이를 요약한 정보 제공</dd>
                  <dd style={{marginBottom:7, marginLeft: 20}}>- 3. TTS와 STT를 이용한 ARS 서비스 제공</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>② '오소리'가 제공하는 서비스의 내용을 내부 사유로 변경하는 경우에는 그 사유를 이용자들에게 메인 페이지에 통지합니다.</dd>
                </div><hr style={{width:"90%"}}/>

                <dt>제5조 (서비스의 중단)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>① '오소리'는 컴퓨터 등 정보통신설비의 보수점검, 교체, 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>② 사업종목의 전환, 사업 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 '오소리'는 이용자에게 통지합니다.</dd>
                  </div><hr style={{width:"90%"}}/>

                <dt>제6조 (회원가입)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>① '이용자'는 '오소리'가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>② '오소리'는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 등록에 허위, 기재누락이 있다면 회원가입을 취소할 수 있습니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>③ 회원가입 계약의 성립 시기는 회원이 버튼을 누른 시점으로 합니다.</dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>④ 온라인 가입 신청 양식에 기재하는 모든 회원 정보는 실제 데이터인 것으로 간주하므로 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스 사용의 제한을 받을 수도 있습니다.</dd>
                </div><hr style={{width:"90%"}}/>

                <dt>제7조 (개인정보의 보호)</dt>
                <div style={{fontSize:17, paddingTop:20}}>
                  <dd style={{marginBottom:7, marginLeft: 10}}>① '오소리'는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)를 보호합니다. </dd>
                  <dd style={{marginBottom:7, marginLeft: 10}}>② ID와 비밀번호에 관한 관리책임은 '이용자'에게 있습니다.</dd>
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

export default modal;