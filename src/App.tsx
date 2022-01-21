import React from "react";
import logo from "./logo.svg";
import Timer from "./Timer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Select a time and get started!</p>
        <Timer startTimeInSeconds="10" />
      </header>
    </div>
  );
}

export default App;
