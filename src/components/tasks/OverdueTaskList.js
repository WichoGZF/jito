import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from "react-redux";
import { updateDates, deleteDue } from "features/tasksSlice";
import { initialize } from "features/appSlice";

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

interface PropType {
    open: boolean,
    tasks: any,
}

export default function OverdueTaskList({ open, tasks }: PropType) {
    const [tasksChecklist, setTaskChecklist] = useState(() => {
        return (tasks.map((task) => false))
    })

    const tags = useSelector((state) => state.tasks.tags)
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

    const handleChecklist = (index) => {
        setTaskChecklist((oldState) => {
            const newState = [...oldState]
            newState[index] = !newState[index]
            return newState
        })
    }

    const indexToIdArray = (indexArray) => {
        let idArray = [];
        indexArray.forEach(index => {
            idArray.push(tasks[index].id)
        })
        return idArray;
    }

    let tasksToUpdate = []
    let tasksToDelete = []

    tasksChecklist.forEach((checked, index) => {
        if (checked) {
            tasksToUpdate.push(tasks[index])
        }
        else {
            tasksToDelete.push(tasks[index])
        }
    })

    const getColor = (tagName) => {
        const tag = tags.find(tag => tag.name === tagName)
        return tag.color
    }

    const overdueTaskList = tasks.map((index, arrayIndex) => {
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

    return (
        <Dialog maxWidth='sm' scroll='paper' open={open}>
            <DialogTitle>Import overdue tasks?</DialogTitle>
            <DialogContent>
                <List>
                    {overdueTaskList}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    updateInitialized()
                }}>
                    Discard
                </Button>
                <Button onClick={() => {
                    updateTasksDates(indexToIdArray(tasksToUpdate))
                    deleteDueTasks(indexToIdArray(tasksToDelete))
                    updateInitialized()
                }}>Import</Button>

            </DialogActions>
        </Dialog >
    )
}


