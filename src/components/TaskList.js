import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

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
import { IconButton, Input, Typography } from '@mui/material';
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

import { useDrag, useDrop } from 'react-dnd';

import update from 'immutability-helper'

import { ItemTypes } from './ItemTypes.js'


import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/system';

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

function NewTask(props) {
  return (
    <ListItem
      secondaryAction={
        <IconButton

          edge="end"
          aria-label="options"
          sx={() => { }}>
          <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
        </IconButton>
      }>
      <Chip icon={<AddTaskIcon></AddTaskIcon>} label="Add new task" variant="outlined" clickable></Chip>

    </ListItem>
  )
}
//Rendering first task
function ListEntry(props) {
  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index //What is being dragged 
      const hoverIndex = props.index //Current index
      console.log("Dragindex(dragged):", dragIndex, "\nHoverIndex(what is over)", hoverIndex)
      //If hovered on same place do nothing
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      props.moveTask(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { id: props.id, index: props.index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))

  return (
    <ListItem ref={ref} sx={{ opacity: opacity, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }, pl: props.subtask ? 4 : 0, borderBottom: 2, borderColor: "red" }}
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



export default function TaskList(props) {
  const [tasks, setTasks] = useState(mockTasks)

  const moveTask = useCallback((dragIndex, hoverIndex) => {
    if(tasks[dragIndex].subtask && tasks[dragIndex].subtask){
      
      
    }
    setTasks((prevTasks) =>
      update(prevTasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTasks[dragIndex]],
        ],
      }),
    )
  }, [])
  console.log(tasks)

  const formattedTasks = tasks.map((task, index) => {
    return (
      <ListEntry
        moveTask={moveTask}
        key={task.name + index}
        text={task.name}
        description={task.description}
        subtask={task.subtask}
        index={index}
      ></ListEntry>
    )
  })

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start" }}>
          <Typography variant="overline" sx={{ pl: 1 }}>Tasks</Typography>
          <Button edge="start" endIcon={<ArrowDropDownIcon></ArrowDropDownIcon>}>Current tag</Button>
        </Box>
      }
    >
      <NewTask></NewTask>
      {formattedTasks}
    </List>
  )
}

