import { CircleOutlined } from "@mui/icons-material"
import { Typography, IconButton, ListItem, Menu, MenuItem, ListItemIcon, ListItemText, Chip } from "@mui/material"
import { handleCompletedRegular, stopRunning } from "features/appSlice"
import { addTimeEntry, deleteTask, completeTask, reorderTask } from "features/tasksSlice"
import { useState, useRef } from "react"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import TaskInput from "./TaskInput"
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import Tag from "types/Tag"
import { useDeleteTaskMutation } from "features/api/apiSlice"
import useHandleDnd from "hooks/useHandleDnd"

//Dispatches the time entry for the statistics and also dispatches the 'rest' time accumulated. 
const composeCompleteEntry = (tag) => (dispatch, getState) => {
  const rest = getState().app.rest

  const secondsRemaining = getState().app.minutes * 60 + getState().app.seconds
  const totalSeconds = getState().settings.pomodoroDuration * 60
  const todayDate = getState().app.todayDate
  const secondsElapsed = totalSeconds - secondsRemaining
  dispatch(addTimeEntry(todayDate, secondsElapsed, tag))
}

interface PropTypes {
  key: string,
  id: number,
  text: string,
  description: string,
  index: number,
  date: string | null,
  type: 'normal' | 'block', // for types
  blocks: number | null,
  repeat: 'daily' | 'weekly' | 'no-repeat',
  repeatOn: boolean[],
  tag: string,
  tags: Tag[],
  firstTask: boolean,
  completed: boolean,
}
//A single task list entry.
export default function ListEntry(props: PropTypes) {

  const dispatch = useAppDispatch()

  const rest = useAppSelector((state) => state.app.rest)
  const todayDate = useAppSelector((state) => state.app.todayDate)
  const calendarDate = useAppSelector((state) => state.app.calendarDate)

  const timerState = useAppSelector((state) => state.app.timerState)
  const timerStarted = useAppSelector((state) => state.app.timerStarted)

  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)


  const [dropDownRef, setDropDownRef] = useState<EventTarget | null>(null)
  const [editTask, setEditTask] = useState(false)

  const userid = useAppSelector(state => state.auth.userid)

  const [deleteTaskMut, deleteResult] = useDeleteTaskMutation()

  const [ref, isOver, dragHover] = useHandleDnd(timerState, timerStarted, props.index)

  const handleDropDown = (event: MouseEvent) => setDropDownRef(event.currentTarget);

  const openDropDown = Boolean(dropDownRef)

  const handleCloseDropDown = () => {
    setDropDownRef(null);
  }

  const handleEditTask = () => {
    setEditTask(!editTask);
    dropDownRef && handleCloseDropDown()
  }

  const handleDeleteTask = () => {
    deleteTaskMut({
      userId: userid!,
      taskId: props.id
    }).then(fulfilled => console.log(fulfilled)).catch(rejected => console.log(rejected))
    dispatch(deleteTask(props.index));
    handleCloseDropDown();
  }


  const dispatchCompleteTask = () => {
    dispatch(completeTask(props.index))
  }

  const dispatchTimeEntry = () => {
    dispatch(composeCompleteEntry(props.tag))
  }


  const tagWhole = props.tags.find(tag => tag.name === props.tag)
  const tagColor = tagWhole.color

  let entryIcon
  if (props.type === "block") {
    entryIcon = <Typography sx={{ margin: 1, pl: 1, pr: 1, border: "1px", borderStyle: "solid" }}>{props.blocks}</Typography>
  }
  else {
    if (props.firstTask && calendarDate === todayDate) {
      entryIcon = <IconButton onClick={
        () => {
          if (!rest) {
            dispatchTimeEntry()
            dispatch(handleCompletedRegular())
          }
          dispatchCompleteTask()
          dispatch(stopRunning())
        }

      }>{completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}</IconButton>
    }
    else {
      entryIcon = <IconButton disabled>{completeHover ? <CheckOutlinedIcon></CheckOutlinedIcon> : <CircleOutlined></CircleOutlined>}</IconButton>
    }
  }

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

  if (editTask) {
    return (
      <ListItem>
        <TaskInput
          edit={true}
          id={props.id}
          name={props.text}
          description={props.description}
          tag={props.tag}
          type={props.type}
          blocks={props.blocks}
          repeat={props.repeat}
          repeatOn={props.repeatOn}
          index={props.index}
          tagColor={tagColor}
          handleTaskSelectClose={handleEditTask}
        />
      </ListItem>
    )
  }
  else {
    return (
      <ListItem
        ref={ref}
        key={'primary' + String(props.id)}
        sx={{
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          borderBottom: borderBottom,
          borderTop: borderTop,
          borderColor: (timerStarted || timerState) ? "gray" : "primary.main"
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
              <MenuItem onClick={handleDeleteTask} >Delete task</MenuItem>

            </Menu>
          </>

        }>
        <ListItemIcon
          onMouseEnter={(e) => setCompleteHover(true)}
          onMouseLeave={(e) => setCompleteHover(false)}
        >
          {entryIcon}

        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ color: "text.primary" }}
          primary={props.text}
          secondary={props.description} >
        </ListItemText>

        {props.repeat !== 'no-repeat' ? <RepeatIcon sx={{ marginRight: 1, color: "text.secondary" }}></RepeatIcon> : null}
        <Chip label={props.tag} sx={{ backgroundColor: tagColor }}></Chip>
      </ListItem>
    )
  }
}