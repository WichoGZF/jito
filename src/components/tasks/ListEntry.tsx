import { CircleOutlined } from "@mui/icons-material"
import { Typography, IconButton, ListItem, Menu, MenuItem, ListItemIcon, ListItemText, Chip } from "@mui/material"
import { ItemTypes } from "components/ItemTypes"
import { handleCompletedRegular, stopRunning } from "features/appSlice"
import { addTimeEntry, deleteTask, completeTask, reorderTask } from "features/tasksSlice"
import { useState, useRef } from "react"
import { useDrop, useDrag } from "react-dnd"
import { useAppDispatch, useAppSelector } from "hooks"
import TaskInput from "./TaskInput"
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import Tag from "types/Tag"

//Dispatches the time entry for the statistics and also dispatches the 'rest' time accumulated. 
const composeCompleteEntry = (tag) => (dispatch, getState) => {
    const rest = getState().app.rest
  
    const secondsRemaining = getState().app.minutes * 60 + getState().app.seconds
    const totalSeconds = getState().settings.pomodoroDuration * 60
    const todayDate = getState().app.todayDate
    const secondsElapsed = totalSeconds - secondsRemaining
    dispatch(addTimeEntry(todayDate, secondsElapsed, tag))
  }
  
  interface PropTypes{
        key: string, 
        text: string,
        description: string,
        index: number,
        date: string|null,
        type: 'normal' | 'block', // for types
        blocks: number | null,
        repeat: 'daily' | 'weekly' | 'false', 
        repeatOn: number[],
        tag: string, 
        tags: Tag[], 
        firstTask: boolean,
  }  
  //Rendering first task
 export default function ListEntry(props: PropTypes) {
  
    const dispatch = useAppDispatch()
  
    const rest = useAppSelector((state) => state.app.rest)
    const todayDate = useAppSelector((state) => state.app.todayDate)
    const calendarDate = useAppSelector((state) => state.app.calendarDate)
  
    const timerState = useAppSelector((state) => state.app.timerState)
    const timerStarted = useAppSelector((state) => state.app.timerStarted)
  
    const [onHover, setOnHover] = useState({ display: 'none' })
    const [completeHover, setCompleteHover] = useState(false)
  
    const [dragHover, setDragHover] = useState(null)
  
    const [dropDownRef, setDropDownRef] = useState(null)
    const [editTask, setEditTask] = useState(false)
  
    const handleDragHover = () => setDragHover(null);
  
    const handleDropDown = (event) => setDropDownRef(event.currentTarget);
  
    const openDropDown = Boolean(dropDownRef)
  
    const handleCloseDropDown = () => {
      setDropDownRef(false);
    }
  
    const handleEditTask = () => {
      setEditTask(!editTask);
      dropDownRef && handleCloseDropDown()
    }
  
    const handleDeleteTask = () => {
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
  
        if (timerState || timerStarted) {
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
              index={props.index}
              tagColor={tagColor}
              handleTaskSelectClose={handleEditTask}
            />
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
  
            {props.repeat !== 'false' ? <RepeatIcon sx={{ marginRight: 1, color: "text.secondary" }}></RepeatIcon> : null}
            <Chip label={props.tag} sx={{ backgroundColor: tagColor }}></Chip>
          </ListItem>
        </>
      )
    }
  }