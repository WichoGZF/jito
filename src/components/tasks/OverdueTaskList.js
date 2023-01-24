import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from "react-redux";
import { updateDates, deleteDue } from "features/tasksSlice.js";
import { initialize } from "features/appSlice.js";
import isBefore from "date-fns/isBefore";
import add from 'date-fns/add'

const DueTaskEntry = (props) => {

    return (
        <ListItem
            key={props.id}
            disablePadding>
            <ListItemButton onClick={() => props.onClick(props.index)} sx={{ marginRight: '1' }}>
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
    const hoursPastMidnight = useSelector((state) => state.settings.hoursPastMidnight)
    const dispatch = useDispatch()

    const updateInitialized = () => {
        dispatch(initialize())
    }

    const deleteDueTasks = (array) => {
        dispatch(deleteDue(array))

    }

    const updateTasksDates = (array) => {
        dispatch(updateDates(array))
    }

    const indexToIdArray = (indexArray) => {
        let idArray = [];
        indexArray.forEach(index => {
            idArray.push(tasks[index].id)
        })
        return idArray;
    }

    const todayDate = new Date
    todayDate.setHours(0, 0, 0, 0)

    let overdueTasks = []
    tasks.forEach((task, index) => {
        if (task.repeat === 'false') {
            const dateArray = task.date.split('/')
            const [month, day, year] = dateArray
            const taskDate = new Date(year, month-1, day)
            let dayIsBefore;
            if (!!hoursPastMidnight) {
                add(todayDate, {
                    years: 0,
                    months: 0,
                    weeks: 0,
                    days: 1,
                    hours: hoursPastMidnight,
                    minutes: 0,
                    seconds: 0,
                })
            }
            dayIsBefore = isBefore(taskDate, todayDate)

            if (dayIsBefore) {
                overdueTasks.push(index)
            }
        }
    })

    const [tasksChecklist, setTaskChecklist] = useState(() => {
        return (overdueTasks.map((task) => false))
    })

    let tasksToUpdate = []
    let tasksToDelete = []
    tasksChecklist.forEach((checked, index) => {
        if (checked) {
            tasksToUpdate.push(overdueTasks[index])
        }
        else {
            tasksToDelete.push(overdueTasks[index])
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

    const overdueTaskList = overdueTasks.map((index, arrayIndex) => {
        return (
            <DueTaskEntry
                key={'due' + tasks[index].id}
                index={arrayIndex}
                checked={tasksChecklist[arrayIndex]}
                id={tasks[index].id}
                taskName={tasks[index].name}
                tagName={tasks[index].tag}
                tagColor={getColor(tasks[index].tag)}
                onClick={handleChecklist}>
            </DueTaskEntry>
        )
    })

    useEffect(() => {
        if(!!overdueTaskList.length){
            updateInitialized()
        }
    
      })

    if (!!overdueTaskList.length) {
        return (
            <Dialog open={props.open}>
                <DialogTitle>Import overdue tasks?</DialogTitle>
                <DialogContent>
                    <List>
                        {overdueTaskList}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        updateTasksDates(indexToIdArray(tasksToUpdate))
                        deleteDueTasks(indexToIdArray(tasksToDelete))
                    }}>Import</Button>
                </DialogActions>
            </Dialog>
        )
    }
    else {
        return (<></>);
    }

}

