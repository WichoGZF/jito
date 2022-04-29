import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import TaskAppBar from './TaskAppBar';
import Input from '@mui/material/Input';


function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <Input value={`Task ${index + 1}`} disableUnderline multiline></Input>
      </ListItemButton>
    </ListItem>
  );
}
export default function TaskList() {
  return (
    <Box
      sx={{ width: '80vw', height: 400, bgcolor: 'background.paper' }}
    >
    
      <FixedSizeList
        height={400}
        itemSize={46}
        itemCount={20}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
