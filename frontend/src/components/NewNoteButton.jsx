import * as React from 'react';
import Button from '@mui/material/Button';

export default function NewNoteButton(props) {
  return (
    <div>
      <Button 
        variant="contained" 
        onClick={props.handleClickNewNote}
        style={{
          backgroundColor: 'gold',
          marginLeft: '5px',
          color: 'black'
        }}
      >
        New
      </Button>
    </div>
  );
}