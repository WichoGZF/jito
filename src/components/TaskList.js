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

const mockTags = [
  "escuela", "japanese", "programming"
]

const mockTasks = [
  {
    name: "do homework",
    description: "do ones homework",
    date: "94/22/2020",
    tag: "escuela",
    children: [
      "ge it ready", "finish it", "set it up"
    ]
  },
  {
    name: "do homework",
    description: "do ones homework",
    date: "94/22/2020",
    tag: "escuela",
    children: [
      "ge it ready", "finish it", "set it up"
    ]
  },
  {
    name: "do homework",
    description: "do ones homework",
    date: "94/22/2020",
    tag: "escuela",
    children: [
      "ge it ready", "finish it", "set it up"
    ]
  }
]
//Rendering first task
function ListEntry(props) {
  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)

  return (
    <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
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
//Rendering secondary task
function ChildrenListEntry(props) {
  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)

  return (
    <ListItem sx={{ pl: 4, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
      onMouseEnter={(e) => setOnHover({ display: 'block' })}
      onMouseLeave={(e) => setOnHover({ display: 'none' })}
    >
      <IconButton
        onMouseEnter={(e) => setCompleteHover(true)}
        onMouseLeave={(e) => setCompleteHover(false)}

      >         {completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}
      </IconButton>
      <ListItemText primary={props.text}>
      </ListItemText>
      <IconButton edge="end" sx={onHover}>
        <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
      </IconButton>
    </ListItem>
  )
}

function ListContents(props) {
  const formattedTasks = props.tasks.map((task, index) => {
    const thisEntry = [<ListEntry
      key={task.name + index}
      text={task.name}
      description={task.description}
    ></ListEntry>]
    return (
      thisEntry.concat(task.children.map((childTask, index) => { return (<ChildrenListEntry key={childTask + index} text={childTask}></ChildrenListEntry>) }
      ))
    )
  })
  return (
    <List>
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
      <ListContents tasks={mockTasks}>
      </ListContents>
    </List>
  );
}
