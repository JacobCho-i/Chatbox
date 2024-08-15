import React, { useEffect, useState, useCallback } from 'react';
import { InputBar } from './components/InputBar';
import { MessageTableCell } from './components/MessageTableCell';
import './App.css';

function App() {

  const [messages, setMessages] = useState([])
  
  // sender param: 0 = self, 1 = bot
  const updateMessage = (msg, sender) => {
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length, text: msg, sender: sender}]);
  }

  const MessageTable = ({ messages }) => {
    return (
      <table>
        <tbody>
          <tr>
            <MessageTableCell messages={messages} />
          </tr>
        </tbody>
      </table>
    );
  };
  

  useEffect(() => {
    //
  }, []);

  return (
    <div className="App">
      goofy chatbot
      <MessageTable messages={messages} />
      <InputBar message={messages} updateMessage={updateMessage}/>
    </div>
  );
}

export default App;
