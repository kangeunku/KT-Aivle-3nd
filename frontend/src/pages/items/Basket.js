import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { Stt_common, Hotkey_start } from '../../components';
import styles from "../../styles/Basket.module.css";
import Slider from "../Slider";
import axios from "axios";
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';

const Basket = (props) => {
    const [ currentPage, setCurrentPage ] = useState('first');
    const [ result, setResult ] = useState();
    const [ goods_url, setGoods_url ] = useState();

    // 동일한 링크를 클릭시 처음화면으로 초기화
    useEffect(() => {
        props.relanding(false);
        setCurrentPage('first');
    }, [props.state]);

    useEffect(() => {
        goToFirstPage();
    },[]);

    const handleDeleteList = async (url) => {
        try{
            const url = "http://127.0.0.1:8000/v1/basket_change/";
            const data = {
                "goods_url": url,
            }
            setGoods_url(url);

            const response = await axios.put(url, data, {withCredentials:true});
            console.log('handleDeleteList', response);
            setCurrentPage('first');
        } catch (error) {
            console.log('error', error);
        }
    };
    

    const goToSecondPage = async (goods_url) => {
        await new Promise(resolve => setTimeout(resolve, 30));

        try {
            const url = "http://127.0.0.1:8000/v1/detail/";
            const data = {
                "goods_url": goods_url,
            }

            const response = await axios.post(url, data);
            setResult(response.data);
            setCurrentPage('second');
        } catch (error) {
            console.log('error', error);
        }
    };

    const goToFirstPage = async() => {
        try{
            const url = "http://127.0.0.1:8000/v1/basket/";

            const response = await axios.get(url, {withCredentials: true});
            setResult(response.data);
            console.log('list', response);

        } catch (error) {
            console.log('error', error);
        }
        setCurrentPage('first');
    };

    return (
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} handleDeleteList={handleDeleteList} result={result}/>}
        {currentPage === 'second' && <SecondPage goToFirstPage={goToFirstPage} result={result}/>}
        </div>
    );
};

const FirstPage =({goToSecondPage}) => {
    // 핫키 생성
    const Hotkey_basket = () => {
        // 핫키 설정
        const keyMap_b1 = {
            space1_key: 'space+1',
            space2_key: "space+2"
        };

        const moreClick = () => {
            console.log('space+1');
            document.getElementById('more').focus();
        };
        const deleteClick = () => {
            console.log('space + 2');
            document.getElementById('delete').focus(); 
            //모두 동의로 포커스 이동 후 space로 check -> tab 눌러 다음 버튼으로 이동 -> enter
        };

        // 핫키 적용 함수
        const handlers_b1 = {
            space1_key: moreClick,
            space2_key: deleteClick,
        };
        
        return (
            <>
                <GlobalHotKeys keyMap={keyMap_b1} handlers={handlers_b1}>
                </GlobalHotKeys>
            </>
        );
    };

    return (
        <div>
            <div className={styles.bkboxes}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.bkboxes1}>찜 목록</div>
            </div>
            <div className={styles.bk_body}>
                <div className={styles.bklist}>
                    <div className={styles.bklist_img}>이미지가들어갑니당</div>
                    <div className={styles.bklist_com}>
                        <div className={styles.bklist_name}>아이템이름</div>
                        <div className={styles.bklist_txt}>추가적 설명</div>
                        <div className={styles.bklist_price}>(가격)원</div>
                    </div>
                    <div className={styles.bklist_btbox}>
                        <button className={styles.bklist_bt1} id="more" onClick={()=>{ goToSecondPage() }}>
                            <div className={styles.bklist_btfont} style={{color:"#b4e0a0"}}>더 보기</div>
                        </button>
                        <button className={styles.bklist_bt2} id="delete">
                            <div className={styles.bklist_btfont} style={{color:"#dd7878"}}>삭제</div>
                        </button>
                    </div>
                </div>
            </div>   
        </div>
    )
}

const SecondPage =({goToFirstPage, result}) =>{
    const [PopupState, setPopupState] = useState(true);
    // console.log(PopupState)

    function OnOffPopup(){
        if(PopupState===true){
            setPopupState(false);
        }
        else{
            setPopupState(true);
        }
    }
    return (
        <div>
        {PopupState === true?
        <Slider setPopupState={setPopupState} result={result}/>: <FirstPage goToFirstPage={goToFirstPage()}></FirstPage>}
        </div>
    )
}
export { Basket };