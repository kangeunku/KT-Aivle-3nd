import React from "react";
// import styles from "./Basket.module.css";
import styles from "../../styles/Basket.module.css";

const User = ({userData}) => {
    return (
        <li>
            <strong>{userData.name}</strong>
            <p>{userData.email}</p>
        </li>
    )
}

function BasketBoxes() {
    return (
        <div className={styles.bk_body}>
        <div className={styles.bklist}>
            <div className={styles.bklist_img}>이미지가들어갑니당</div>
            <div className={styles.bklist_com}>
                <div className={styles.bklist_name}>영덕 대게</div>
                <div className={styles.bklist_txt}>판매자 : ㅇㅇ스토어</div>
                <div className={styles.bklist_price}>58000원</div>
            </div>
            <div className={styles.bklist_btbox}>
                <button className={styles.bklist_bt1}>
                    <div className={styles.bklist_btfont}>더 보기</div>
                </button>
                <button className={styles.bklist_bt2}>
                    <div className={styles.bklist_btfont}>삭제</div>
                </button>
            </div>
        </div>
    </div>
    );
}

const Basket = () => {
    const users = [
        // 받아올 정보 db모음
        {zzim_name: 'chrisjyh@naver.com', zzim_img: "123.png" ,zzim_date: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
    ];

    return (
        <div className>
            <div className={styles.bklist_main}>(v)  찜한 상품입니다.</div>
            <BasketBoxes/>
            <BasketBoxes/>
            <BasketBoxes/>         
        </div>


    );
};
export { Basket };