import React from "react";
import logo from './mbfaviconSM.png';
import './App.css';
import FileUpload from "./View/FileUpload";


function App(){
  return (
    <div className="App">
      <div className="header">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://localhost:3000/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1>MoneyBean</h1>
          </a>
          <FileUpload />
        </header>
      </div>
    </div>
  );
}
export default App;
