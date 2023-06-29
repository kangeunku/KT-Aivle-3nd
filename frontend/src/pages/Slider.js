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
  const morePrevImg3 = index === 1 ? 6 : index === 0 ? 5 : index === 2 ? 7 : index === 3?8 :index - 4;
  const morePrevImg2 = index === 1 ? 7 : index === 0 ? 6 : index === 2 ? 8 : index - 3;
  const morePrevImg = index === 1 ? 8 : index === 0 ? 7 : index - 2;
  const PrevImg = index === 0 ? 8 : index - 1;
  const NextImg = index === 8 ? 0 : index + 1;
  const NextImg2 = index === 8 ? 1 : index === 7 ? 0 : index + 2;
  const NextImg3 = index === 8 ? 2 : index === 7 ? 1 : index === 6 ? 0 :index + 3;
  const NextImg4 = index === 8 ? 3 : index === 7 ? 2 : index === 6 ? 1 : index ===5?0 : index + 4;
  
  //console.log(slideRef.current);
  //console.log(index);

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

  function BtnEvent(){
    //alert('모달창 내부 작업을 해도 모달창이 꺼지지 않습니다.');
    props.setPopupState(false);
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
      <session className={`${styles.box} ${styles.box4}`}>
        {/* 다른 추천상품 */}
      </session>
    </div>
  );
});

export default Slider;

//Slider.js
