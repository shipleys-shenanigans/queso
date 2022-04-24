import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SaveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [filename, setFilename] = React.useState('');

  const handleClickOpen = () => {
    if (props.wasSaved) {
      props.stateHandleClickSave(props.initFilename)
    } else {
      setOpen(true);
    }
  };

  const handleChange = (e) => {
      setFilename(e.target.value);
  }

  const handleClose = () => {
    setFilename('');
    setOpen(false);
  };

  const handleClickSave = () => {
    props.stateHandleClickSave(filename)
      handleClose();
  }

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleClickOpen}
        disabled={!props.dirtyContent}
        style={{
          backgroundColor: props.dirtyContent ? 'red' : '#646F4B',
          marginRight: '5px',
        }}
      >
        Save
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save File</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Filename
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Filename"
            type="filename"
            fullWidth
            value={filename}
            onChange={handleChange}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}