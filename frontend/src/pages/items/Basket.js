import React, { useState, useEffect, useRef } from "react";
import { Stt_common, Hotkey_start } from '../../components';
import styles from "../../styles/Basket.module.css";
import Slider from "../Slider";


// import { useDispatch, useSelector } from "react-redux";
// import  store from 'C:\Users\User\Desktop\BigProject19\BigProject_5_19\frontend\src\store.js';

// import  {addCount} from '../../jebal';

const Basket = () => {
    const [currentPage, setCurrentPage] = useState('first');
    console.log(currentPage)

    const goToSecondPage = async () => {
        await new Promise(resolve => setTimeout(resolve, 30));
        setCurrentPage('second');
    };

    const goToFirstPage = async() => {
        setCurrentPage('first');
    }

    return (
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} />}
        {currentPage === 'second' && <SecondPage goToFirstPage={goToFirstPage}/>}
        </div>

    );
};



const FirstPage =({goToSecondPage}, props) => {


    // const amountIncrease = (e,item) => {
    //     e.preventDefault();
    //     item.amount = item.amount + 5;
    // }

    // const onChangeProps = (id, key, value) => {
    //     setItemList(prevState => {
    //       return prevState.map(obj => {
    //         if (obj.id === id) {
    //           return { ...obj, [key]: value };
    //         } else {
    //           return { ...obj };
    //         }
    //       });
    //     });
    //   };
    
    // let cart = useSelector((state) => state);
    // const dispatch = useDispatch();


    return (
    //     <tbody>
    //     {cart.players.map((a, i) => (
    //         <tr key={i}>
    //           <td>{cart.players[i].id}</td>
    //           <td>{cart.players[i].name.split(" ")[0]}</td>
    //           <td>{cart.players[i].name.split(" ")[1]}</td>
    //           <td>{cart.players[i].count}</td>
    //           <button
    //             onClick={() => {
    //               dispatch(addCount(cart.players[i].id));
    //             }}> + </button>
    //           <button
    //             onClick={() => {
    //               dispatch.minusCount(cart.players[i].id);
    //             }}> - </button>
    //           <button
    //             onClick={(e) => {
    //               dispatch.deleteCount(e.target.parentElement);
    //             }}> 삭제 </button>
    //         </tr>
    //       ))}
    //   </tbody>

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
                        <button className={styles.bklist_bt1} onClick={()=>{ goToSecondPage() }}>
                            <div className={styles.bklist_btfont} style={{color:"#b4e0a0"}}>더 보기</div>
                        </button>
                        <button className={styles.bklist_bt2}>
                            <div className={styles.bklist_btfont} style={{color:"#dd7878"}}>삭제</div>
                        </button>
                    </div>
                </div> 
            </div>   
        </div> 
    )
}

const SecondPage =({goToFirstPage}) =>{
    const [PopupState, setPopupState] = useState(true);
    console.log(PopupState)

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
        <Slider setPopupState={setPopupState}/>: <FirstPage goToFirstPage={goToFirstPage()}></FirstPage>}
        </div>
    )
}
export { Basket };