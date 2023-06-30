import { useState, useRef, useEffect, forwardRef } from "react";
import styles from "../styles/Slider.module.css";

const WantedImg = [
  "assets/img/apple_info_sample.jpg",
  "assets/img/apple_info_sample0.jpg",
  "assets/img/apple_info_sample1.jpg",
  "assets/img/apple_info_sample2.jpg",
  "assets/img/apple_info_sample3.jpg",
  "assets/img/apple_info_sample4.jpg",
  "assets/img/apple1.jpg",
  "assets/img/Badger.jpg",
  "assets/img/LeGOAT.png",
];

const wantedTitle = [
  "오전 9시 이전 주문건 당일배송",
  "2022 한국 소비자 산업평가 사과 부문 우수상 수상!",
  "사과내부의 당분이 한곳에 모여 꿀처럼 보이는 '밀병'",
  "상품 수령하신 후 냉장보관 후에 드셔야 더욱 맛있습니다.",
  "홈골농원의 사과는 산딸기, 송이버섯 등 천연 식품이 자라는 자연환경에서 재배되고 있습니다.",
  "기스 사과 예시",
  "apple",
  "오소리",
  "농농",
];

const wantedDes = [
  "수령하신 상품에 문제가 있을 경우 100% 해결해드립니다.",
  "한국 소비자 산업평가 식품 분야 우수업체 홈골농원",
  "사과내부 꿀이 없다는 사유로 반품이 불가합니다.",
  "사과에 문제가 있을 경우 010-5080-6716 번호로 사진 전송",
  "일교차가 커 과육과 당도가 뛰어난 사과!",
  "사과 내부 꿀이 없는 것은 기스에 해당하지 않습니다.",
  "사과",
  "발자국",
  "구구",
];
// 0은 필수옵션 셀렉트, 1은 선택옵션 셀렉트, 2는 직접 입력할 수 있는 옵션 3은 수량 +-하는것 

const select_boxes = {
  0: {
    index: 0,
    placeholder: '텀블러 사이즈&종류 선택하세요',
    options: ['솔리드 핸들 텀블러', '파스텔 고급 텀블러(차량겸용)', '슬림 차량겸용 텀블러 500ml']
  },
  1: {
    index: 1,
    placeholder: '컬러 선택하세요',
    options: [ '아보카도 그린(손잡이 + 빨대+개별박스포장) (+5000원)', '파스텔실버(손잡이 + 빨대+개별박스포장) (+5000원)', '파스텔블랙(손잡이 + 빨대+개별박스포장) (+5000원)' ]
  },
  2: {
    index: 2, placeholder: '각인서비스를원하신다면 20자이내로 입력해주세요', options: [ '' ]
  },
  3: { index: 3, placeholder: '옵션 수량 선택', options: ['' ]
  }
};

// const btnNum = [
//     "assets/img/leftBtn.jpg",
//     "assets/img/rightBtn.jpg"
// ]

const Slider = forwardRef((props, ref) =>{

  //슬라이드
  const slideRef = useRef(null);
  const [index, setIndex] = useState(0); // 인덱스를 만들어줍니다.
  const [isSlide, setIsSlide] = useState(false); // 슬라이드 중인지 체크해줍니다. 슬라이드 중에 여러번 빠르게 클릭 못하게 하는 역할
  const [x, setX] = useState(0); // css에서 슬라이드 애니메이션 효과를 주기위해 x만큼 이동시키는 역할입니다.

  //드래그로 슬라이드 넘기기
  const [isClick, setIsClick] = useState(false); // 드래그를 시작하는지 체크해줍니다.
  const [mouseDownClientX, setMouseDownClientX] = useState(0); // 마우스를 클릭한 지점의 x 좌료를 저장합니다
  const [mouseUpClientX, setMouseUpClientX] = useState(0); // 마우스를 땐 지점의 x 좌표를 저장합니다.

  //반응형 사이트
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 사용자의 화면크기 정보를 받아 반응형 사이트에 사용합니다.
  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
    }
  })

  // 브라우저 크기 감지
  useEffect(() => {
    window.addEventListener("resize", resizeWidth);
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  // 슬라이더 자동 전환 
  useEffect(() => {
    const autoPage = setTimeout(() => {
      setX(-5);
      setIsSlide(true);
      setTimeout(() => {
        setIndex((prev) => (prev === 8 ? 0 : prev + 1));
        setX(0);
        setIsSlide(false);
      }, 300);
    }, 5000);
    return () => {
      clearTimeout(autoPage);
    };
  }, [index, isClick]);
  console.log(`브라우저 사이즈 : ${windowWidth}`);


  const handleClickOutside=(event)=>{
    if(wrapperRef && !wrapperRef.current.contains(event.target)){
        props.setPopupState(false);
    }
  }

  const increaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(-5);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 8 ? 0 : prev + 1));
      setX(0);
      setIsSlide(false);
    }, 300);
    //setIndex((prev) => (prev === 7 ? 0 : prev + 1));
  };
  const decreaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(+5);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 0 ? 8 : prev - 1));
      setX(0);
      setIsSlide(false);
    }, 300);
  };

  const onMouseDown = (event) => {
    setIsClick(true);
    setMouseDownClientX(event.pageX);
    console.log(slideRef);
  };
  const onMouseLeave = (event) => {
    setIsClick(false);
  };
  const onMouseUp = (event) => {
    setIsClick(false);
    const imgX = mouseDownClientX - mouseUpClientX;
    // console.log(imgX);
    if (imgX < -100) {
      slideRef.current.style.transform = `translateX(${imgX}px)`;
      increaseClick();
    } else if (imgX > 100) {
      slideRef.current.style.transform = `translateX(${imgX}px)`;
      decreaseClick();
    }
  };
  const onMouseMove = (event) => {
    if (!isClick) return;
    event.preventDefault();
    setMouseUpClientX(event.pageX);
    const imgX = mouseDownClientX - mouseUpClientX;
    if (Math.abs(imgX) > 100) {
      // slideRef.current.style.transform = `translateX(${imgX}px)`;
    }
  };
  const resizeWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // 카운트 증가 감소
  const [count, setCount] = useState(0);

  const decreaseCount = () => {
    if(count > 0) {
      setCount(count-1);
    }
  };

  const increaseCount = () => {
    setCount(count+1)
  };


  function BtnEvent(){
    //alert('모달창 내부 작업을 해도 모달창이 꺼지지 않습니다.');
    props.setPopupState(false);
  }

  function OptionSelect({ value, onChange }) {
    return (
      <select value={value} onChange={onChange}>
        <option value="apple">사과</option>
        <option value="banana">바나나</option>
        <option value="pear">배</option>
      </select>
    );
  }


  //팝업 열고 닫기
  let wrapperRef = useRef();

  return (
    <div className={styles.resultpopup} ref={wrapperRef}>

      <span className={styles.popuptxt}>이미지 안내</span>
{/*메인 슬라이드 */}
      <session className={`${styles.box} ${styles.box1}`}>

        <img className={styles.slide1} src={WantedImg[index]} />
        <button className={styles.button_left} onClick={decreaseClick} />
        <button className={styles.button_right} onClick={increaseClick} />
      </session>

 {/* 서브 슬라이드 */}
      <session className={`${styles.box} ${styles.box2}`}>
        {/* 서브 슬라이드 */}
        <div className={styles.row}
          key={index}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          ref={slideRef}
          style={{transform: `translateX(${x}vw)`,}}>

          {/*컨테이너 오른쪽 이미지*/}
          {[3, 2, 1].map((cnt) => (
                <nav className={styles.box2container} key={cnt}>
                  <img className={`${styles.img} ${styles.previewimg}`}
                    style={{ opacity: 0.5, width: windowWidth > 1200 ? null : `80vw`, height: windowWidth > 1200 ? null : windowWidth < 770 ? "185px" : "250px", }}
                    src={WantedImg[(index-cnt >= 0)?index-cnt: 9-cnt+index]}
                  />
                </nav>
              ))}
          {/* 보여주려는 이미지 */}
          <nav className={styles.imgwrapper}>
              <img className={styles.img}
                style={{ opacity: 1, width: windowWidth > 1200 ? null : `80vw`, height: windowWidth > 1200 ? null : windowWidth < 770 ? "185px" : "250px", }}
                src={WantedImg[index]}
              />
          </nav>
          {/*컨테이너 왼쪽 이미지*/}
          {[1, 2, 3].map((cnt) => (
                <nav className={styles.box2container} key={cnt}>
                  <img className={`${styles.img} ${styles.previewimg}`}
                    style={{ opacity: 0.5, width: windowWidth > 1200 ? null : `80vw`, height: windowWidth > 1200 ? null : windowWidth < 770 ? "185px" : "250px", }}
                    src={WantedImg[(index+cnt <= 8)?index+cnt:cnt+index-9]}
                  />
                </nav>
              ))}
        </div>
      </session>

      <span className={styles.popuptxt}>Summary</span>
      
{/*대체텍스트 요약 */}
      <session className={`${styles.box} ${styles.box3}`}>
            <span className={styles.minititle}>{wantedTitle[index]}</span>
            <span className={styles.minides}>{wantedDes[index]}</span>
      </session>

      <span className={styles.popuptxt}>Option</span>

{/* 옵션과 수량 */}
      <session className={`${styles.box} ${styles.box4}`}>      
        <div className={styles.box4_idx0}>
          <span className={styles.box4_txt}>필수옵션</span>
          <select className={styles.box4_select}>
            <option value = "금사과">금사과</option>
            <option value = "은사과">은사과</option>
            <option value = "동사과">동사과</option>
          </select>
        </div>
        <div className={styles.box4_idx1}>
          <span className={styles.box4_txt}>선택옵션</span>
          <select className={styles.box4_select}>
            <option value = "연유추가">연유추가</option>
            <option value = "팥고물도 추가">팥고물도 추가</option>
            <option value = "다 다 추가">다 다 추가</option>
          </select>
        </div>
        <div className={styles.box4_idx2}>
          <span className={styles.box4_txt}>입력옵션</span>
          <textarea className={styles.box4_txtarea}>
          </textarea>
        </div>
        <div className={styles.box4_idx3}>
          <span className={styles.box4_txt}>수량</span>
          <div className={styles.box4_count}>
            <button className={styles.box4_countleft} onClick={decreaseCount} ></button>
            <span>{count}</span>
            <button className={styles.box4_countright} onClick={increaseCount} ></button>
          </div>
        </div>
      </session>

{/* 버튼들 */}
      <session className={`${styles.box} ${styles.box5}`}>
        <button className={styles.button} onClick={BtnEvent}> 구매하기 </button>
        <button className={styles.button} onClick={BtnEvent}> 닫기 </button>
        <button className={styles.button} onClick={BtnEvent}> 찜하기 </button>
      </session>
    </div>
  );
});

export default Slider;

//Slider.js
