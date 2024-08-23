import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export function FormDialog({ open, updateOpen, tags }) {

   const [tag, setTag] = React.useState('greeting');
   const [tagName, setTagName] = React.useState('');
   const [response, setResponse] = React.useState('');
   const [patterns, setPatterns] = React.useState([]);

  const handleClose = () => {
    updateOpen(false);
  };

  const handleTagChange = (event) => {
    setTag(
      event.target.value,
    );
    fetch('http://localhost:5000/get_patterns_with_tag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"tag": event.target.value
      }),
    })
    .then(response => response.json())
    .then(response => {
      setPatterns(response["patterns"])
    })
    .catch(error => console.error('Error:', error));
  };

  const handleTagNameChange = (event) => {
    setTagName(
      event.target.value,
    );
  }

  const handleResponseChange = (event) => {
    setResponse(
      event.target.value,
    );
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Training</DialogTitle>
        <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
        >
        <FormControl sx={{ mt: 2 }}>
              <InputLabel htmlFor="tags">tags</InputLabel>
              <Select
                value={tag}
                onChange={handleTagChange}
                label="tags"
                inputProps={{ 
                  name: 'tags', 
                  id: 'tags',
                }}
              >
                {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                    {tag}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Box>
        <DialogContent>
        {
          tag === "New tag" ? (  
            <>
              {/* adding new tags */}
              <DialogContentText>
          Please insert name for this tag.
              </DialogContentText>
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="tag"
                  label="New tag"
                  fullWidth
                  variant="standard"
                  value={tagName}
                  onChange={handleTagNameChange}
              />
            </> 
          ) : (
            <>
              {/* using existing tags */}
              <DialogContentText>
                Some patterns involving tags {tag} include:
              </DialogContentText>
              {patterns.map((pattern, key) => (
                <DialogContentText key={key}>
                  "{pattern}"
                </DialogContentText>
              ))}
            </>
          )
        }
        <DialogContentText>
          Please add a new response according to this tag.
        </DialogContentText>
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="response"
            label="New response"
            fullWidth
            variant="standard"
            value={response}
            onChange={handleResponseChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Confirm</Button>
      </DialogActions>
      </Dialog>
  );
}