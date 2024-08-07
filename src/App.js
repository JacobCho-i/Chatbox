import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  function sendMessage(msg) {
    fetch('http://localhost:5000/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"question": "What is your favorite game?"}),
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));
    
  }

  useEffect(() => {
    sendMessage("hello world!")
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
