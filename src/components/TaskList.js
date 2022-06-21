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
import { Stack } from '@mui/material';

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { mockTasks, mockTags } from '../mock.js'

import TaskInput from './TaskInput.js'

import { Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';

import RepeatIcon from '@mui/icons-material/Repeat';

function NewTask(props) {
  const [addNewTask, setAddNewTask] = useState(false);

  const handleClickNewTask = () => {
    setAddNewTask(!addNewTask)
  }

  return (
    <>
      <ListItem>
        <Button icon={<AddTaskIcon></AddTaskIcon>} variant="outlined" clickable onClick={handleClickNewTask} sx={{ width: "100%" }}>Add new task</Button>
      </ListItem>
      {addNewTask ? <TaskInput edit={false} handleTaskSelectClose={handleClickNewTask}></TaskInput> : <></>}
    </>
  )
}

//Rendering first task
function ListEntry(props) {
  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)

  const [dragHover, setDragHover] = useState(null)
  const [parentDragHover, setParentDragHover] = useState(null)

  const [dropDownRef, setDropDownRef] = useState(null)

  const [editTask, setEditTask] = useState(false)

  const handleDragHover = () => setDragHover(null);

  const handleDropDown = (event) => setDropDownRef(event.currentTarget);

  const openDropDown = Boolean(dropDownRef)

  const handleCloseDropDown = () => setDropDownRef(false);

  const handleEditTask = () => setEditTask(!editTask);

  const ref = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect: (monitor) => ({
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

      //Divides by number of tasks the total size of the component, then divides by 2 to get the middle of current one.

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Get pixels to the middle of the 'main' task
      const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)


      if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
        setDragHover("below");
      }
      else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
        setDragHover("above");
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

      //Divides by number of tasks the total size of the component, then divides by 2 to get the middle of current one.

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Get pixels to the middle of the 'main' task
      const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)

      if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
        //props.moveTask(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex + 1)
      }
      else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
        //props.moveTask(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex)
      }

    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { index: props.index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });
  //For line highlighting 

  //Opacity?
  const opacity = isDragging ? 0 : 1;

  let borderBottom;
  let borderTop;

  if (isOver) {
    if (dragHover === "below") {
      borderBottom = 2;

    }
    else if (dragHover === "above") {
      borderTop = 2;
    }
  }
  else {
    borderBottom = 0;
    borderTop = 0;
  }

  drag(drop(ref))

  return (
    <ListItem
      ref={ref}
      key={'primary' + String(props.id)}
      sx={{
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
        pl: props.subtask ? 4 : 0,
        borderBottom: borderBottom,
        borderTop: borderTop,
        borderColor: "primary.main",
      }}
      onMouseEnter={(e) => setOnHover({ display: 'block' })}
      onMouseLeave={(e) => setOnHover({ display: 'none' })}
      secondaryAction={
        <>
          <IconButton

            edge="end"
            aria-label="options"
            onClick={handleDropDown}
            sx={onHover}>
            <MoreVertOutlinedIcon></MoreVertOutlinedIcon>

          </IconButton>
          <Menu
            id="task-entry-options"
            anchorEl={dropDownRef}
            open={openDropDown}
            onClose={handleCloseDropDown}
            MenuListProps={{
              'aria-labelledby': 'options-button',
            }}
          >
            <MenuItem onClick={handleEditTask}>Edit task</MenuItem>
            <MenuItem onClick={handleCloseDropDown} divider>Delete task</MenuItem>
            <MenuItem onClick={handleCloseDropDown}><CheckIcon></CheckIcon>All tasks</MenuItem>
            <MenuItem onClick={handleCloseDropDown}>Tag 1</MenuItem>
            <MenuItem onClick={handleCloseDropDown}>Tag 2</MenuItem>

          </Menu>
        </>

      }>
      <ListItemIcon
                 onMouseEnter={(e) => setCompleteHover(true)}
          onMouseLeave={(e) => setCompleteHover(false)}
        >
{
  props.type==="block"? <Typography sx={{margin: 1, pl: 1, pr:1, border:"1px", borderStyle:"solid"}}>{props.blocks}</Typography>
:<IconButton>{completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}</IconButton>
}

      </ListItemIcon>
      <ListItemText primary={props.text} secondary={props.description}>
      </ListItemText>
      {props.repeat? <RepeatIcon sx={{marginRight: 1, color: "rgba(0, 0, 0, 0.6)"}}></RepeatIcon>: null}

      <Chip variant="outlined" label={props.date} sx={{ visibility: props.date ? "visible" : "hidden" }}></Chip>
    </ListItem>
  )
}

export default function TaskList(props) {
  const [tagSelected, setTagSelected] = useState('All Tasks')
  const [tagAnchorEl, setTagAnchorEl] = useState(null)
  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null)
  const [changeListName, setChangeListName] = useState(false)
  const [deleteList, setDeleteList] = useState(false)
  const [deletedTask, setDeletedTask] = useState(null) //saves deleted task, controls redo pop up. after 5s changes are
  //stored in tasks.history via use effect and state turned into null thus disappearing the pop up

  const tasks = useSelector(state => state.tasks)

  const openTags = Boolean(tagAnchorEl);
  const openOptions = Boolean(optionsAnchorEl)

  const onClickTagSelection = (event) => {
    setTagAnchorEl(event.currentTarget);
  }

  const onClickOptions = (event) => {
    setOptionsAnchorEl(event.currentTarget);
  }

  const handleCloseTags = () => {
    setTagAnchorEl(null)
  }

  const handleCloseOptions = () => {
    setOptionsAnchorEl(null)
  }

  const handleChangeTagSelected = (tagName) => {
    setTagSelected(tagName);
    setTagAnchorEl(null);
  }

  function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
  }

  let allTagTasks = []
  if (tagSelected === 'All Tasks') {
    tasks.tasks.forEach((task, index) => {
      allTagTasks.push(
        <ListEntry
          key={task.id}
          text={task.name}
          description={task.description}
          index={index}
          date={task.date}
          type={task.type}
          blocks={task.blocks}
          repeat={task.repeat}

        ></ListEntry>
      )
    })
  }
  else {
    tasks.tasks.forEach((task, index) => {
      if (task.tag === tagSelected) {
        allTagTasks.push(
          <ListEntry
            key={task.id}
            text={task.name}
            description={task.description}
            index={index}
            date={task.date}
            type={task.type}
            blocks={task.blocks}
            repeat={task.repeat}
          ></ListEntry>
        )
      }
    })
  }

  let tagsMenuItems = [<MenuItem key="0" selected={"All Tasks" === tagSelected} divider onClick={() => handleChangeTagSelected("All Tasks")}>All Tasks</MenuItem>]
  for (const [index, tag] of tasks.tags.entries()) {
    console.log(index)
    tagsMenuItems.push(
      <MenuItem
        key={(1 + index).toString()}
        selected={tag === tagSelected}
        onClick={() => handleChangeTagSelected(tag)}>
        {tag}
      </MenuItem>)
  }
  console.log('exited loop')
  return (
    <Box>
      <Typography variant="overline" sx={{ pl: 1 }}>Tasks</Typography>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs="auto">
          <Button endIcon={<ArrowDropDownIcon></ArrowDropDownIcon>} onClick={onClickTagSelection}>{tagSelected}</Button>
          <Menu
            id="tag selection"
            anchorEl={tagAnchorEl}
            open={openTags}
            onClose={handleCloseTags}
            MenuListProps={{
              'aria-labelledby': 'options-button',
            }}
          >
            {tagsMenuItems}
          </Menu>
        </Grid>
        <Grid item xs="auto">
          <IconButton
            aria-label="task-list-options-button"
            onClick={onClickOptions}>
            <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
          </IconButton>
          <Menu
            id="task-list-options"
            anchorEl={optionsAnchorEl}
            open={openOptions}
            onClose={handleCloseOptions}
            MenuListProps={{
              'aria-labelledby': 'options-button',
            }}
          >
            <MenuItem onClick={handleCloseTags}>Change list name</MenuItem>
            <MenuItem onClick={handleCloseTags}>Delete list</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <List>
        <Divider></Divider>
        <NewTask></NewTask>
        {allTagTasks}
      </List>
    </Box>
  )
}

