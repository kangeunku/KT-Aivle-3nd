import React, { useState, useEffect } from "react";
import { Send_api } from "../../components";
import styles from "../../styles/Home.module.css";
import Slider from "../Slider";
import axios from "axios";
import { GlobalHotKeys } from "react-hotkeys";

import { TextToSpeech } from "../../components";
import { getCookie } from '../../components/common/csrftoken';

const Home = (props) => {
    const [currentPage, setCurrentPage] = useState('first');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState([]);
    const [res, setRes] = useState([]);
    const [inputUrl, setInputUrl] = useState([]);

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const [starttts, setstarttts] = useState(false);

    useEffect(() => {
        setstarttts(true)
    });


    // 동일한 링크를 클릭시 처음화면으로 초기화
    useEffect(() => {
        props.relanding(false);
        setCurrentPage('first');
        setInputValue('');
        setResult([]);
        setPopupVisible(false);
        setPopupMessage("");
    }, [props.state]);

    const goToSecondPage = async () => {
        setCurrentPage('second');
    };

    const goToThirdPage = async (items) => {
        setPopupMessage("세부 상품을 검색 중입니다.");
        setPopupVisible(true);
        let test = [...items, inputValue];
        const joinedItems = test.join(" ");
        const url = "http://127.0.0.1:8000/v1/search2/";
        let data = {
            "query": joinedItems,
            "display": 3,
            "start": 1,
        };
        await axios.post(url, data)
            .then(function (response) {
                setRes(response.data);
                setPopupVisible(false);
            })
            .catch(function (error) {
                console.log('error', error);
            });
        setCurrentPage('third');
    }

    const goToForthPage = async (goods_url) => {
        // goods_url.replace('"','')
        setPopupMessage("상품을 분석 중입니다.");
        setPopupVisible(true);
        try {
            const url = "http://127.0.0.1:8000/v1/detail/";
            const data = {
                "goods_url": goods_url,
            }

            const response = await axios.post(url, data);
            // console.log('goods_detail', response);
            setResult(response?.data);
            // console.log("detail", response.data.img_pathes);
            // setResult(response.data.img_pathes);
            setInputUrl(goods_url);
            // console.log("goods_url", goods_url);


            if (response?.data?.img_pathes.length > 1){
                setCurrentPage('forth');
                setPopupVisible(false);
            } else {
                setPopupMessage("분석이 불가능한 상품입니다.");
                setPopupVisible(true);
                setTimeout(()=>{
                    handlePopupClose();
                }, 2000);
            }
            
        } catch (error) {
            console.log('error', error);
        }
    };

    const returnThirdPage = () => {
        // console.log('returnThirdPage');
        setCurrentPage('third');
    };


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        
        if(inputValue){
            setPopupMessage("상품을 검색 중입니다.");
            setPopupVisible(true);
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
            
            setPopupVisible(false);
            goToSecondPage();
        } else {
            setPopupMessage("검색할 상품을 입력하세요");
            setPopupVisible(true);
            setTimeout(()=>{
                handlePopupClose();
            }, 1000);            
        }

    };

    const handlePopupClose = () => {
        // console.log('popup close');
        setPopupVisible(false);
    };

    const homettsstart =`
        환영합니다. ${getCookie("usercookienickname")} 님!
        현재페이지는 메인페이지입니다.
        메인페이지 이동은 스페이스바와 큐키를 입력하세요.
        찜목록페이지는 스페이스바와 더블유키를 입력하세요.
        회원정보수정은 스페이스바와 영문이를 입력하세요.
        고객센터는 스페이스바와 알을 입력하세요.
    `;
    return (
        <div>
            {starttts && <TextToSpeech value={homettsstart} />} 
            {currentPage === 'first' && (<FirstPage inputValue={inputValue} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} popupOn={popupVisible} popupOff={handlePopupClose} message={popupMessage}/>)}
            {currentPage === 'second' && <SecondPage inputValue={inputValue} goToThirdPage={goToThirdPage} result={result} popupOn={popupVisible} popupOff = {handlePopupClose} message={popupMessage}/>}
            {currentPage === 'third' && <ThirdPage goToForthPage={goToForthPage} result={res} popupOn = {popupVisible} popupOff = {handlePopupClose} message={popupMessage}/>}
            {currentPage === 'forth' && <ForthPage goToThirdPage={returnThirdPage} res={res} result={result} goods_url={inputUrl} popupOn = {popupVisible} popupOff = {handlePopupClose} message={popupMessage}/>}
        </div>
    );
};

const FirstPage = ({ inputValue, handleInputChange, handleButtonClick, popupOn, popupOff, message }) => {
    const [serchtts, setserchtts] = useState(false);
       // 오디오중지
    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    // 핫키 생성
    const Hotkey_h1 = () => {
        // 핫키 설정
        const keyMap_h1 = {
            ctrlshift_key: 'ctrl+shift',
            searchtts: 'shift+q',
            stoptts: 'shift+d',
        };

        const inputClick = () => {
            console.log('ctrl + shift');
            document.getElementById('search_input').focus();
        };

        const searchttsClick = () => {
            console.log("searchfirst")
            setserchtts(true)
        }

        const stopttsClick = () => {
            console.log("stopfirst")
            setserchtts(false)
            handleAudio()
        }
        // 핫키 적용 함수
        const handlers_h1 = {
            ctrlshift_key: inputClick,
            searchtts: searchttsClick,
            stoptts: stopttsClick
        };
        return (
            <>
                <GlobalHotKeys keyMap={keyMap_h1} handlers={handlers_h1}></GlobalHotKeys>
            </>
        );
    };

    const isInputEmpty = inputValue.trim() === '';

    const searchtts = `
        검색기능입니다. 원하시는 상품명을 검색하여주세요.
        현재 작성하는 내용은 ${inputValue ==''? "빈칸" : inputValue} 로 입력하였습니다.
    `

    return (
        <div className={styles.home_container}>
            <Hotkey_h1 />
            {serchtts && <TextToSpeech value={searchtts} />} 
            <div className={styles.homebox1}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.homebox11}>상품 검색</div>
            </div>
            <div className={styles.home_search_box1}>
                <input className={styles.home_overlay_main} id="search_input" placeholder="입력해주세요" value={inputValue} onChange={handleInputChange} />
                <button className={styles.home_button1} onClick={handleButtonClick} disabled={isInputEmpty} alt="상세검색으로 이동하는 버튼"></button>
            </div>
            <div className={styles.home1_subbox}></div>
            {popupOn && (<Popup onClose={popupOff} message={message} />)}
        </div>
    );
};

const SecondPage = ({ inputValue, goToThirdPage, result, popupOn, popupOff, message }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const [secondtts, setsecondtts] = useState(false);

    const handleItemClick = (category) => {
        // console.log('handleItemClick', category);
        if (selectedItems.includes(category)) {
            setSelectedItems((prevItems) => prevItems.filter((item) => item !== category));
        } else {
            setSelectedItems((prevItems) => [...prevItems, category]);
        }
    };

    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    // 핫키 생성
    const Hotkey_h2 = () => {
        // 핫키 설정
        const keyMap_h2 = {
            enter_key: 'space+1',
            secondtts: 'shift+q',
            stoptts: 'shift+d',
        };
        const nextClick = () => {
            document.getElementById('next').focus();
        };

        const stop_tts = () => {
            setsecondtts(false)
            handleAudio();
        }

        const secondttsClick = () => {
            setsecondtts(true)
        }
        // 핫키 적용 함수
        const handlers_h2 = {
            enter_key: nextClick,
            secondtts: secondttsClick,
            stoptts: stop_tts,
        };
        return (
            <>
                <GlobalHotKeys keyMap={keyMap_h2} handlers={handlers_h2}>
                </GlobalHotKeys>
            </>
        );
    };
    const ttssecondsearch = `
        아래의 카테고리가 있습니다. 탭을눌러 선택하여주세요.
        현재 선택한 카테고리들은 ${selectedItems ==''? "빈칸" : selectedItems} 입니다.
        검색을 원하시면 다음 버튼을 클릭하여주세요.
    `
    return (
        <>
            <Hotkey_h2 />
		    {secondtts && <TextToSpeech value={ttssecondsearch} />}
            <div className={styles.home_container2}>
                <div className={styles.home_search_contained}>
                    <div className={styles.home_search_box2} >
                        <div className={styles.home_img2} alt="웹 페이지 이미지" />
                        <div className={styles.home_search_box2_txt}>{inputValue}</div>
                    </div>
                </div>
                <div>
                    {/* <div className={styles.home_mainguide}>상세 검색을 위해 카테고리를 불러오겠습니다.</div> */}
                    <div className={styles.home_search_box3}>
                        <CategoryBoxes onItemSelect={handleItemClick} selectedItems={selectedItems} result={result} inputValue={inputValue}/>
                    </div>
                </div>
                <div>
                    <button className={styles.home_button2} id="goNext" onClick={() => goToThirdPage(selectedItems)} alt="상품추천으로 이동하는 버튼">
                        <div>다음</div>
                    </button>
                </div>
                {popupOn && (<Popup onClose={popupOff} message={message} />)}
            </div>
        </>
    )
};

// 추천 상품 목록 보여주기
const ThirdPage = ({goToForthPage, result, popupOn, popupOff, message}) => {
    // localStorage.clear(); //localStorage 안 데이터 전부 삭제
    // localStorage.setItem("imgData", JSON.stringify(imgData));
    console.log(result)
    const [thrdtts, setthrdtts] = useState(false);

    const handleAudio = () => {
        const audioElement = document.querySelector("audio");
        audioElement.pause();
    };

    const Hotkey_h3 = () => {
        // 핫키 설정
        const keyMap_h3 = {
            secondtts: 'shift+q',
            stoptts: 'shift+d',
            itemfirst: 'space+1',
            itemsecond: 'space+2',
            itemthrd: 'space+3',
        };
        
        const stop_tts = () => {
            setthrdtts(false)
            handleAudio();
        }

        const thrdClick = () => {
            setthrdtts(true)
        }

        const firstitemClick = () => {
            console.log(result[0].link)
            goToForthPage(result[0].link)
        }
        
        const seconditemClick = () => {
            console.log(result[1].link)
            goToForthPage(result[1].link)
        }
        
        const thrditemClick = () => {
            console.log(result[2].link)
            goToForthPage(result[2].link)
        }

        // 핫키 적용 함수
        const handlers_h3 = {
            secondtts: thrdClick,
            stoptts: stop_tts,
            itemfirst: firstitemClick,
            itemsecond: seconditemClick,
            itemthrd: thrditemClick,
        };
        return (
            <>
                <GlobalHotKeys keyMap={keyMap_h3} handlers={handlers_h3}></GlobalHotKeys>
            </>
        );
    }


    let ttsthrdsearch = "3가지 상품을 추천드립니다."

    for( let i in result){
        ttsthrdsearch += `${i+1}번째 상품은 ${result[i].title} 입니다. 가격은 ${result[i].lprice} 원입니다.`
    }
    ttsthrdsearch += `상품 선택을 원하시면 스페이스바와 원하시는 상품의 번째를 동시에 눌러주십시오.`

    return(
        <div className={styles.home_container}>
            <Hotkey_h3 />
            {thrdtts && <TextToSpeech value={ttsthrdsearch} />}
            <div className={styles.homebox1}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.homebox11}>추천 상품</div>
            </div>
            <div className={styles.homebox2}>
                {result.map((item) => (
                    <div className={styles.goodsbox} onClick={() => { goToForthPage(item?.link) }}>
                        <div className={styles.goodsbox1} key={item.productId}>
                            {/* <img className={styles.goodsimage} src={"https://shop-phinf.pstatic.net/20221021_183/1666336371323nsBJM_JPEG/67472269985761665_608306589.jpg?type=m510"} alt="추천 상품 이미지1"/> */}
                            <img className={styles.goodsimage} src={item?.image} />
                        </div>
                        <div className={styles.goodsbox2}>
                            <label className={styles.goodsname}>
                                {item.title.replace(/<\/?b>/g, '').slice(0, 30)}
                            </label>
                            <label className={styles.goodsprice}>
                                {item.lprice}원
                            </label>
                            {/* <label className={styles.goodsscore}>
                                <strong>5점</strong> <StarRating score={3.5} />
                            </label> */}
                            <button className={styles.goodsurl}>
                                구매하기
                            </button>
                            {popupOn && (<Popup onClose={popupOff} message={message} />)}
                            {/* <button onClick={() => handleButtonClick("선택")}>
                                    <div>구매하기</div>
                                </button>
                                {popupVisible && (
                                <Popup onClose={handlePopupClose} message={popupMessage} />
                                )} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const imgData = [
    {
        image: 'assets/img/apple_info_sample.jpg',
        answer: '이미지1'
    },
    {
        image: 'assets/img/apple_info_sample0.jpg',
        answer: '이미지2'
    },
    {
        image: 'assets/img/apple_info_sample1.jpg',
        answer: '이미지3'
    },
    {
        image: 'assets/img/apple_info_sample2.jpg',
        answer: '이미지4'
    },
    {
        image: 'assets/img/apple_info_sample3.jpg',
        answer: '이미지5'
    },
    {
        image: 'assets/img/apple_info_sample4.jpg',
        answer: '이미지6'
    },
    {
        image: 'assets/img/apple1.jpg',
        answer: '이미지7'
    },
    {
        image: 'assets/img/Badger.jpg',
        answer: '이미지8'
    },
    {
        image: 'assets/img/LeGOAT.png',
        answer: '이미지9'
    },
];


// 모달창으로 띄워주기
const ForthPage = ({goToThirdPage, res, result, goods_url, popupOn, popupOff, message}) => {
    const [PopupState, setPopupState] = useState(true);

    function OnOffPopup() {
        if (PopupState === true) {
            setPopupState(false);
        }
        else {
            setPopupState(true);
        }
    };

    return (
        <div>
            {popupOn && (<Popup onClose={popupOff} message={message} />)}
            {/* {PopupState === true? */}
            <Slider goToPage = {goToThirdPage} setPopupState={setPopupState} goods_url={goods_url} result={result}/>
            
            {/* :<ThirdPage goToForthPage={goToThirdPage} result={res}></ThirdPage>} */}
        </div>
    )
};

const Popup = ({ onClose, message }) => {
    return (
        <div className={styles.popup1}>
            <div className={styles.popup1_txt}>{message}</div>
            <div className={styles.popup1_lgimg}></div>
        </div>
    );
};

// 별점시스템
const StarRating = ({ score }) => {
    const filledStars = Math.floor(score); // 꽉 채워진 별 개수
    const halfFilledStar = score - filledStars === 0.5; // 절반 채워진 별 여부

    const renderStars = () => {
        const stars = [];

        // 꽉 채워진 별 추가
        for (let i = 0; i < filledStars; i++) {
            stars.push(<div key={i} className={styles.goodsstar1} />);
            // console.log(1)
        }

        // 절반 채워진 별 추가
        if (halfFilledStar) {
            stars.push(<div key={filledStars} className={styles.goodsstar2} />);
            // console.log(0.5)
        }

        // 빈 별 추가
        const emptyStars = 5 - filledStars - (halfFilledStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<div key={filledStars + (halfFilledStar ? 1 : 0) + i} className={styles.goodsstar3} />);
            // console.log(0)
        }

        return stars;
    };

    return <label className={styles.goodsscore}>{renderStars()}</label>;
};

function CategoryBoxes({ result, onItemSelect, selectedItems }) {
    // 선택된 아이템들을 필터링하여 새로운 배열 생성
    const selectedItemsArray = result
        .map((item) => item.cate_lst.filter((category) => selectedItems.includes(category)))
        .flat();

    return (
        <div className={styles.catebox_body}>
            <div className={styles.selected_items_box}>
                {selectedItemsArray.map((item, index) => (
                    <div className={styles.selected_items_opt}>
                        <span key={index} onClick={() => onItemSelect(item)}><strong>{item}</strong> X</span>
                    </div>
                ))}
            </div>
            {result.map((item, index) => (
                // {detail_category.map((item, index) => (
                <div className={styles.catebox_box1} key={item.category}>
                    <div className={styles.catebox_index1}>사과의 {item.category}를 추천해주세요</div>
                    <div className={styles.catebox_index2}>
                        {/* <a>선택 안 함 </a> */}
                        {item.cate_lst.map((category, categoryIndex) => (
                            <a className={`${styles.catebox_index3} 
                                ${selectedItems.includes(category) ? styles.selected : styles.unselected}`}
                                key={categoryIndex} onClick={() => onItemSelect(category)} tabIndex={index}>
                                {category}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { Home };