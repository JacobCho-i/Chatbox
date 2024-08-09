import React, { useEffect, useState } from 'react';
import { InputBar } from './components/InputBar';
import './App.css';

function App() {

  const [messages, setMessages] = useState([])

  const updateMessage = (msg) => {
    messages.push(msg)
  }

  useEffect(() => {
    //
  }, []);

  return (
    <div className="App">
      goofy chatbot
      <InputBar message={messages} updateMessage={updateMessage}/>
    </div>
  );
}

export default App;
