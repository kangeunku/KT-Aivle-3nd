import React, { useState } from "react";
import {send} from "../../components";

const Home = () => {
    const data = ['hi','hi','hi','hi','hi']
        return (
        <>
            <h1 className="title">home 화면임</h1>
            <button onClick={() => send('first_fun', "data",'back')}> 보내기 버튼!!!!!! </button> 
        </>
    
    )
}

export { Home };