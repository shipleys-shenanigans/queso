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
  const handleClickOpen = () => {
    if (props.wasSaved) {
      props.stateHandleClickSave()
    } else {
      setOpen(true);
    }
  };

  const handleCancel = () => {
    props.stateHandleClickCancel();
    setOpen(false);
  };

  const handleClickSave = () => {
    props.stateHandleClickSave()
    setOpen(false);
  }

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleClickOpen}
        disabled={!props.dirtyContent}
        style={{
          backgroundColor: props.dirtyContent ? 'red' : 'green',
        }}
      >
        Save
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Save File</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Filename
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={props.tempfilename} 
            onChange={props.tempfilenameUpdate}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClickSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}