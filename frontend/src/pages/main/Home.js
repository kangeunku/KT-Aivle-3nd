import React, { useState } from "react";
import {send} from "../../components";


const Home = () => {
    const [text, setText] = useState("없음");
        return (
        <>
            <h1 className="title">home 화면임</h1>
            <button onClick={() => send('first_fun', 'data','back')}> 보내기 버튼!!!!!! </button> 
            <p>{text}</p>
        </>
    
    )
}

export { Home };