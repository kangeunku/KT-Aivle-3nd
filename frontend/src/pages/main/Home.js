import React, { useState } from "react";
import {Send} from "../../components";

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
        <div class="search_container" style={{position: "relative"}}>
            <img src={'../../assets/img/search_bg.png'} alt="웹 페이지 이미지" />
            <p className="search_desc big_font" style={{fontSize:"48px", fontWeight:"800", color:"#191919",}}>상품을 검색하세요</p>
            <p className="search_overlay main_font" style={{fontSize:"32px", marginTop:"24px", marginBottom:"24px"}}>상품을 검색하세요</p>
            <div class="search_box1" style={{position: "relative", width: "600px", height: "64px", background: "gray", borderRadius: "12px"}}>
                <button onClick={goToSecondPage} src={'../../assets/img/search_bg.png'} alt="상세검색으로 이동하는 버튼" 
                style={{position: "absolute", top: "50%", left: "90%", transform: "translate(-50%, -50%)", background: "rgba(255, 255, 255, 0.7)", padding:"10px"
                }}/>
            </div>
        </div>
    );
};

const SecondPage = () => {
    return (
        <div style={{display: "flex", flexDirection: "column",width:"100%", overflowX: "hidden"}}>
            <div class="search_contained" style={{display:"flex", flexDirection: "column", position: "relative", width:"80%", height:"100px", left:"70px", top:"50px",}}>
                <p className="main_guide" style={{fontSize:"24px", fontWeight:"700", color:"#191919", marginBottom:"20px"}}>상품을 검색하세요</p>
                <div class="search_box2" style={{display:"flex", flexDirection: "row", position: "relative", width:"100%", height:"100%", bottom:"0px", border: "5px solid #285A43", borderRadius: "20px"}}>
                    <img src={'../../assets/img/search_button2.png'} alt="웹 페이지 이미지" style={{display:"flex", flexDirection: "column", position: "relative", left:"15px", width:"56px", height:"56px", top:"20%"}}/>
                    <p style={{marginTop:"15px", flex:"1", fontSize:"32px", height:"50px", fontWeight:"800"}}>사과</p>
                </div>
            </div>
            <div>
            <p className="main_guide" style={{position:"relative", fontSize:"24px", fontWeight:"700", color:"#191919", marginBottom:"20px", left:"70px", top:"80px"}}>상세 검색을 위해 카테고리를 불러오겠습니다.</p>
                <div className="search_box2"style={{marginTop:"90px",left:"70px", position:"relative", width:"85%", flexWrap: "wrap",}} >
                    <CategoryBoxes/>
                </div>
            </div>
            <div>
                <a href="/basket" style={{position:"absolute",left:"80%", top:"90%", backgroundColor:"#285a43", width:"250px", height:"50px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "10px" }}>
                <button style={{color:"white", fontSize:"24px", fontWeight:"700"}}>다음</button>
                </a>
            </div>
        </div>
    )

    
};


const detail_category = [
    {
        category: "카테고리",
        car_index: ["식품", "생활/건강", "가구/인테리어", "출산/육아", "디지털/가전"],
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
        car_index: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사과"],
    },
    {
        category: "키워드 추천",
        car_index: ["청송사과", "못난이사과", "세척사과", "꿀사과", "얼음골사과", "문경사과"],
    },
];
function CategoryBoxes() {
    return (
        <div style={{ overflowY: "auto", maxHeight: "350px" }}>
            {detail_category.map((item, index) => (
                <div key={item.category} style={{ marginBottom: "30px" }}>
                    <div style={{fontSize:"24px", fontWeight:"700", color:"#191919"}}>{index + 1}. 사과의 '{item.category}'를 추천해주세요(0을 누를 시 생략)</div>
                    <div style={{ display: "flex", alignItems: "center", fontSize:"16px", width: "95%", height: "50px", marginLeft:"30px", marginTop:"10px",backgroundColor: "rgb(225, 243, 217)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "10px"}}>
                        {item.car_index.map((index) => (
                            <p key={index} style={{ margin: "0 5px" , marginLeft: "20px"}}>{index}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { Home };