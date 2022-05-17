import * as React from 'react';
import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { IconButton, Input } from '@mui/material';
import { ListItem } from '@mui/material';
import { Grid } from '@mui/material';
import Check from '@mui/icons-material/Check'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import { tabsListUnstyledClasses } from '@mui/base';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { set } from 'date-fns';
import Circle from '@mui/icons-material/Circle';

import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const mockTags = [
  "escuela", "japanese", "programming"
]

const mockTasks = [
  {
    id: 0,
    name: "do homework",
    description: "do ones homework",
    date: "94/22/2020",
    tag: "escuela",
    subtask: false,
    children: [
      1, 2
    ]
  },
  {
    id: 1,
    name: "secondary",
    dascription: "secondary desc",
    date: "09/22/2021",
    tag: "escuela",
    subtask: true,
    children: [
    ]
  },
  {
    id: 2,
    name: "secondary",
    dascription: "secondary desc",
    date: "09/22/2021",
    tag: "escuela",
    subtask: true,
    children: [
    ]
  },
  {
    id: 3,
    name: "do homework",
    description: "do ones homework",
    date: "94/22/2020",
    tag: "escuela",
    subtask: false,
    children: [
    ]
  },
  {
    id: 4,
    name: "do homework",
    description: "do ones homework",
    date: "94/22/2020",
    tag: "escuela",
    subtask: false,
    children: [
    ]
  }
]
//Rendering first task
function ListEntry(props) {
  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)

  const [{ isDragging }, drag] = useDrag({
    item: { name: "whatever" },
    type: "task",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <ListItem ref={drag} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }, pl: props.subtask ? 4 : 0 }}
      onMouseEnter={(e) => setOnHover({ display: 'block' })}
      onMouseLeave={(e) => setOnHover({ display: 'none' })}
      secondaryAction={
        <IconButton

          edge="end"
          aria-label="options"
          sx={onHover}>
          <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
        </IconButton>
      }>
      <ListItemIcon
        onMouseEnter={(e) => setCompleteHover(true)}
        onMouseLeave={(e) => setCompleteHover(false)}
      >
        <IconButton>{completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}</IconButton>
      </ListItemIcon>
      <ListItemText primary={props.text} secondary={props.description}>
      </ListItemText>
    </ListItem>
  )
}


function ListContents(props) {
  const formattedTasks = props.tasks.map((task, index) => {
    let parent = false;
    if (task.children.length) {
      parent = true;
    }
    return (
      <ListEntry
        key={task.name + index}
        text={task.name}
        description={task.description}
        subtask={task.subtask}
      ></ListEntry>
    )
  })
   
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Tasks
        </ListSubheader>
      }
    >
      {formattedTasks}
    </List>
  )
}


export default function NestedList(props) {

  /*const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  /*const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))
  */
  const [onHover, setOnHover] = useState(null);
  return (
    <ListContents tasks={mockTasks}>
    </ListContents>
  );
}
