import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export function InputBar({ message, updateMessage }) {

  const [value, setValue] = useState('');
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function sendMessage() {
    updateMessage(value)
    fetch('http://localhost:5000/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"question": value
      }),
    })
    .then(response => response.json())
    .then(response => {
      alert(response["message"])
      updateMessage(response["message"])
    })
    .catch(error => console.error('Error:', error));
    setValue('')
    console.log(message)
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={handleChange}
        placeholder="Type your message..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="send" onClick={sendMessage}>
        <ArrowUpwardIcon />
      </IconButton>
    </Paper>
  );
}