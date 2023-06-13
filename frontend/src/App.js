import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import {  Home, Basket, EditInfo ,Support } from "./pages";

function App() {
  return (
    <div className='App'>
      <nav>
        {/* 리액트 라우터의 링크 */}
        <Link to="/">검색</Link>
        <Link to="/basket">찜목록</Link>
        <Link to="/editinfo">회원정보 수정</Link>
        <Link to="/support">고객센터</Link>
      </nav>
      <Routes>
        {/* 라우터가 적용될 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/editinfo" element={<EditInfo />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;
