import { CircleOutlined } from "@mui/icons-material"
import { Typography, IconButton, ListItem, Menu, MenuItem, ListItemIcon, ListItemText, Chip } from "@mui/material"
import { handleCompletedRegular, stopRunning } from "features/appSlice"
import { addTimeEntry, deleteTask, completeTask, reorderTask } from "features/tasksSlice"
import { useState } from "react"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import TaskEdit from './TaskEdit'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import Task from "types/Task"
import useHandleDnd from "hooks/useHandleDnd"
import useHandleDeleteTask from "hooks/useHandleDeleteTask"
import useHandleCreateHistoric from "hooks/useHandleCreateHistoric"
import useHandleUpdateTask from "hooks/useHandleUpdateTask"

interface PropTypes {
  index: number,
  firstTask: boolean,
  task: Task,
}
//A single task list entry.
export default function ListEntry({ task, firstTask, index }: PropTypes) {
  const dispatch = useAppDispatch()

  const rest = useAppSelector((state) => state.app.rest)
  const todayDate = useAppSelector((state) => state.app.todayDate)
  const calendarDate = useAppSelector((state) => state.app.calendarDate)
  const timerState = useAppSelector((state) => state.app.timerState)
  const timerStarted = useAppSelector((state) => state.app.timerStarted)
  const tagColor = useAppSelector((state) => state.tasks.tags.find(tag => tag.name === task.tag)?.color)

  const [onHover, setOnHover] = useState({ display: 'none' })
  const [completeHover, setCompleteHover] = useState(false)
  const [dropDownRef, setDropDownRef] = useState<EventTarget | null>(null)
  const [editTask, setEditTask] = useState(false)
  const [ref, isOver, dragHover] = useHandleDnd(timerState, timerStarted, index)
  //Handlers
  const handleDropDown = (event: MouseEvent) => setDropDownRef(event.currentTarget);

  const handleCloseDropDown = () => {
    setDropDownRef(null);
  }

  const [MutEditTask] = useHandleUpdateTask()
  const [dispatchHistoric] = useHandleCreateHistoric()
  const [MutDeleteTask] = useHandleDeleteTask()

  const handleEditTask = () => {
    setEditTask(!editTask);
    dropDownRef && handleCloseDropDown()
  }

  const onFinishedNormalMut = () => {
    if (task.repeat === "no-repeat") {
      MutDeleteTask(task.id)
    }
    else {
      MutEditTask({
        ...task,
        completed: true,
      })
    }
  }

  const openDropDown = Boolean(dropDownRef)

  let entryIcon
  if (task.type === "block") {
    entryIcon = <Typography sx={{ margin: 1, pl: 1, pr: 1, border: "1px", borderStyle: "solid" }}>{task.blocks}</Typography>
  }
  else {
    if (firstTask && calendarDate === todayDate) {
      entryIcon = <IconButton onClick={
        () => {
          if (!rest) {
            dispatchHistoric()
            dispatch(handleCompletedRegular())
          }
          onFinishedNormalMut()
          dispatch(completeTask(task.id))
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
        <TaskEdit task={task} tagColor={tagColor!} onClose={handleEditTask} index={index} />
      </ListItem>
    )
  }
  else {
    return (
      <ListItem
        ref={ref}
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
              sx={onHover}
              data-cy={`task-options-menu"`}
            >
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
              <MenuItem onClick={handleEditTask} data-cy={`task-options-menu-edit`}>Edit task</MenuItem>
              <MenuItem onClick={() => {
                MutDeleteTask(task.id)
                handleCloseDropDown()
              }}
                data-cy={`task-options-menu-delete`}
              >Delete task</MenuItem>

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
          primary={task.name}
          secondary={task.description} >
        </ListItemText>

        {task.repeat !== 'no-repeat' ? <RepeatIcon sx={{ marginRight: 1, color: "text.secondary" }}></RepeatIcon> : null}
        <Chip label={task.tag} sx={{ backgroundColor: tagColor }}></Chip>
      </ListItem>
    )
  }
}