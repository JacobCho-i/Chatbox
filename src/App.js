import React, { useEffect, useState } from 'react';
import { InputBar } from './components/InputBar';
import { MessageTableCell } from './components/MessageTableCell';
import './App.css';

function App() {

  const [messages, setMessages] = useState([])

  const updateMessage = (msg) => {
    //messages.push({id: messages.length, text: msg})
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length, text: msg }]);
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
