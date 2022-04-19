import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function FileList(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (
    event,
    index
  ) => {
    props.handleUpdateTempSelectedFilename(props.allNotes[index][0]);
    setSelectedIndex(index);
  };

  const notesToDivs = () => {
    return props.allNotes.map((n,i) =>
     (<ListItem disablePadding key={n[1]}>
        <ListItemButton
          selected={selectedIndex === i}
          onClick={(event) => handleListItemClick(event, i)}
        >        
        <ListItemText primary={n[1]} />
      </ListItemButton>
    </ListItem>));
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {notesToDivs()}
      </List>
    </Box>
  );
}
