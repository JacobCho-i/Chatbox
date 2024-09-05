import React, { useEffect, useState, useRef } from 'react';
import { InputBar } from './components/InputBar';
import { MessageTableCell } from './components/MessageTableCell';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './App.css';
import { FormDialog } from './components/Dialog'
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function App() {

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
  
  const handleDownload = async () => {
    try {
      const filename = 'model.json'; 
      const response = await fetch(`http://localhost:5000/download_model`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error while downloading the file:', error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.log('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload_model', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setAlert(3);
      } else {
        console.log('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getAlertMessage = (alert) => {
    switch (alert) {
      case 1:
        return (
          <Alert severity="success">
            The bot gained more knowledge!
          </Alert>
        );
      case 3:
        return (
          <Alert severity="success">
            Successfully imported the model!
          </Alert>
        );
      case 2:
        return (
          <Alert severity="error">
            Error happened while learning.
          </Alert>
        );
      default:
        return null; 
    }
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
      {getAlertMessage(alert)}
      
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
        <Grid container 
          spacing={2}
          justifyContent="center"
        > 
          <Grid item>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{ marginRight: '10px' }} 
              >
              Import model
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
              </Button>
              </Grid>
              <Grid item>
              <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              onClick={handleDownload}
              startIcon={<CloudDownloadIcon />}
              style={{ marginLeft: '10px' }} 
              >
              Export model
            </Button>
            </Grid>
            </Grid>
    </div>
  );
}

export default App;
