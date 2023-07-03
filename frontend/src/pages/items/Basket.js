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
        goToFirstPage();
    },[]);

    useEffect(() => {
        props.relanding(false);
        setCurrentPage('first');
    }, [props.state]);

    const handleDeleteList = async (url) => {
        // 찜 목록 삭제
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
            console.log('list', response.data);
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
    let test = null;
    if (result)
    {
        Object.values(result).map((item) => {
            Object.values(item).map((content) => {
                test = content;
                
                // console.log('content', content);
                // console.log('date', content.date);
                // console.log('goods_url', content.goods_url);
                // console.log('goods_star', content.goods_star);
                // console.log('goods_thumb', content.goods_thumb);
                // console.log('goods_summary', content.goods_summary);
            });
        });
        // console.log('test', test);
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
                <div className={styles.bklist}>
                    {result &&
                        Object.values(result).map((item) => {
                            Object.values(item).map((content) => {
                                
                                {console.log(content.goods_thumb)}
                                {console.log(content.goods_name)}
                                {console.log(content.goods_summary)}
                                {console.log(content.goods_name)}

                                <div>
                                    {/* <img className={styles.bklist_img} src="https://shop-phinf.pstatic.net/20230504_180/1683187467116KRcmO_PNG/10308205791871900_1467586958.png?type=m510"/> */}
                                    <div className={styles.bklist_com}>
                                        <div className={styles.bklist_name}>델몬트드링크팩 190ml 오렌지＋포도＋사과+망고 과즙음료</div>
                                        <div className={styles.bklist_txt}></div>
                                        <div className={styles.bklist_price}>12800원</div>
                                    </div>
                                </div>
                            })
                        })
                    }
                    <div className={styles.bklist_btbox}>
                        <button className={styles.bklist_bt1} id="more" onClick={()=>{ goToSecondPage() }}>
                            <div className={styles.bklist_btfont} style={{color:"#b4e0a0"}}>더 보기</div>
                        </button>
                        <button className={styles.bklist_bt2} id="delete" onClick={handleDeleteList}>
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