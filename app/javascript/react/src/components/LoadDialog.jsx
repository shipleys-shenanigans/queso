import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FileList from './FileList'

export default function LoadDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState({});

  const handleClickOpen = () => {
    props.loadAllNotes();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickLoad = () => {
    if (selectedNote != {}) {
      props.stateHandleClickLoadOpen(selectedNote.id)
      handleClose();
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Load
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <FileList
            allNotes={props.allNotes}
            handleSelectedListItemClick={(e) => setSelectedNote((e))}
          ></FileList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickLoad}>Load</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
