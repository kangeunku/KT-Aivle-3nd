import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/Faq.module.css";
// import { RequestTTS } from "../../components/common/google_tts";
// import { TextToSpeech } from "../../components/common/google_tts";
import axios from "axios";

const faqData = [
    { index: 0, 
        subject: '이 사이트는 무엇을 제공하나요?', 
        answer: '이 사이트는 시각장애인을 위해 이미지에 있는 텍스트 정보를 요약하여 제공합니다. 이를 통해 시각장애인 사용자는 온라인 쇼핑에서 이미지에 있는 정보를 더 쉽게 알아볼 수 있습니다.' },
    { index: 0, 
        subject: '어떻게 이 사이트를 사용하나요?', 
        answer: '이 사이트를 사용하려면, 키보드의 지정된 키를 누르거나, 안내에 따라 음성으로 명령을 입력할 수 있습니다. 모든 서비스의 처음으로 가려면 키보드의 ESC 키를 눌러주세요. 이 밖에 문의 사항은 고객센터의 1 대 1 문의를 이용해 주세요.' },
    { index: 2, 
        subject: '이미지에 있는 텍스트를 어떻게 요약하나요?', 
        answer: '사이트는 이미지 처리 기술과 자연어 처리 기술을 결합하여 이미지에 있는 텍스트를 인식하고 요약합니다. 이를 통해 중요한 정보를 간결하게 전달합니다.' },
    { index: 2, 
        subject: '요약된 텍스트를 어떻게 확인하나요?', 
        answer: '요약된 텍스트는 화면에 표시되며, 시각장애인 사용자를 위해 음성으로도 제공됩니다. 해당 화면 안의 찜하기 버튼을 통해서 해당 상품 정보를 보관할 수 있습니다.' },
    { index: 2, 
        subject: '내 개인정보는 안전하게 보호되나요?', 
        answer: '네, 이 사이트는 개인정보 보호에 최선을 다하고 있습니다. ' },
    { index: 3, 
        subject: '이 사이트를 무료로 사용할 수 있나요?', 
        answer: '네, 이 사이트는 무료로 사용할 수 있습니다. 단, 상품에 대한 결제는 이 사이트에서 진행되지 않습니다.' },
];

const categories = ['주문/결제', '교환/환불', '시스템', '기타'];

const myfaqData = [
    { index: 0, subject: '강호준 바보', question: '강호준 시리즈 006 언제나오나요\n지금 48시간째 신시리즈가 안나오고있습니다', answer: '모델의 심신미약으로 촬영이 지체되고 있습니다' },
    { index: 3, subject: '부장님 야근 그만하고싶어요ㅠㅅㅠ',  question: '이 노래는 교수님이 쓰라 해서\n 쓰는 노래 솔직히 대충 만들었네\n 다음 주엔 인간적인 양의 과제를\n 받았음 해 그랬음 해 어', answer: '부장님 오늘 휴가입니다' },
    { index: 3, subject: '취업시켜주세요',  question: '제곧내', answer:'' },
];

const Support = (props) => {
    const [currentPage, setCurrentPage] = useState('first');
    const [ result, setResult ] = useState([]);

     // 동일한 링크를 클릭시 처음화면으로 초기화
     useEffect(() => {
        setCurrentPage('first')
    }, [props.state]);
    
    const goToSecondPage = async () => {
        try {
            const url = "http://127.0.0.1:8000/v1/qna/";

            const response = await axios.get(url, {withCredentials:true});
            setResult(response.data);
            setCurrentPage('second');
        } catch (error) {
            console.log(error);
        }
        
    };

    const goToThirdPage = async () => {
        setCurrentPage('third');
    };
    
    return(
        <div>
        {currentPage === 'first' && <FirstPage goToSecondPage={goToSecondPage} />}
        {currentPage === 'second' && <SecondPage goToThirdPage={goToThirdPage} result={result}/>}
        {currentPage === 'third' && <ThirdPage goToSecondPage={goToSecondPage}/>}
        </div>
    );
};

const FirstPage = ({goToSecondPage}) => {
    const [ activeIndex, setActiveIndex ] = useState(null);
    // const [ audioSource, setAudioSource ] = useState();
    const [ text, setText ] = useState('');
    
    const handleQuestionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        setText(faqData[index].answer);
    };

    // const handleTextToSpeechonComplete = useCallback((result) => {
    //     setAudioSource(result);
    // }, []);

    return (
        <div className={styles.faq_container1}>
            <div className={styles.faq_main1}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.faqbox11}>자주 묻는 질문</div>
            </div>
            <div className={styles.faq_box}>
                <div className={styles.faq_container}>
                    {faqData.map((faq, index) => (
                        <div key={index}>
                            <div className={styles.faq_container_box} key={index}>
                                <div className={styles.faq_container_title} onClick={() => {handleQuestionClick(index)}}>
                                    <strong>[{categories[faq.index]}]</strong> {faq.subject}
                                    {activeIndex === index ? (
                                        <div className={styles.faq_upbutton} alt="내리기"/>
                                    ) : (
                                        <div className={styles.faq_downbutton} alt="이미지 설명"></div>
                                    )}
                                </div>
                                
                                {activeIndex === index && (
                                    <div className={styles.faq_container_image}>
                                        <hr className={styles.faq_container_hr} />
                                        <div className={styles.faq_answer}>
                                            {faq.answer.split('\n').map((line, lineIndex) => (
                                                <div key={lineIndex}>
                                                    {line}
                                                    {/* <TextToSpeech value={faq.answer} onComplete={handleTextToSpeechonComplete}/>    */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr className={styles.faq_container_hr2} />
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
    
const SecondPage = ({goToThirdPage, result}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    
    const handleQuestionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAnswerClick = async () => {
        try {
            const url = "http://127.0.0.1:8000/v1/qna/";
            const data = {
                "qna_no": activeIndex.qna_no,
                "answer": "답변은 당신 마음 속에"
            }
            const response = await axios.put(url, data, {withCredentials:true});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.faq_container1}>
            <div className={styles.faq_main1}>
                <div className={styles.page2logo2} onClick={handleAnswerClick}></div>
                <div className={styles.faqbox11}>내 문의 내역</div>
            </div>
            <div className={styles.faq_box}>
                <div className={styles.faq_container}>
                    {result.length === 0 ? (
                        <div className={styles.faq_container_title}>내 문의 내역이 없습니다.</div>
                    ) : (
                        result.map((index) => (
                            <div key={index.qna_no}>
                                <div className={styles.faq_container_box} key={index}>
                                    <div className={styles.faq_container_title} onClick={() => handleQuestionClick(index)}>
                                        [{index.type.replace(/"/g, '')}] {index.subject.replace(/"/g, '')}
                                        {index.answer ? (
                                            <div>
                                                <span className={styles.myfaq_ans}> [답변 완료] </span>
                                                {activeIndex === index ? (
                                                    <div className={styles.faq_upbutton} alt="내리기"/>
                                                ) : (
                                                    <div className={styles.faq_downbutton} alt="이미지 설명"/>
                                                )}
                                            </div>
                                        ): (<div>
                                                <span className={styles.myfaq_noans}> [답변 미완료] </span>
                                            </div>)}
                                    </div>
                                    {index.answer ? (
                                        <div>
                                            {activeIndex === index && (
                                                <div className={styles.faq_container_image}>
                                                    <hr className={styles.faq_container_hr1}></hr>
                                                    <div className={styles.faq_answer}>
                                                        <strong>Q.</strong> {index.question.replace(/"/g, '').split('\n').map((line, lineIndex) => (
                                                            <div key={lineIndex}>{line}</div>
                                                        ))}
                                                        <strong>A.</strong> {index.answer.replace(/"/g, '').split('\n').map((line, lineIndex) => (
                                                            <div key={lineIndex}>{line}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ): null}
                                </div>
                                <hr className={styles.faq_container_hr2} />
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
            <div>
            </div>
        </div>
    );
};

const ThirdPage = ({goToSecondPage}) => {
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
    
    const handleSaveData = async () => {
        if (title.length !== 0 && content.length !== 0 && categories.length !== 0) {
            try {
                const url = 'http://127.0.0.1:8000/v1/qna/';
                const data = {
                    "type": '"' + category + '"',
                    "subject": '"' + title + '"',
                    "question": '"' + content + '"',
                    // "img_url": null,
                };
                // setJsonData(JSON.stringify(data));
        
                const response = await axios.post(url, data, {withCredentials: true});

                goToSecondPage();
            } catch (error) {
                console.log(error);
            }
        } else {
            // popup
        }
    };    

    return (
        <div className={styles.faq_container3}>
            <div className={styles.faq_main1}>
                <div className={styles.page2logo2} ></div>
                <div className={styles.faqbox11}>문의하기</div>
            </div>
            <div className={styles.faq3_container}>
                {/* <div className={styles.faq3_row1}>
                    <div className={styles.faq3_c1}>상세 항목 입력</div>
                </div> */}
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
