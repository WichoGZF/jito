import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { List } from '@mui/material';
import Button from '@mui/material/Button'
import { useAppSelector, useAppDispatch } from "hooks";
import { updateDates, deleteDue } from "features/tasksSlice";
import { initialize } from "features/appSlice";
import Task from "types/Task";
import { DueTaskEntry } from "./DueTaskEntry";

interface OverdueTasksProps {
    open: boolean,
    tasks: Task[],
}

export default function OverdueTaskList({ open, tasks }: OverdueTasksProps) {
    const [tasksChecklist, setTaskChecklist] = useState(() => {
        return (tasks.map((task) => false))
    })

    const tags = useAppSelector((state) => state.tasks.tags)
    const dispatch = useAppDispatch()

    const updateInitialized = () => {
        dispatch(initialize())
    }

    const deleteDueTasks = (array) => {
        dispatch(deleteDue(array))

    }

    const updateTasksDates = (array) => {
        dispatch(updateDates(array))
    }

    const handleChecklist = (index:number) => {
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

    const overdueTaskList = tasks.map((task, arrayIndex) => {
        return (
            <DueTaskEntry
                key={'due' + task.id}
                index={arrayIndex}
                checked={tasksChecklist[arrayIndex]}
                id={task.id}
                taskName={task.name}
                tagName={task.tag}
                date={task.date}
                tagColor={getColor(task.tag)}
                onClick={handleChecklist}/>
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


