import React, { useState, useEffect } from "react";
import {Send_api} from "../../components";
import styles from "../../styles/Home.module.css";
import Slider from "../Slider";
import axios from "axios";

const Home = () => {
    const [currentPage, setCurrentPage] = useState('first');
    const [inputValue, setInputValue] = useState('');

    const goToSecondPage = async () => {
        setCurrentPage('second');
    };

    const goToThirdPage = () => {
        setCurrentPage('third');
    }

    const goToForthPage = () => {
        setCurrentPage('forth');
    };

    const handleInputChange= (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        goToSecondPage();
    };

    return(
        <div>
        {currentPage === 'first' && <FirstPage inputValue={inputValue} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} />}
        {currentPage === 'second' && <SecondPage inputValue={inputValue} goToThirdPage={goToThirdPage}/>}
        {currentPage === 'third' && <ThirdPage  goToForthPage={goToForthPage}/>}
        {currentPage === 'forth' && <ForthPage/>}
      </div>
    );
};

const FirstPage = ({inputValue, handleInputChange, handleButtonClick}) => {

    return (
        <div className={styles.home_container}>
            <div className={styles.home_img1}>
                <div className={styles.home_desc_big}>상품을 검색하세요</div>
                <div className={styles.home_search_box1}>
                    <input className={styles.home_overlay_main} placeholder="입력해주세요" value={inputValue} onChange={handleInputChange}/>
                    <div className={styles.home_button1} onClick={handleButtonClick} alt="상세검색으로 이동하는 버튼"/>
                </div>
            </div>
        </div>
    );
};

const SecondPage = ({ inputValue, goToThirdPage}) => {
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        const url = "http://127.0.0.1:8000/main/search1/"
        // let result = []
        let data = {
            "query": '"'+ inputValue +'"'
        }   
        axios.post(url, data)
        .then(function (response) {
            setResult(JSON.stringify(response.data))
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <div className={styles.home_container2}>
            <div className={styles.home_search_contained}>
                <p className={styles.home_main_guide}>상품을 검색하세요</p>
                <div className={styles.home_search_box2} >
                    <div className={styles.home_img2} alt="웹 페이지 이미지"/>
                    <div className={styles.home_search_box2_txt}>{inputValue}</div>
                </div>
            </div>
            <div>
            <div className={styles.home_mainguide}>상세 검색을 위해 카테고리를 불러오겠습니다.</div>
                <div className={styles.home_search_box3}>
                    <CategoryBoxes result = {result}/>
                </div>
            </div>
            <div>
                <a className={styles.home_button2} onClick={goToThirdPage} alt="상품추천으로 이동하는 버튼">
                    <div>다음</div>
                </a>
            </div>
        </div>
    )
    
};

const Popup = ({ onClose, message }) => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            onClose();
        }, 10000);
    }, []);
  
    return (
        <Slider/>
    );
};
{/* <div className={styles.popup1}>
            <div className={styles.popup1_txt}>{message}</div>
            <div className={styles.popup1_lgimg}>오소리</div>
</div> */}

const ThirdPage = ({goToForthPage}) => {
    const [popupVisible, setPopupVisible] =useState(false);
    const [popupMessage, setPopupMessage] = useState("");
  
    const handleButtonClick = (message) => {
      setPopupMessage(message);
      setPopupVisible(true);
    };
  
    const handlePopupClose = () => {
      setPopupVisible(false);
    };

    return(
        <div className={styles.home_container2}>
            <div className={styles.home_search_contained}>
                <p className={styles.home_main_guide}>추천 상품</p>
                
            </div>
                <div className={styles.RecommendBox}>
                    <div className={styles.GoodsBox}>
                        <div className={styles.Goods_img1} alt="추천 상품 이미지1"/>
                        <div className={styles.GoodsInfo}>
                            <label className={styles.InfoText}
                                style={{
                                    fontWeight: "bold",
                                    marginTop: "50px"
                                }}
                            ><b>소리소리오소리</b></label>
                            <br></br>
                            <label className={styles.InfoText}
                                style={{
                                    fontSize: 25,
                                    marginLeft: 150,
                                    marginTop:100
                                }}
                            ><b>39.99$</b></label>
                            <div>
                                <a className={styles.buy_button1} onClick={goToForthPage} alt="상품 상세페이지로 이동하는 버튼">
                                    <div>구매하기</div>
                                </a>
                            </div>
                            {/* <button onClick={() => handleButtonClick("선택")}>
                                <div>구매하기</div>
                            </button>
                            {popupVisible && (
                            <Popup onClose={handlePopupClose} message={popupMessage} />
                            )} */}
                        </div>
                    </div>
                    <div className={styles.GoodsBox}>
                        <div className={styles.Goods_img1} alt="추천 상품 이미지1"/>
                        <div className={styles.GoodsInfo}>
                            <label className={styles.InfoText}
                                style={{
                                    fontWeight: "bold",
                                    marginTop: "50px"
                                }}
                            ><b>소리소리오소리</b></label>
                            <br></br>
                            <label className={styles.InfoText}
                                style={{
                                    fontSize: 25,
                                    marginLeft: 150,
                                    marginTop:100
                                }}
                            ><b>39.99$</b></label>
                            <div>
                                <a className={styles.buy_button1} onClick={goToForthPage} alt="상품 상세페이지로 이동하는 버튼">
                                    <div>구매하기</div>
                                </a>
                            </div>
                            {/* <button onClick={() => handleButtonClick("선택")}>
                                <div>구매하기</div>
                            </button>
                            {popupVisible && (
                            <Popup onClose={handlePopupClose} message={popupMessage} />
                            )} */}
                        </div>
                    </div>
                </div>
            
            
        </div>           
    )
}

const ForthPage = () => {
    return(
        <Slider/>
    )
    
};

const CategoryBoxes = ({ result })=> {   
    return (
        <div className={styles.catebox_body}>
            {result && result.map((item, index) => (
                <div className={styles.catebox_box1} key={item}>
                    <div className={styles.catebox_index1}>{index + 1}. 사과의 '{item}'를 추천해주세요(0을 누를 시 생략)</div>
                    <div className={styles.catebox_index2}>
                        {item.cate_lst.map((index) => (
                            <div className={styles.catebox_index3} key={index}>{index}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

const detail_category = [
    {
        category: "카테고리",
        cate_lst: ["원진", "생활/건강", "가구/인테리어", "출산/육아", "디지털/가전"],
    },
    {
        category: "브랜드",
        cate_lst: ["늘품", "산지애", "다농이네", "산들네", "과일꾼", "장길영사과"],
    },
    {
        category: "키워드 추천",
        cate_lst: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사과"],
    },
    {
        category: "키워드 추천",
        cate_lst: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사"],
    },
    {
        category: "키워드 추천",
        cate_lst: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사과"],
    },
];

export { Home };