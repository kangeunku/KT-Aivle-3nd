import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import {  Home, Basket, EditInfo ,Support } from "./pages";
import {  Header } from "./components";

const Navigate = () => {
  return (
    <nav className="nav"> 
      <ul className="nav_lsit">
        <li className="active_list">
          <Link to="/">검색</Link>
        </li>
        <li>
          <Link to="/basket">찜목록</Link>
        </li>
        <li>
          <Link to="/editinfo">회원정보 수정</Link>
        </li>
        <li>
          <Link to="/support">고객센터</Link>
        </li>
      </ul>
    </nav>
    );
}

function App() {
  return (
    <div className='App'>
      <div className="wrap">
        <div className="side">
          <h1 className="logo">logo</h1>
          <Navigate></Navigate>
        </div>
        <section className="content">
          <Header />
          <div className="container">
            <Routes>
              {/* 라우터가 적용될 페이지 */}
              <Route path="/" element={<Home />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/editinfo" element={<EditInfo />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </div>
        </section>
      </div>
    </div>
  );
}




export default App;
