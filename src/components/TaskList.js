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
import { Box, recomposeColor } from '@mui/system';
import { Visibility } from '@mui/icons-material';
import { Paper } from '@mui/material';

import { mockTasks, mockTags } from '../mock.js'

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

  const [dragHover, setDragHover] = useState(null)
  const [parentDragHover, setParentDragHover] = useState(null)

  const handleDragHover = () => setDragHover(null);

  const ref = useRef(null)
  const refPrimary = useRef(null)

  let acceptedTypes;

  const [{ handlerId, isOver }, drop] = useDrop({
    accept: [ItemTypes.TASK, ItemTypes.SUBTASK, props.subtask ? '' : ItemTypes.CONTAINER],
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver()
    }
    ),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index //What is being dragged 
      const hoverIndex = props.index //Current index
      //If hovered on same place do nothing
      if (dragIndex === hoverIndex) {
        if (props.fatherIndex === item.fatherIndex) {
          return
        }
      }

      const clientOffset = monitor.getClientOffset();

      //Gets current item total height.
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      //Gets height of first task only.
      const primaryHoverBoundingRect = refPrimary.current?.getBoundingClientRect()

      //Divides by number of tasks the total size of the component, then divides by 2 to get the middle of current one.

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Get pixels to the middle of the 'main' task
      const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)

      //Calculates to first task only 
      const primaryHoverMiddleY = (primaryHoverBoundingRect.bottom - primaryHoverBoundingRect.top) / 2
      // Get pixels to the middle of the 'main' task
      const primaryHoverClientY = clientOffset.y - (primaryHoverBoundingRect.top + primaryHoverMiddleY)

      if (item.hasChildren) {
        if (props.children.length) { //Both drag and hovering have children
          setDragHover(null);

          if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
            setParentDragHover("below");
          }
          else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
            setParentDragHover("above");
          }
        }
        else {
          if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
            setDragHover("below");
          }
          else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
            setDragHover("above");
          }
        }
      }
      else { //Only
        setParentDragHover(null)
        if (primaryHoverClientY > primaryHoverMiddleY) {
          setDragHover(null);
        }
        if (primaryHoverClientY > 0 && primaryHoverClientY < primaryHoverMiddleY) {
          setDragHover("below");
        }
        else if (primaryHoverClientY < 0 && primaryHoverClientY > (-1 * primaryHoverMiddleY)) {
          setDragHover("above");
        }
      }

    },
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index //What is being dragged 
      const hoverIndex = props.index //Current index

      if (dragIndex === hoverIndex) {
        if (props.fatherIndex === item.fatherIndex) {
          return
        }
      }

      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      //Gets current item total height.
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      //Gets height of first task only.
      const primaryHoverBoundingRect = refPrimary.current?.getBoundingClientRect()

      //Divides by number of tasks the total size of the component, then divides by 2 to get the middle of current one.

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Get pixels to the middle of the 'main' task
      const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)

      //Calculates to first task only 
      const primaryHoverMiddleY = (primaryHoverBoundingRect.bottom - primaryHoverBoundingRect.top) / 2
      // Get pixels to the middle of the 'main' task
      const primaryHoverClientY = clientOffset.y - (primaryHoverBoundingRect.top + primaryHoverMiddleY)

      if (item.subtask) { //Is draggable a subtask
        if (props.subtask) { //Is container a subtask
          if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
            props.moveTaskSecToSec(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex + 1)
          }
          else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
            props.moveTaskSecToSec(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex)
          }
        }
        else { //Container is a task
          if (props.children.length) {
            if (primaryHoverClientY > 0 && primaryHoverClientY < primaryHoverMiddleY) {
              props.moveTaskSecToSec(item.fatherIndex, dragIndex, item.fatherIndex, 0)
            }
            else if (primaryHoverClientY < 0 && primaryHoverClientY > (-1 * hoverMiddleY)) {
              props.moveTaskSecToPrim(item.fatherIndex, dragIndex, hoverIndex)
            }
          }
          else {
            if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
              props.moveTaskSecToPrim(item.fatherIndex, dragIndex, hoverIndex + 1)
            }

            else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
              props.moveTaskSecToPrim(item.fatherIndex, dragIndex, hoverIndex)
            }
          }
        }
      }
      else { //Draggable is a primary.
        if (props.subtask) { //Contaier is a subtask
          if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
            props.moveTaskPrimToSec(dragIndex, props.fatherIndex, hoverIndex + 1)
          }
          else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
            props.moveTaskPrimToSec(dragIndex, props.fatherIndex, hoverIndex)
          }
        }
        else { //Container is a primary
          if (props.children.length && !item.hasChildren) { //container is a parent and has children
            if (primaryHoverClientY > 0 && primaryHoverClientY < primaryHoverMiddleY) {
              props.moveTaskPrimToSec(dragIndex, hoverIndex, 0)
            }
            if (primaryHoverClientY < 0 && primaryHoverClientY > (-1 * hoverMiddleY)) {
              props.moveTask(dragIndex, hoverIndex)
            }
          }
          else {
            if (hoverClientY > 0 && hoverClientY < hoverMiddleY) { //below
              props.moveTask(dragIndex, hoverIndex + 1)
            }
            else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
              props.moveTask(dragIndex, hoverIndex)
            }
          }
        }
      }

    }
  })


  const [{ isDragging }, drag] = useDrag({
    type: (props.subtask ? ItemTypes.SUBTASK : (Boolean(props.children.length) ? ItemTypes.CONTAINER : ItemTypes.TASK)),
    item: () => {
      return { index: props.index, hasChildren: Boolean(props.children.length), subtask: props.subtask, fatherIndex: props.fatherIndex }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });
  //For line highlighting 

  //Opacity?
  const opacity = isDragging ? 0 : 1;

  let borderBottom;
  let parentBorderBottom;
  let borderTop;
  let parentBorderTop;

  if (isOver) {
    if (dragHover === "below") {
      borderBottom = 2;

    }
    else if (dragHover === "above") {
      borderTop = 2;
    }
    if (parentDragHover === "below") {
      parentBorderBottom = 2;
    }
    else if (parentDragHover === "above") {
      parentBorderTop = 2;
    }
  }
  else {
    borderBottom = 0;
    borderTop = 0;
    parentBorderBottom = 0;
    parentBorderTop = 0;
  }


  drag(drop(ref))

  return (
    <Box ref={ref}
      sx={{
        opacity: opacity,
        padding: 0,
        borderBottom: parentBorderBottom, borderColor: "theme.primary.main",
        borderTop: parentBorderTop
      }}>
      <ListItem
        ref={refPrimary}
        key={'primary' + String(props.id)}
        sx={{
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          pl: props.subtask ? 4 : 0,
          borderBottom: borderBottom, borderColor: "theme.primary.main",
          borderTop: borderTop, borderColor: "theme.primary.main",
        }}
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
        <Chip variant="outlined" label={props.date} sx={{ visibility: props.date ? "visible" : "hidden" }}></Chip>
      </ListItem>
      <List
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
        }}>
        {props.children}
      </List>
    </Box>
  )
}



export default function TaskList(props) {
  const [tasks, setTasks] = useState(mockTasks)
  const moveTask = useCallback((dragIndex, hoverIndex) => {
    console.log('entering movetask dragIndex:', dragIndex, 'hoverIndex:', hoverIndex)
    setTasks((prevTasks) => {
      const returnTasks = update(prevTasks, {
        $splice: [
          [hoverIndex, 0, prevTasks[dragIndex]],
          [dragIndex > hoverIndex ? dragIndex + 1 : dragIndex, 1],
        ],
      })
      console.log(returnTasks)
      return returnTasks

    })
  }, [])

  const moveTaskSecToPrim = useCallback((dragIndex, dragSecondaryIndex, hoverIndex) => {
    console.log('entering moveTaskSecToPrim properties:', dragIndex, dragSecondaryIndex, hoverIndex)
    const indexElimValue = dragIndex >= hoverIndex ? dragIndex + 1 : dragIndex;
    setTasks((prevTasks) => {

      let returnTasks = update(prevTasks, {
        $splice: [
          [hoverIndex, 0, prevTasks[dragIndex].children[dragSecondaryIndex]],
        ],
      })
      returnTasks = update(returnTasks, {
        [indexElimValue]: {
          children: {
            $splice: [
              [dragSecondaryIndex, 1]
            ]
          }
        }
      })
      console.log("Return tasks", returnTasks)
      return returnTasks
    }
    )
  }, [])

  const moveTaskPrimToSec = useCallback((dragIndex, hoverIndex, hoverSecondaryIndex) => {
    console.log('entering move task prim to sec, properties:', dragIndex, hoverIndex, hoverSecondaryIndex)
    setTasks((prevTasks) => {
      let returnTasks = update(prevTasks, {
        [hoverIndex]: {
          children: {
            $splice: [
              [hoverSecondaryIndex, 0, prevTasks[dragIndex]]
            ]
          }
        }
      })
      returnTasks = update(returnTasks, {
        $splice: [
          [dragIndex, 1]
        ]
      })
      return returnTasks
    })
  }, []
  )

  const moveTaskSecToSec = useCallback((dragIndex, dragSecondaryIndex, hoverIndex, hoverSecondaryIndex) => {
    setTasks((prevTasks) => {
      if (dragIndex === hoverIndex) {
        const indexElimValue = dragSecondaryIndex > hoverSecondaryIndex ? dragSecondaryIndex + 1 : dragSecondaryIndex;
        return (
          update(prevTasks, {
            [hoverIndex]: {
              children: {
                $splice: [
                  [hoverSecondaryIndex, 0, prevTasks[dragIndex].children[dragSecondaryIndex]],
                  [indexElimValue, 1]
                ]
              }
            }
          }
          )
        )
      }
      else {
        let newTasks = update(prevTasks, {
          [hoverIndex]: {
            children: {
              $splice: [
                [hoverSecondaryIndex, 0, prevTasks[dragIndex].children[dragSecondaryIndex]],
              ]
            }
          }
        }
        )
        newTasks = update(newTasks, {
          [dragIndex]: {
            children: {
              $splice: [
                [dragSecondaryIndex, 1]
              ]
            }
          }
        }
        )
        return newTasks
      }
    })
  }, [])

  const formattedTasks = tasks.map((task, index) => {
    return (
      <ListEntry
        moveTask={moveTask}
        moveTaskSecToPrim={moveTaskSecToPrim}
        moveTaskPrimToSec={moveTaskPrimToSec}
        key={task.name}
        text={task.name}
        description={task.description}
        subtask={false}
        index={index}
        fatherIndex={null}
        date={task.date}
        children={
          task.children.map((childTask, childIndex) => {
            return (
              <ListEntry
                moveTask={moveTask}
                moveTaskPrimToSec={moveTaskPrimToSec}
                moveTaskSecToSec={moveTaskSecToSec}
                key={childTask.name}
                text={childTask.name}
                description={childTask.description}
                subtask={true}
                index={childIndex}
                fatherIndex={index}
                date={childTask.date}
                children={[]} />
            )
          })
        }
      ></ListEntry>
    )
  })

  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
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

