import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileList from './FileList'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function LoadDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [notesFilter, setNotesFilter] = React.useState('');

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

  const getFilteredNotes = () => {
    return props.allNotes.filter(n => n.startsWith(notesFilter)).map(n => prettify_name(n));
  }

  const handleChange = (event) => {
    setNotesFilter(event.target.value);
  };

  const prettify_name = (note_name_raw) => {
    let note_name = note_name_raw.substring(0, note_name_raw.lastIndexOf('.'));
    let note_name_splitted = note_name.split('_');
    let note_lable = '';
    switch (note_name_splitted[0]) {
      case "ONEONE":
        note_lable = "One-on-one"
        break;
    
      case "TODO":
        note_lable = "Todo List"
        break;
      
      case "PAPER":
        note_lable = "Paper Reading"
        break;

      case "MEETING":
        note_lable = "Meeting"
        break;

      case "RESEARCH":
        note_lable = "Research"
        break;

      case "CODE":
        note_lable = "Code"
        break;

      default:
        note_lable = "Unknown"
        break;
    }

    let prettified_filename_array = note_name_splitted.slice(1);
    let date_beginning = -1;
    for (let i = prettified_filename_array.length - 1; i - 2 > -1; i++) {
      if (!isNaN(prettified_filename_array[i]) &&
        !isNaN(prettified_filename_array[i-1]) &&
        !isNaN(prettified_filename_array[i-2])) {
          date_beginning = i - 2;
          break;
        }
    }

    let prettified_filename = prettified_filename_array.join(' ');
    if (date_beginning != -1) {
      const front_slice = prettified_filename_array.slice(0, date_beginning).join(' ');
      const date_slice = prettified_filename_array.slice(date_beginning, date_beginning + 3).join('/');
      const back_slice = prettified_filename_array.slice(date_beginning + 3).join(' ');
      prettified_filename = `${front_slice} ${date_slice} ${back_slice}`;
    }

    return [note_name_raw, `[${note_lable}] ${prettified_filename}`];
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
        fullWidth
        maxWidth="sm"
      >
        <h4>Filter:</h4>
        <Select
          labelId="notes-filter-select-label"
          id="notes-filter-select"
          value={notesFilter}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={''}>All</MenuItem>
          <MenuItem value={'PAPER'}>Papers</MenuItem>
          <MenuItem value={'ONEONE'}>One on Ones</MenuItem>
          <MenuItem value={'TODO'}>TODOs</MenuItem>
          <MenuItem value={'MEETING'}>Meetings</MenuItem>
        </Select>
        <DialogTitle><strong>Notes</strong></DialogTitle>
        <DialogContent>
          <FileList
            allNotes={getFilteredNotes()}
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
