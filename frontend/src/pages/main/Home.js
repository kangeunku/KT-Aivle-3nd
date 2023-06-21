import React, { useState } from "react";
import {Send} from "../../components";
import styles from "../../styles/Home.module.css";


const Home = () => {
    const [currentPage, setCurrentPage] = useState('first');

    const goToSecondPage = async () => {
        await new Promise(resolve => setTimeout(resolve, 30));
        setCurrentPage('second');
    };

    return(
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} />}
        {currentPage === 'second' && <SecondPage />}
      </div>
    );
};

const FirstPage = ({goToSecondPage}) => {
    const data = ['hi','hi','hi','hi','hi']
    return (
        <div className={styles.home_container}>
            <div className={styles.home_img1}>
                <div className={styles.home_desc_big}>상품을 검색하세요</div>
                <div className={styles.home_search_box1}>
                    <div className={styles.home_overlay_main}>Search</div>
                    <div className={styles.home_button1} onClick={goToSecondPage} alt="상세검색으로 이동하는 버튼"/>
                </div>
            </div>
        </div>
    );
};

const SecondPage = () => {
    return (
        <div className={styles.home_container2}>
            <div class={styles.home_search_contained}>
                <p className={styles.home_main_guide}>상품을 검색하세요</p>
                <div className={styles.home_search_box2} >
                    <div className={styles.home_img2} alt="웹 페이지 이미지"/>
                    <div className={styles.home_search_box2_txt}>사과</div>
                </div>
            </div>
            <div>
            <div className={styles.home_mainguide}>상세 검색을 위해 카테고리를 불러오겠습니다.</div>
                <div className={styles.home_search_box3}>
                    <CategoryBoxes/>
                </div>
            </div>
            <div>
                <a className={styles.home_button2} href="/basket">
                    <div>다음</div>
                </a>
            </div>
        </div>
    )
    
};


const detail_category = [
    {
        category: "카테고리",
        car_index: ["원진", "생활/건강", "가구/인테리어", "출산/육아", "디지털/가전"],
    },
    {
        category: "브랜드",
        car_index: ["늘품", "산지애", "다농이네", "산들네", "과일꾼", "장길영사과"],
    },
    {
        category: "키워드 추천",
        car_index: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사과"],
    },
    {
        category: "키워드 추천",
        car_index: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사"],
    },
    {
        category: "키워드 추천",
        car_index: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사과"],
    },
];

function CategoryBoxes() {
    return (
        <div className={styles.catebox_body}>
            {detail_category.map((item, index) => (
                <div className={styles.catebox_box1} key={item.category}>
                    <div className={styles.catebox_index1}>{index + 1}. 사과의 '{item.category}'를 추천해주세요(0을 누를 시 생략)</div>
                    <div className={styles.catebox_index2}>
                        {item.car_index.map((index) => (
                            <div className={styles.catebox_index3} key={index}>{index}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { Home };