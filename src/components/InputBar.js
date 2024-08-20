import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export function InputBar({ message, updateMessage, isTraining, tags, updateTags, updateOpen }) {

  const [value, setValue] = useState('');
  
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  }, [value, isTraining]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function sendMessage() {
    if (value === '') {
      return
    }
    if (isTraining) {
      updateMessage(value, 0)
      fetch('http://localhost:5000/get_tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"question": value
        }),
      })
      .then(response => response.json())
      .then(response => {
        console.log(response["tags"], 1)
        updateTags(response["tags"])
      })
      .catch(error => console.error('Error:', error));
      setValue('')
      updateOpen(true)
    }
    else {
      updateMessage(value, 0)
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
        updateMessage(response["message"], 1)
      })
      .catch(error => console.error('Error:', error));
      setValue('')
      console.log(message)
    }

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