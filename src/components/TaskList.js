import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { DialogContentText, IconButton, Input, Typography } from '@mui/material';
import { ListItem } from '@mui/material';
import { Grid } from '@mui/material';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import { useDrag, useDrop } from 'react-dnd';

import { ItemTypes } from './ItemTypes.js'


import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import TaskInput from './TaskInput.js'

import { Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';

import RepeatIcon from '@mui/icons-material/Repeat';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { TwitterPicker } from 'react-color'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';
import {
  addTask, editTask, deleteTask, completeTask, reorderTask, addTag, deleteTag, changeTagName, changeTagColor,
  updateBlocks, restartTask,
} from '../features/tasksSlice.js'
import { currentTag, currentIndex, initialize } from '../features/appSlice.js'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'
import { format } from 'date-fns';

import OverdueTaskList from './OverdueTaskList.js';

function NewTask(props) {
  const [addNewTask, setAddNewTask] = useState(false);
  const [openTagSelect, setOpenTagSelect] = useState(false)

  const handleClickNewTask = () => {
    setAddNewTask(!addNewTask)
  }

  return (
    <>
      <ListItem>
        <Button icon={<AddTaskIcon></AddTaskIcon>} variant="outlined" onClick={handleClickNewTask} sx={{ width: "100%" }}>Add new task</Button>
      </ListItem>
      {addNewTask ? <TaskInput
        edit={false} handleTaskSelectClose={handleClickNewTask}></TaskInput> : <></>}
    </>
  )
}

//Rendering first task
function ListEntry(props) {

  const dispatch = useDispatch()

  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)

  const [dragHover, setDragHover] = useState(null)

  const [dropDownRef, setDropDownRef] = useState(null)

  const [editTask, setEditTask] = useState(false)

  const handleDragHover = () => setDragHover(null);

  const handleDropDown = (event) => setDropDownRef(event.currentTarget);

  const openDropDown = Boolean(dropDownRef)

  const handleCloseDropDown = () => setDropDownRef(false);

  const handleEditTask = () => {
    setEditTask(!editTask);
    dropDownRef && handleCloseDropDown()
  }

  const dispatchCompleteTask = () => {
    dispatch(completeTask(props.index))
  }

  const tagWhole = props.tags.find(tag => tag.name === props.tag)
  const tagColor = tagWhole.color

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


      const clientOffset = monitor.getClientOffset();

      //Gets current item total height.
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      //Get the middle of the task
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      //Get distance to 'middle' of the task. 
      // 0 then the cursor is in the middle;
      // positive: the dragging target is below the middle of the task
      // negative: the dragging target is above the middle of the task
      const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)

      console.log(hoverClientY)

      if (hoverClientY > 0) {
        setDragHover("below");
      }
      else if (hoverClientY < 0) {
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
        return;
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
        dispatch(reorderTask(hoverIndex, dragIndex, 'below'))
        //props.moveTask(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex + 1)
      }
      else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
        //props.moveTask(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex)
        dispatch(reorderTask(hoverIndex, dragIndex, 'above'))
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

  let entryIcon
  if (props.type === "block") {
    entryIcon = <Typography sx={{ margin: 1, pl: 1, pr: 1, border: "1px", borderStyle: "solid" }}>{props.blocks}</Typography>
  }
  else {
    if(props.firstTask){
      entryIcon = <IconButton>{completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}</IconButton>
    }
    else{
      entryIcon = <IconButton disabled>{completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}</IconButton>
    }
  }

drag(drop(ref))

if (editTask) {
  return (
    <>
      <ListItem>
        <TaskInput
          edit={true}
          name={props.text}
          description={props.description}
          tag={props.tag}
          type={props.type}
          blocks={props.blocks}
          repeat={props.repeat}
          repeatOn={props.repeatOn}
          tagName={props.tag}
          index={props.index}
          tagColor={tagColor}
          handleTaskSelectClose={handleEditTask}
        >
        </TaskInput>
      </ListItem>
    </>
  )
}
else {
  return (
    <>
      <ListItem
        ref={ref}
        key={'primary' + String(props.id)}
        sx={{
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          borderBottom: borderBottom,
          borderTop: borderTop,
          borderColor: "primary.main"
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
              <MenuItem onClick={handleCloseDropDown} >Delete task</MenuItem>

            </Menu>
          </>

        }>
        <ListItemIcon
          onMouseEnter={(e) => setCompleteHover(true)}
          onMouseLeave={(e) => setCompleteHover(false)}
          onClick={dispatchCompleteTask}
        >
          {entryIcon}

        </ListItemIcon>
        <ListItemText primary={props.text} secondary={props.description}>
        </ListItemText>

        {props.repeat !== 'false' ? <RepeatIcon sx={{ marginRight: 1, color: "rgba(0, 0, 0, 0.6)" }}></RepeatIcon> : null}
        <Chip label={props.tag} sx={{ backgroundColor: tagColor }}></Chip>
      </ListItem>
    </>
  )
}
}

function TagEntry(props) {
  const dispatch = useDispatch()

  const [colorPick, setColorPick] = useState(false)
  const [color, setColor] = useState(props.color)
  const [editName, setEditName] = useState(false)
  const [tagName, setTagName] = useState(props.tag)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const colorRef = useRef(null)
  const colorBounding = colorRef.current?.getBoundingClientRect()

  const colorX = colorRef.current ? colorBounding.x - 260 + 16 : 0
  const colorY = colorRef.current ? colorBounding.y + 24 + 12 : 0

  const handleEditName = () => {
    setEditName(!editName)
  }
  const handleChangeColor = (color) => {
    console.log('Changing color into: ', color, color.hex)
    setColor(color.hex);
    if (color !== props.color) {
      dispatch(changeTagColor(props.tag, color.hex))
    }
    setColorPick(!colorPick)
  }

  const handleDeleteDialog = () => {
    setDeleteDialog(!deleteDialog)
  }

  const dispatchDelete = () => {
    dispatch(deleteTag(props.tag))
    handleDeleteDialog()
  }

  const dispatchEdit = () => {
    if (tagName !== props.tag) {
      dispatch(changeTagName(props.tag, tagName))
    }
    handleEditName()
  }


  const colorSelector = <Box sx={{ position: 'absolute', zIndex: '2' }}>
    <Box sx={{ position: 'fixed', top: `${colorY}px`, right: '0px', bottom: '0px', left: `${colorX}px`, }}>
      <TwitterPicker color={color} onChange={handleChangeColor} triangle="top-right"></TwitterPicker>
    </Box>
  </Box>

  if (!editName) {
    return (
      <ListItem>
        <IconButton
          onClick={() => setColorPick(!colorPick)}
          sx={{ marginRight: '12px' }}>
          <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
        </IconButton>
        {colorPick ? colorSelector : null}
        <ListItemText>{tagName}</ListItemText>
        <IconButton onClick={handleEditName}><EditIcon></EditIcon></IconButton>
      </ListItem>
    )
  }
  else {
    return (
      <>
        <ListItem>
          <IconButton
            onClick={() => setColorPick(!colorPick)}
            sx={{ marginRight: '12px' }}>
            <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
          </IconButton>
          {colorPick ? colorSelector : null}
          <Input value={tagName} onChange={(event) => setTagName(event.target.value)}></Input>
          <IconButton onClick={dispatchEdit}><CheckIcon></CheckIcon></IconButton>
          <IconButton onClick={handleDeleteDialog}><DeleteIcon></DeleteIcon></IconButton>
        </ListItem>
        <Dialog open={deleteDialog}>
          <DialogTitle>
            Delete tag?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting the tag will delete all the existing tasks with it. It won't delete completed tasks from the history.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialog}>Cancel</Button>
            <Button onClick={dispatchDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function AddTag(props) {
  const [colorPick, setColorPick] = useState(false)
  const [color, setColor] = useState('gray')
  const [tagName, setTagName] = useState('')
  const [addNewTag, setAddNewTag] = useState(false)
  const [alert, setAlert] = useState(false)

  const tags = useSelector((state) => state.tasks.tags)
  const dispatch = useDispatch()

  const colorRef = useRef(null)
  const colorBounding = colorRef.current?.getBoundingClientRect()

  const colorX = colorRef.current ? colorBounding.x - 260 + 16 : 0
  const colorY = colorRef.current ? colorBounding.y + 24 + 12 : 0

  const handleChangeColor = (color) => {
    console.log('Changing color into: ', color, color.hex)
    setColor(color.hex);
    setColorPick(!colorPick)
  }


  const handleAddNewTag = () => {
    setAddNewTag(!addNewTag)
  }

  const handleAlert = () => {
    setAlert(!alert)
  }

  const saveTag = () => {
    let uniqueName = true;
    for (const tagObject of tags) {
      if (tagObject.name === tagName) {
        uniqueName = false;
      }
    }
    if (uniqueName) {
      dispatch(addTag({ name: tagName, color: color }))
      handleAddNewTag()
      console.log('Saved tag,', addNewTag)
    }
    else {
      handleAlert()
    }

  }


  const colorSelector = <Box sx={{ position: 'absolute', zIndex: '2' }}>
    <Box sx={{ position: 'fixed', top: `${colorY}px`, right: '0px', bottom: '0px', left: `${colorX}px`, }}>
      <TwitterPicker color={color} onChange={handleChangeColor} triangle="top-right"></TwitterPicker>
    </Box>
  </Box>



  return (
    <Box>
      <Stack spacing={1}>
        <Collapse in={alert}>
          <Alert
            action={
              <IconButton color="inherit" size="small" onClick={handleAlert}>
                <CloseIcon fontSize="inherit"></CloseIcon>
              </IconButton>}
            severity='error'>
            Please use a unique name for the tag
          </Alert>
        </Collapse>
        <Button onClick={handleAddNewTag} variant="outlined" startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>} sx={{ width: '100%' }}>
          Add new tag
        </Button>
      </Stack>

      {addNewTag
        ? <ListItem>
          <IconButton
            onClick={() => setColorPick(!colorPick)}
            sx={{ marginRight: '12px' }}>
            <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
          </IconButton>
          {colorPick ? colorSelector : null}
          <Input placeholder='New tag' value={tagName} onChange={(event) => setTagName(event.target.value)}></Input>
          <IconButton onClick={saveTag}><CheckIcon></CheckIcon></IconButton>
          <IconButton onClick={handleAddNewTag}><CloseIcon></CloseIcon></IconButton>
        </ListItem>
        : <></>
      }

    </Box>
  )
}

export function TagDialog(props) {
  const tags = useSelector(state => state.tasks.tags)

  const [openTagEdit, setOpenTagEdit] = useState(false)
  const tagSelected = props.tagSelected

  const handleTagSelected = (tagName, tagColor) => {
    props.handleChangeTag(tagName)
    props.handleChangeColor(tagColor)
    props.handleOpenTagSelect()
  }

  const handleOpenTagEdit = () => {
    setOpenTagEdit(!openTagEdit)
  }

  const handleDialogBackDrop = () => {
    props.handleOpenTagSelect()
  }

  if (!openTagEdit) {
    return (<Dialog open={props.openTagSelect}
      onClose={handleDialogBackDrop}
    >
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>Select a tag</DialogTitle>
        <IconButton sx={{ mr: '12px' }} onClick={handleOpenTagEdit}><EditIcon></EditIcon></IconButton>
      </Stack>
      <DialogContent>
        <Grid container spacing={1}>
          {
            tags.map((tagObject, index) => {
              if (tagSelected === tagObject.name) {
                return (
                  <Grid item xs='auto' key={tagObject.name}>
                    <Chip disabled label={tagObject.name} sx={{ backgroundColor: tagObject.color }}></Chip>
                  </Grid>
                )
              }
              else {
                return (
                  <Grid item xs='auto' key={tagObject.name}>
                    <Chip clickable onClick={() => { handleTagSelected(tagObject.name, tagObject.color) }}
                      label={tagObject.name} sx={{ backgroundColor: tagObject.color }}>
                    </Chip>
                  </Grid>
                )
              }
            })
          }
        </Grid>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
    )
  }
  else {
    return (<Dialog open={props.openTagSelect}
      onClose={() => {
        handleDialogBackDrop()
      }
      }
    >
      <DialogTitle><IconButton onClick={handleOpenTagEdit} sx={{ mr: '5px' }}><ArrowBackIcon></ArrowBackIcon></IconButton>Edit tags</DialogTitle>
      <DialogContent>
        <AddTag></AddTag>
        <List>
          {
            tags.map((tagObject, index) => {
              return (
                <TagEntry key={tagObject.name} tag={tagObject.name} color={tagObject.color} index={index}></TagEntry>
              )
            })
          }

        </List>
      </DialogContent>
    </Dialog>
    )
  }
}

export default function TaskList(props) {
  const [deletedTask, setDeletedTask] = useState(null) //saves deleted task, controls redo pop up. after 5s changes are
  //stored in tasks.history via use effect and state turned into null thus disappearing the pop up

  const dispatch = useDispatch()

  const tasks = useSelector(state => state.tasks.tasks)
  console.log(tasks)
  const tags = useSelector(state => state.tasks.tags)
  const calendarDate = useSelector(state => state.app.calendarDate)
  const initializedDate = useSelector(state => state.app.initialized)

  const initialized = initializedDate === format(new Date, 'MM/dd/yyyy')

  function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
  }

  function taskToListEntry(task, firstTask, index) {
    return (
      <ListEntry
        key={task.id}
        text={task.name}
        description={task.description}
        index={index}
        date={task.date}
        type={task.type}
        blocks={task.blocks}
        repeat={task.repeat}
        repeatOn={task.repeatOn}
        tag={task.tag}
        tags={tags}
        firstTask={firstTask}
      ></ListEntry>
    )
  }
  const todayDate = format(new Date, 'MM/dd/yyyy')
  const splitCalendarDate = calendarDate.split('/')
  const [month, calendarDay, year] = splitCalendarDate
  const realCalendarDate = new Date(year, month, calendarDay)
  const day = realCalendarDate.getDay();



  let allTagTasks = []
  /*Task filtering */
  if (initialized === todayDate) {
    console.log('App initialized already')
  }
  else {
    tasks.forEach((task, index) => {
      if (task.repeat !== 'false') {
        if (task.completed)
          dispatch(restartTask(index))
      }
    })
  }
  let firstTaskIndex
  let firstTaskTag
  //irrelevant you could have used one of the abovce but w/e
  let firstTaskAdded = false
  tasks.forEach((task, index) => {
    if (task.repeat !== 'false') {
      if (!task.completed) {
        if (task.repeat === 'daily') {
          allTagTasks.push(taskToListEntry(task, !firstTaskAdded, index))
          if(!firstTaskAdded){
            firstTaskAdded = true
          }
        }
        else {
          for (const dayOfTheWeek of task.repeatOn) {
            if (task.repeatOn[day]) {
              allTagTasks.push(taskToListEntry(task, !firstTaskAdded, index))
              if(!firstTaskAdded){
                firstTaskAdded = true
              }
              break;
            }
          }
        }
      }
    }
    else {
      console.log('printing dates', calendarDate, task.date)
      if (calendarDate === task.date) {
        allTagTasks.push(taskToListEntry(task, !firstTaskAdded, index))
        if(!firstTaskAdded){
          firstTaskAdded = true
        }
      }
    }
    if (!!firstTaskIndex) {//if not initialized
      if (!!allTagTasks.length) { //if task has been added
        firstTaskIndex = index
        firstTaskTag = task.tag
      }
    }

  })

  useEffect(() => {
    if (allTagTasks.length) {
      dispatch(currentTag(firstTaskTag));
      dispatch(currentIndex(firstTaskIndex));
    }
  })


  return (
    <Box>
      <Typography variant="overline" sx={{ pl: 1 }}>Scheduled tasks</Typography>
      <List>
        <Divider></Divider>
        <NewTask></NewTask>
        {allTagTasks}
        <OverdueTaskList open={!initialized}></OverdueTaskList>
      </List>
    </Box>
  )
}

