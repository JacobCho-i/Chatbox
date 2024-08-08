import React, { useEffect, useState } from 'react';
import { InputBar } from './components/InputBar';
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
      hello world
      <InputBar/>
    </div>
  );
}

export default App;
