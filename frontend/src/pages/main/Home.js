import React, { useState, useEffect } from "react";
import {Send_api} from "../../components";
import styles from "../../styles/Home.module.css";
import Slider from "../Slider";
import axios from "axios";

const Home = () => {
    const [currentPage, setCurrentPage] = useState('first');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState([]);
    const [res, setRes] = useState([]);

    const goToSecondPage = async () => {
        setCurrentPage('second');
    };

    const goToThirdPage = async (items) => {
        let test = [...items, inputValue];
        const joinedItems = test.join(" ");
        const url = "http://127.0.0.1:8000/v1/search2/"
        let data = {
            "query": joinedItems,
            "display": 3,
            "start": 1,
        };
        await axios.post(url, data)
        .then(function (response) {
            setRes(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        setCurrentPage('third');
    }

    const goToForthPage = () => {
        setCurrentPage('forth');
    };

    const handleInputChange= (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        const url = "http://127.0.0.1:8000/v1/search1/"
        let data = {
            "query": '"'+ inputValue +'"',
        };
        await axios.post(url, data)
        .then(function (response) {
            setResult(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

        goToSecondPage();
    };

    return(
        <div>
        {currentPage === 'first' && (<FirstPage inputValue={inputValue} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} />)}
        {currentPage === 'second' && <SecondPage inputValue={inputValue} goToThirdPage={goToThirdPage} result={result}/>}
        {currentPage === 'third' && <ThirdPage  goToForthPage={goToForthPage} result={res}/>}
        {currentPage === 'forth' && <ForthPage goToThirdPage={goToThirdPage}/>}
        </div>
    );
};

const FirstPage = ({inputValue, handleInputChange, handleButtonClick}) => {

    return (
        <div className={styles.home_container}>
            <div className={styles.homebox1}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.homebox11}>상품 검색</div>
            </div>
            <div className={styles.home_search_box1}>
                <input className={styles.home_overlay_main} placeholder="입력해주세요" value={inputValue} onChange={handleInputChange}/>
                <div className={styles.home_button1} onClick={handleButtonClick} alt="상세검색으로 이동하는 버튼"/>
            </div>
        </div>
    );
};

const SecondPage = ({ inputValue, goToThirdPage, result}) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemClick = (category) => {
        // console.log('handleItemClick', category);
        if (selectedItems.includes(category)) {
            setSelectedItems((prevItems) => prevItems.filter((item) => item !== category));
        } else {
            setSelectedItems((prevItems) => [...prevItems, category]);
        }
    };

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
                    {/* <CategoryBoxes result = {result}/> */}
                    <CategoryBoxes onItemSelect={handleItemClick} selectedItems={selectedItems} result={result}/>
                </div>
            </div>
            <div>
                <a className={styles.home_button2} onClick={() => goToThirdPage(selectedItems)} alt="상품추천으로 이동하는 버튼">
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

// 추천 상품 목록 보여주기
const ThirdPage = ({goToForthPage, result }) => {
    const [popupVisible, setPopupVisible] =useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    console.log('third result', result);

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

// 모달창으로 띄워주기
const ForthPage = ({goToThirdPage}) => {
    const [PopupState, setPopupState] = useState(true);

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
        <Slider setPopupState={setPopupState}/>
        : <FirstPage goToThirdPage={goToThirdPage()}></FirstPage>}
        </div>
    )
    
};

function CategoryBoxes({result, onItemSelect, selectedItems}) {
    return (
        <div className={styles.catebox_body}>
            {result.map((item, index) => (
                // {detail_category.map((item, index) => (
                <div className={styles.catebox_box1} key={item.category}>
                    <div className={styles.catebox_index1}>사과의 {item.category}를 추천해주세요(0을 누를 시 생략)</div>
                    <div className={styles.catebox_index2}>
                        <a>선택 안 함 </a>
                        {item.cate_lst.map((category, categoryIndex) => (
                            <div className={`${styles.catebox_index3} 
                                ${selectedItems.includes(category) ? styles.selected : styles.unselected}`}
                                key={categoryIndex} onClick={() => onItemSelect(category)}>
                                {category}
                            </div>
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