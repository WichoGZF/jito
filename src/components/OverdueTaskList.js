import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { TaskAltSharp } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { updateDates } from "../features/tasksSlice.js";
import { initialize } from "../features/appSlice.js";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore";

const DueTaskEntry = (props) => {

    return (
        <ListItem
            key={props.id}
            disablePadding>
            <ListItemButton onClick={()=> props.onClick(props.index)} sx={{ marginRight: '1' }}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={props.checked}
                    ></Checkbox>
                </ListItemIcon>
                <ListItemText>
                    {props.taskName} {props.date}
                </ListItemText>
                <Chip label={props.tagName} sx={{ backgroundColor: props.tagColor, marginLeft: '15px' }}></Chip>
            </ListItemButton>

        </ListItem>
    )
}

export default function OverdueTaskList(props) {
    const tags = useSelector((state) => state.tasks.tags)
    const tasks = useSelector((state) => state.tasks.tasks)

    const dispatch = useDispatch()

    const updateInitialized = () => {
        dispatch(initialize())
    }

    const updateTasksDates = (array) => {
        dispatch(updateDates(array))
    }


    const todayDate = new Date

    let overdueTasks = []
    tasks.forEach( (task, index) => {
        if (task.repeat === 'false') {
            const dateArray = task.date.split('/')
            const [month, day, year] = dateArray
            const taskDate = new Date(year, month, day)

            const isTaskBefore = isBefore(todayDate, taskDate)
            if (isTaskBefore) {
                overdueTasks.push(index)
            }
        }
    })

    console.log(overdueTasks)

    const [tasksChecklist, setTaskChecklist] = useState(() => {
        return(overdueTasks.map((task)=> false))
    })

    let tasksToUpdate = []
    tasksChecklist.forEach( (checked, index) => {
        if(checked){
            tasksToUpdate.push(overdueTasks[index])
        }
    })

    const handleChecklist = (index) => {
        setTaskChecklist((oldState) => {
            const newState = [...oldState]
            newState[index] = !newState[index]
            return newState
        })
    }

    
    const getColor = (tagName) => {
        const tag = tags.find(tag => tag.name === tagName)
        return tag.color
    }

    const overdueTaskList = overdueTasks.map( (index, arrayIndex) => {
        return (
            <DueTaskEntry
                key={tasks[index].id}
                index={arrayIndex}
                checked = {tasksChecklist[arrayIndex]}
                id={tasks[index].id}
                taskName={tasks[index].name}
                tagName={tasks[index].tag}
                tagColor={getColor(tasks[index].tag)}
                onClick={handleChecklist}>
            </DueTaskEntry>
        )
    })

    return (
        <Dialog open={props.open}>
            <DialogTitle>Import overdue tasks?</DialogTitle>
            <DialogContent>
                <List>
                    {overdueTaskList}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={updateInitialized}>Discard</Button>
                <Button onClick={()=>{
                    updateTasksDates(tasksToUpdate)
                    updateInitialized()

                }}>Import</Button>
            </DialogActions>
        </Dialog>
    )
}

