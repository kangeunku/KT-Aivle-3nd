import React, { useState, useEffect } from "react";
import styles from "./Faq.module.css";

// const Support = () => {
//     const [num, setNumber] = useState(0);

//     const btn_one = () => {
//         setNumber(num + 1);
//     }
//     const btn_two = () => {
//         setNumber(num - 1);
//     }

//     return (
//         <div>
//             <button onClick={btn_one}> + 1 </button>
//             <button onClick={btn_two}> - 1 </button>
//             <p>{num}</p>
//         </div>
//     )
// }

const faqData = [
    { index: 0, subject: '환불이 안돼요', answer: '환불에 대한\n자세한 안내입니다.' },
    { index: 1, subject: '상품 교환 가능한가요?', answer: '상품 교환에 대한 안내입니다.' },
    { index: 2, subject: '비밀번호를 잊어버렸어요', answer: '비밀번호 초기화에 대한 안내입니다.' },
    { index: 3, subject: '배송은 어떻게 진행되나요?', answer: '배송 관련 안내입니다.' },
];

const categories = ['주문/결제', '교환/환불', '시스템', '기타'];

const myfaqData = [
    { index: 0, subject: '강호준 바보', question: '강호준 시리즈 006 언제나오나요\n지금 48시간째 신시리즈가 안나오고있습니다', answer: '모델의 심신미약으로 촬영이 지체되고 있습니다' },
    { index: 3, subject: '부장님 야근 그만하고싶어요ㅠㅅㅠ',  question: '이 노래는 교수님이 쓰라 해서\n 쓰는 노래 솔직히 대충 만들었네\n 다음 주엔 인간적인 양의 과제를\n 받았음 해 그랬음 해 어', answer: '부장님 오늘 휴가입니다' },
    { index: 3, subject: '취업시켜주세요',  question: '제곧내', answer:'' },
];

const Support = () => {
    const [currentPage, setCurrentPage] = useState('first');
    
    const goToSecondPage = async () => {
        setCurrentPage('second');
    };

    const goToThirdPage = async () => {
        setCurrentPage('third');
    };
    
    return(
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} />}
        {currentPage === 'second' && <SecondPage goToThirdPage={goToThirdPage} />}
        {currentPage === 'third' && <ThirdPage />}
        </div>
    );
};
    
const FirstPage = ({goToSecondPage}) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const handleQuestionClick = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.faq_container1}>
            <div className={styles.faq_main1}>
                <div className={styles.foot} alt="오소리그림"></div>
                <p>1대1 문의하기</p>
            </div>
            <div className={styles.faq_box}>
                <div className={styles.faq_container}>
                    {faqData.map((faq, index) => (
                        <div className={styles.faq_container_box} key={index}>
                            <div className={styles.faq_container_title} onClick={() => handleQuestionClick(index)}>
                                <strong>[{categories[faq.index]}]</strong> {faq.subject}
                                {activeIndex === index ? (
                                    <div className={styles.faq_upbutton} alt="내리기"/>
                                ) : (
                                    <div className={styles.faq_downbutton} alt="이미지 설명"/>
                                )}
                            </div>
                            <hr className={styles.faq_container_hr} />
                            {activeIndex === index && (
                                <div className={styles.faq_container_image}>
                                    <div className={styles.faq_answer}>
                                        {faq.answer.split('\n').map((line, lineIndex) => (
                                            <div key={lineIndex}>{line}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button className={styles.button_faq} onClick={goToSecondPage}>
                    <div>문의하기</div>
                </button>
            </div>
        </div>
    );
};
    
const SecondPage = ({goToThirdPage}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleQuestionClick = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.faq_container1}>
            <div className={styles.faq_main1}>
                <div className={styles.foot} alt="오소리그림"></div>
                <p>내 문의 내역</p>
            </div>
            <div className={styles.faq_box}>
                <div className={styles.faq_container}>
                    {myfaqData.length === 0 ? (
                        <div className={styles.faq_container_title}>내 문의 내역이 없습니다.</div>
                    ) : (
                        myfaqData.map((faq, index) => (
                            <div className={styles.faq_container_box} key={index}>
                                <div className={styles.faq_container_title} onClick={() => handleQuestionClick(index)}>
                                    [{categories[faq.index]}] {faq.subject}
                                    {faq.answer ? (
                                        <div>
                                            <span className={styles.myfaq_ans}> [답변 완료] </span>
                                            {activeIndex === index ? (
                                                <div className={styles.faq_upbutton} alt="내리기"/>
                                            ) : (
                                                <div className={styles.faq_downbutton} alt="이미지 설명"/>
                                            )}
                                        </div>
                                    ): null}
                                </div>
                                <hr className={styles.faq_container_hr} />
                                {faq.answer ? (
                                    <div>
                                        {activeIndex === index && (
                                            <div className={styles.faq_container_image}>
                                                <div className={styles.faq_answer}>
                                                    <strong>Q.</strong> {faq.question.split('\n').map((line, lineIndex) => (
                                                        <div key={lineIndex}>{line}</div>
                                                    ))}
                                                    <strong>A.</strong> {faq.answer.split('\n').map((line, lineIndex) => (
                                                        <div key={lineIndex}>{line}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ): null}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div>
                <button className={styles.button_faq} onClick={goToThirdPage}>
                    <div>문의 작성하기</div>
                </button>
            </div>
        </div>
    );
};

const ThirdPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [jsonData, setJsonData] = useState(null);
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
      
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
      
    const handleSaveData = () => {
        const data = {
            title: title,
            content: content,
            category: category,
        };
        setJsonData(JSON.stringify(data));
    };
      

    return (
        <div className={styles.faq_container3}>
            <div className={styles.faq_main1}>
                <div className={styles.foot} alt="오소리그림"></div>
                <p>내 문의 내역</p>
                <></>
            </div>
            <div className={styles.faq3_container}>
                <div className={styles.faq3_row1}>
                    <div className={styles.faq3_c1}>상세 항목 입력</div>
                </div>
                <div className={styles.faq3_row2}>
                    <div className={styles.faq_row11}>문의 유형</div>
                    <select className={styles.faq_selectbox}
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="" disabled hidden>
                            문의 유형
                        </option>
                        {categories.map((category, index) => (
                            <option className={styles.faq_selectbox} key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.faq3_row3}>
                    <div className={styles.faq_row11}>제목</div>
                    <input className={styles.faq_row12}
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력하세요"
                    />
                </div>
                <div className={styles.faq3_row4}>
                    <div className={styles.faq_row11}>내용</div>
                    <input className={styles.faq_row12}
                        type="content"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="내용을 입력하세요"
                    />
                </div>
                <div className={styles.faq3_row5}>
                    <div className={styles.faq_row11}>파일 첨부</div>
                </div>
                <button className={styles.button_faq} onClick={handleSaveData}>등록하기</button>
                {jsonData} && <div>저장된 데이터: {jsonData}</div>
            </div>
        </div>
    );
};

export { Support };
