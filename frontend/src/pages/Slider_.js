import { useState, useRef, useEffect, forwardRef } from "react";
import styled from "styled-components";

const Resultpopup = styled.div`
    position: relative; 
    margin:auto; 
    background-color: 
    rgba(255,255,255,0.95); 
    padding: 50px; 
    width: 80%; 
    height: 80%; 
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25); 
    border-radius: 20px; 
    animation: showup 0.3s ease forwards; 
    min-width: 800px; 
    min-height: 400px; 
    opacity: 0; 
    text-align: center; 
    line-height: 160%; 
    color: #262626;
`;

const Wrapper = styled.div`
  margin: 22px 0px;
  display: flex;
  overflow-x: hidden;
  align-items: center;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 1);
  border-radius: 7px;
  display: flex;
  align-items: center;
  margin: 0 12.5px;
  cursor: pointer;
  position: relative;
`;

//preview img 전용
const Container1 = styled.div`
  background-color: rgba(0, 0, 0, 1);
  border-radius: 0px;
  display: flex;
  align-items: center;
  margin-top:15px;
  margin-right:7px;
  cursor: pointer;
  position: relative;
`;

const Row = styled.div`
  width: 80vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  height: 400px;
`;

const Img = styled.img`
  margin: 0;
  margin: 0 20px;
  margin-left:0vw;
  position: relative;
  cursor: pointer;
  height:120px;
  width:85px;
  transition: all 0.5s linear;
  border:3px solid #eaeaea; 
  box-shadow:5px 5px 5px #c0c0c0;
`
//border : 테두리, box-shadow : 테두리 그림자
;

const PrivewImg = styled.img`
  transition: all 1s linear;
  height:90px;
  width:65px;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  justify-content: center;
  border: none;
  font-size: 12px;
  height: 100px;
  width: 100px;
  border-radius: 60px;
  padding: 25px 10px;
  opacity: 0.5;
  z-index: 2;
  border:5px solid black; 
`;

const LeftButton = styled(Button)`
  transition: all 0.5s ease-in-out;
  margin-top: 250px;
`;

const RightButton = styled(Button)`
  transition: all 0.5s ease-in-out;
  margin-top: 250px;
`;

const ImgWrapper = styled.div`
  position: relative;
`;
const ImgDes = styled.div`
  position: absolute;
  z-index: 5;
  width: 330px;
  height: 150px;
  border-radius: 5px;
  background-color: white;
  left: 30px;
  bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 27px 0px 20px 0px;
`;

const Title = styled.span`
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 14px;
`;
const Des = styled.span`
  padding-left: 20px;
  padding-bottom: 24px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LinkSpan = styled.span`
  padding-left: 20px;
  padding-top: 16px;
  color: #3366ff;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
`;

const summarydiv = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s ease-in-out;
  margin-top : 50px;
  margit-bottom: 50px;
  border:3px solid #eaeaea;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 1);
  width:300px;
  height:450px;
`;

const MiniPics = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    transition: all 0.1s ease-in-out;
    margin-top : 50px;
    margit-bottom: 50px;
    align-items: center;
    padding: 3px;
`;

const Justline = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    transition: all 0.1s ease-in-out;
    margin-top : 50px;
    margit-bottom: 50px;
    align-items: center;
    padding: 3px;
    width:850px;
    height:0.5px;
    background-color: rgba(0, 0, 0, 0.5);
    left:30%;
`;


const MicroPic = styled.img`
    display: inline;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 2px;
    margin-right: 2px;
    position: relative;
    height:650px;
    width:780px;
    transition: all 0.5s linear;
    border:3px solid #eaeaea; 
`;

//recommend box
const RecommendBox = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    transition: all 0.1s ease-in-out;
    margin-top : 50px;
    margit-bottom: 50px;
    align-items: center;
    padding: 3px;
    width:80vw;
    margin-left: 0vw;
    justify-content: center;
    border:3px solid #eaeaea; 

`;
//    border:3px solid #eaeaea; 




//inside recommend box
const GoodsBox = styled.div`
    display: flex;
    flex-direction:row;
    position: relative;
    width: 35vw;
    height: 300px;
    border:3px solid black;
    margin: 10px 10px;
`;

//recommend goods img
const GoodsImg = styled.img`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 2px;
    position: relative;
    height:96%;
    width:40%;
    transition: all 0.5s linear;
    border:3px solid #eaeaea; 
`;
//recommend goods info
const GoodsInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 2px;
    position: relative;
    height:96%;
    width:55%;
    transition: all 0.5s linear;
`;
//    border:3px solid #eaeaea;



//recommend Info1
const GoodsInfo1 = styled.textarea`
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 2px;
    position: relative;
    height:40%;
    width:95%;
    transition: all 0.5s linear;
    text-align: center;
    font-size: 45px;
    border: none;
`;
//    border:3px solid #eaeaea;

//option small box
const OptionBox = styled.div`
  display: flex;
  flex-direction:column;
  position: relative;
  width: 35vw;
  height: 100px;
  border:3px solid black;
  margin: 10px 10px;
`;



//summary
const MiniWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s ease-in-out;
  margin-top : 50px;
  margit-bottom: 50px;
  border:3px solid #eaeaea;
  border-radius: 20px;
  height: 200px;
  width: 600px;
  background-color: #B4E0A0;
  box-shadow:5px 5px 5px #c0c0c0;
  margin-left:-12vw;
`;

const MiniTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
`;

const MiniDes = styled.span`
  font-size: 14px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
`;

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
  "요약 제목 1",
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

const Slider = forwardRef((props, ref)  =>{
  
  //팝업 열고 닫기
  let wrapperRef = useRef();

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
    }
  })

  const handleClickOutside=(event)=>{
    if(wrapperRef && !wrapperRef.current.contains(event.target)){
        props.setPopupState(false);
    }
  }

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

  useEffect(() => {
    window.addEventListener("resize", resizeWidth);
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

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

  return (
    <Resultpopup ref={wrapperRef}>
    <><><><><><LeftButton
      style={{
        left: windowWidth > 1800
          ? `15.5%`
          : windowWidth > 1500
            ? `10%`
            : windowWidth > 1300
              ? `5%`
              : `5%`,
        visibility: windowWidth < 1335 ? "visible" : "visible",
      }}
      onClick={decreaseClick}
    >
      <i class="fas fa-chevron-left"></i>
    </LeftButton>
      <RightButton
        style={{
          right: windowWidth > 1800
            ? `15.5%`
            : windowWidth > 1500
              ? `10%`
              : windowWidth > 1200
                ? `5%`
                : `5%`,
          visibility: windowWidth < 1335 ? "visible" : "visible",
        }}
        onClick={increaseClick}
      >
        <i class="fas fa-chevron-right"></i>
      </RightButton>
      <><MiniPics>
        <MicroPic
          src={WantedImg[index]} />
      </MiniPics>

        <Wrapper>
          <Row
            key={index}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            ref={slideRef}
            style={{
              transform: `translateX(${x}vw)`,
            }}
          >
 {/* ==========================여기서부터 바꾼 부분 입니다 ==============================*/}
             {[3, 2, 1].map((cnt) => (
                <Container1 key={cnt}>
                  <PrivewImg
                    style={{
                      opacity: 0.5,
                      width: windowWidth > 1200 ? null : `80vw`,
                      height: windowWidth > 1200 ? null : windowWidth < 770 ? "185px" : "250px",
                    }}
                    src={WantedImg[(index-cnt >= 0)?index-cnt: 9-cnt+index]} 
                  />
                </Container1>
              ))}
            <ImgWrapper>
              <Img
                style={{
                  opacity: 1,
                  width: windowWidth > 1200 ? null : `80vw`,
                  height: windowWidth > 1200
                    ? null
                    : windowWidth < 770
                      ? "185px"
                      : "250px",
                }}
                src={WantedImg[index]} />


              {!isSlide && windowWidth > 1200 ? (
                <MiniWrapper>
                  <MiniTitle>{wantedTitle[index]}</MiniTitle>
                  <MiniDes>{wantedDes[index]}</MiniDes>
 
                </MiniWrapper>
              ) : null}
              {!isSlide && windowWidth <= 1200 ? (
                <MiniWrapper>
                  <MiniTitle>{wantedTitle[index]}</MiniTitle>
                  <MiniDes>{wantedDes[index]}</MiniDes>

                </MiniWrapper>
              ) : null}
            </ImgWrapper>
      
              {[1, 2, 3].map((cnt) => (
                <Container1 key={cnt}>
                  <PrivewImg
                    style={{
                      opacity: 0.5,
                      width: windowWidth > 1200 ? null : `80vw`,
                      height: windowWidth > 1200 ? null : windowWidth < 770 ? "185px" : "250px",
                    }}
                    src={WantedImg[(index+cnt <= 8)?index+cnt:cnt+index-9]}
                  />
                </Container1>
              ))}
{/* ============여기까지 바꾼 부분입니다 */}
          </Row>

        </Wrapper></></>

      <Wrapper
        style={{
          position: "absolute",
          overflow: "hidden",
          marginTop: 50,
          marginBottom: 100,
          marginLeft: "3%"
        }}
      >
        {/* <Justline>
        </Justline>
         */}
      </Wrapper></>
      <Wrapper>
        <RecommendBox
          style={{
            flexDirection:"column",
            borderRight:"1px",
            borderBottom:"1px"
          }}
        >
          <OptionBox
            style={{
              flexDirection: "row",
              border:"none",

            }}
          >
            <h1
              style={{
                fontSize: 25,
                marginTop:20,
                marginLeft:"20%"
              }}
            >
            옵션</h1>
            <select
              style={{
                height:40,
                marginTop: 10,
                marginLeft:300,
                width:70
              }}
            >
              <option value = "금사과">금사과</option>
              <option value = "은사과">은사과</option>
              <option value = "동사과">동사과</option>
            </select>
          </OptionBox>

          <OptionBox
            style={{
              flexDirection: "row",
              border:"none"
            }}
          >
            <h1
              style={{
                fontSize: 25,
                marginTop:20,
                marginLeft:"20%"
              }}
            >
            수량</h1>
            <select
              style={{
                height:40,
                marginTop: 10,
                marginLeft:300,
                width: 70,
                textAlign:"center"
              }}
            >
              <option value = "1">1</option>
              <option value = "2">2</option>
              <option value = "3">3</option>
            </select>
            {/* <div>
              <i class="e59e"></i>
            </div> */}
          </OptionBox>

          <OptionBox
            style={{
              flexDirection: "row",
              border:"none"
            }}
          >
            <h1
              style={{
                fontSize: 30,
                marginTop:20,
                marginLeft:"10%"
              }}
            >
            총 상품 가격</h1>
            <div>
              <i class="e59e"></i>
            </div>
          </OptionBox>

        </RecommendBox>
      </Wrapper></>

      
      <h1
          style={{
            marginTop: 50,
            textAlign:"center",
            fontSize: 40,
            fontweight: "bold"
          }}
        >
          추천상품</h1>
      <Wrapper
        style={{
            marginTop: -30
        }}
      >
        <RecommendBox>
          <GoodsBox>
            <GoodsImg
              src="assets/img/apple_.jpg"
            >
            </GoodsImg>
            <GoodsInfo>
              <GoodsInfo1
                style={{
                  overflow: "hiden",
                  fontWeight: "bold",
                }}
                placeholder="소리소리 오소리"
              >

              </GoodsInfo1>
              <GoodsInfo1
                style={{
                  overflow: "hiden",
                  fontSize: 25,
                }}
                placeholder="39.99$"
              >
              </GoodsInfo1>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: 20
                }}
              >
                <img
                  style={{
                    height: 20,
                    width: 20
                  }}
                  src="assets/img/star.jpg"
                ></img>
                &nbsp; 4.99</h1>
            </GoodsInfo>
          </GoodsBox>

          {/* <GoodsBox>
            <GoodsImg
              src="assets/img/apple_.jpg"
            >
            </GoodsImg>
            <GoodsInfo>
              <GoodsInfo1
                style={{
                  overflow: "hiden",
                  fontWeight: "bold",
                }}
                placeholder="소리소리 오소리"
              >

              </GoodsInfo1>
              <GoodsInfo1
                style={{
                  overflow: "hiden",
                  fontSize: 25,
                }}
                placeholder="39.99$"
              >
              </GoodsInfo1>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: 20
                }}
              >
                <img
                  style={{
                    height: 20,
                    width: 20
                  }}
                  src="assets/img/star.jpg"
                ></img>
                &nbsp; 4.99</h1>
            </GoodsInfo>
          </GoodsBox> */}

        </RecommendBox>
      </Wrapper></>
      <Wrapper
        style={{
          marginTop:50,
          marginBottom:150,
          marginLeft:-90
        }}>
        {/* <Justline>
        </Justline> */}
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              //border:"3px solid #285a43",
              margin:"auto"

            }}>
            <button 
            style ={{
              display:"block",
              margin:"auto",
              marginTop:"10px",
              marginBottom:"50px",
              backgroundColor : "white",
              width : "180px",
              height: "40px",
              borderRadius: "10px",
              fontSize:"20px",
              fontWeight:700,
              textAlign: "center",
              border:"3px solid #285a43",
              color : "#285a43",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              marginLeft:"70px"

            }}onClick={BtnEvent}>
            구매하기
            </button>

            <button 
            style ={{
              display:"block",
              margin:"auto",
              marginTop:"10px",
              marginBottom:"50px",
              backgroundColor : "white",
              width : "180px",
              height: "40px",
              borderRadius: "10px",
              fontSize:"20px",
              fontWeight:700,
              textAlign: "center",
              border:"3px solid #285a43",
              color : "#285a43",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              marginLeft:"40px"

            }}onClick={BtnEvent}>
            닫기
            </button>

            <button 
            style ={{
              display:"block",
              margin:"auto",
              marginTop:"10px",
              marginBottom:"50px",
              backgroundColor : "white",
              width : "180px",
              height: "40px",
              borderRadius: "10px",
              fontSize:"20px",
              fontWeight:700,
              textAlign: "center",
              border:"3px solid #285a43",
              color : "#285a43",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              marginLeft:"40px"

            }}onClick={BtnEvent}>
            찜하기
            </button>
            </div>
      </Wrapper>
      </>
      
          </Resultpopup>
  );
});

export default Slider;