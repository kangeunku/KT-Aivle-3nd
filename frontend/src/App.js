import React from "react"
import { Routes, Route, Link } from "react-router-dom";

import { Home, About, Counter , Input , UserList } from "./pages";

function App() {
  return (
    <div className='App'>
      <nav>
        {/* 리액트 라우터의 링크 */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/input">input</Link>
        <Link to="/userlist">userlist</Link>
      </nav>
      <Routes>
        {/* 라우터가 적용될 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/input" element={<Input />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
