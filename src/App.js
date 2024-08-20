import React, { useEffect, useState, useCallback } from 'react';
import { InputBar } from './components/InputBar';
import { MessageTableCell } from './components/MessageTableCell';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './App.css';

function App() {

  const [messages, setMessages] = useState([])
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
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
      <InputBar message={messages} updateMessage={updateMessage} isTraining={checked}/>
      <FormControlLabel
          control={
            <Switch checked={checked} onChange={handleChange} name="training" />
          }
          label="Training Mode"
        />
    </div>
  );
}

export default App;
