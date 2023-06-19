import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import {  Home, Basket, EditInfo ,Support } from "./pages";
import {  Header } from "./components";


const Navigate = () => {
  const [navState, setnavState] = useState("home");

  return (
    <nav className="nav"> 
      <ul className="nav_lsit">
        <li className={navState === "home" ? "active_list" : null}>
          <Link to="/" onClick={() => setnavState("home")}>검색</Link>
        </li>
        <li className={navState === "basket" ? "active_list" : null}>
          <Link to="/basket" onClick={() => setnavState("basket")}>찜목록</Link>
        </li>
        <li className={navState === "editinfo" ? "active_list" : null}>
          <Link to="/editinfo" onClick={() => setnavState("editinfo")}>회원정보 수정</Link>
        </li>
        <li className={navState === "support" ? "active_list" : null}>
          <Link to="/support" onClick={() => setnavState("support")}>고객센터</Link>
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
