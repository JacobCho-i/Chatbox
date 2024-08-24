import React, { useEffect, useState, useRef } from 'react';
import { InputBar } from './components/InputBar';
import { MessageTableCell } from './components/MessageTableCell';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './App.css';
import { FormDialog } from './components/Dialog';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

function App() {

  const [messages, setMessages] = useState([])
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(0);
  const [tags, setTags] = useState([])
  const [pattern, setPattern] = useState('');

  const tempValueRef = useRef('');

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // sender param: 0 = self, 1 = bot
  const updateMessage = (msg, sender) => {
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length, text: msg, sender: sender}]);
  }

  const updateTags = (tags) => {
    setTags(tags)
  }

  const updatePattern = (pattern) => {
    setPattern(pattern)
  }

  const setDialogOpen = (value) => {
    setOpen(value)
  }

  const updateOpen = (open) => {
    setOpen(open)
  }

  const updateAlert = (alert) => {
    setAlert(alert)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(0);
  };

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
          <Snackbar
      open={alert != 0}
      autoHideDuration={5000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {
        alert === 1 ? 
        <Alert severity="success">
          The bot gained more knowledge!
        </Alert>
        :
        <Alert severity="error">
          Error happened while learning.
        </Alert>
      }
      
    </Snackbar>


      goofy chatbot 
      <MessageTable messages={messages} />
      <InputBar message={messages} updateMessage={updateMessage} isTraining={checked} tags={tags} updateTags={updateTags} updateOpen={updateOpen} pattern={pattern} updatePattern={updatePattern}/>
      <FormControlLabel
          control={
            <Switch checked={checked} onChange={handleChange} name="training" />
          }
          label="Training Mode"
        />
      <FormDialog open={open} updateOpen={updateOpen} tags={tags} pattern={pattern} updateAlert={updateAlert}/>
    </div>
  );
}

export default App;
