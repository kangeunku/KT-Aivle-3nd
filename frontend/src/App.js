import logo from './logo.svg';
import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [text, setText] = useState("없음");
  
  const clicked = () => {
    axios
      .get("http://127.0.0.1:8000", {
        params: {
          abc: "가나다",
        },
      })
      .then((response) => setText(JSON.stringify(response.data)));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{text}</h1>
        <button onClick={clicked}>클릭</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div></div>
      </header>
      
    </div>
  );
}

export default App;
