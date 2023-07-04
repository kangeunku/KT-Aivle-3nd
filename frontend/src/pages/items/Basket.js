import React, { useState, useEffect, useNavigate } from "react";
import { Stt_common, Hotkey_start } from '../../components';
import styles from "../../styles/Basket.module.css";
import Slider from "../Slider";
import axios from "axios";
import { GlobalHotKeys, useHotkeys } from 'react-hotkeys';

const Basket = (props) => {
    const [ currentPage, setCurrentPage ] = useState('first');
    const [ result, setResult ] = useState();

    // 동일한 링크를 클릭시 처음화면으로 초기화
    useEffect(() => {
        goToFirstPage();
    },[]);

    useEffect(() => {
        props.relanding(false);
        setCurrentPage('first');
    }, [props.state]);
    
    const handleDeleteList = async (goods_url) => {
        // 찜 목록 삭제
        try{
            const url = "http://127.0.0.1:8000/v1/basket_change/";
            const data = {
                "goods_url": goods_url,
            }

            const response = await axios.put(url, data, {withCredentials:true});
            // console.log('handleDeleteList', response);
            goToFirstPage();
        } catch (error) {
            console.log('error', error);
        }
    };
    
    const goToSecondPage = async (goods_url) => {
        // 상품 상세 페이지로 이동
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
        // 찜목록 조회
        try{
            const url = "http://127.0.0.1:8000/v1/basket/";

            const response = await axios.get(url, {withCredentials: true});
            setResult(response.data);
            // console.log('list', response.data);
            setCurrentPage('first');
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} handleDeleteList={handleDeleteList} result={result}/>}
        {currentPage === 'second' && <SecondPage goToFirstPage={goToFirstPage} result={result}/>}
        </div>
    );
};

const FirstPage =({goToSecondPage, handleDeleteList, result}) => {
    // console.log("찜 목록 리스트")
    // console.log(result);
    const dataArray = result ? Object.values(result) : [];

    if(!dataArray){
        console.log()
        return
    }    
    
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
                {dataArray &&
                dataArray.map((item) => {
                    const DArray = item ? Object.values(item) : [];
                    return DArray.map((content) => {
                    return (
                        <div className={styles.bklist}>
                        <img
                            className={styles.bklist_img}
                            src={content.goods_thumb}
                        />
                        <div className={styles.bklist_com}>
                            <div className={styles.bklist_name}>
                                {content.goods_name}
                            </div>
                            <div className={styles.bklist_txt}>
                                {content.goods_summary && (content.goods_summary.slice(0, 70)+'.....')}
                            </div>
                            <div className={styles.bklist_price}>
                                {content.goods_price}원
                            </div>
                        </div>

                        <div className={styles.bklist_btbox}>
                            <button
                                className={styles.bklist_bt1}
                                id="more"
                                onClick={() => {
                                    goToSecondPage(content.goods_url)
                                }}>
                                <div className={styles.bklist_btfont} style={{ color: "#b4e0a0" }}>
                                    더 보기
                                </div>
                            </button>
                            <button
                                className={styles.bklist_bt2}
                                id="delete"
                                onClick={() => {
                                    handleDeleteList(content.goods_url)
                                }}>
                                <div className={styles.bklist_btfont} style={{ color: "#dd7878" }}>
                                    삭제
                                </div>
                            </button>
                        </div>
                        </div>
                    );
                    });
                })}

            </div>   
        </div>
    )
}

const SecondPage =({goToFirstPage, res, result, goods_url, popupOn, popupOff, message}) =>{
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
        {/* {PopupState === true? */}
        <Slider goToPage = {goToFirstPage} setPopupState={setPopupState} goods_url={goods_url} result={result}/>
        {/* : <FirstPage goToFirstPage={goToFirstPage()}></FirstPage>} */}
        </div>
    )
}
export { Basket };