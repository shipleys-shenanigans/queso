import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileList from './FileList'

export default function LoadDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.loadAllNotes();
    setOpen(true);
  };

  const handleCancel = () => {
    props.stateHandleClickCancelLoad();
    setOpen(false);
  };

  const handleClickSave = () => {
    props.stateHandleClickLoadOpen()
    setOpen(false);
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Load
      </Button>
      <Dialog 
        open={open} 
        onClose={handleCancel}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>Notes</DialogTitle>
        <DialogContent>
          <FileList
            allNotes={props.allNotes}
            handleUpdateTempSelectedFilename={props.handleUpdateTempSelectedFilename}
          ></FileList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClickSave}>Load</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
