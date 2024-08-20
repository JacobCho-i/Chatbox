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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export function FormDialog({ open, updateOpen, tags }) {

   const [tag, setTag] = React.useState('greeting');

  const handleClose = () => {
    updateOpen(false);
  };

  const handleTagChange = (event) => {
    setTag(
      event.target.value,
    );
  };

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
        <DialogContent>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
  );
}