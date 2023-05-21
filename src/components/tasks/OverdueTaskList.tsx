import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { List } from '@mui/material';
import Button from '@mui/material/Button'
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import { initialize } from "features/appSlice";
import Task from "types/Task";
import { DueTaskEntry } from "./DueTaskEntry";
import useHandleBatchInitialize from "hooks/useHandleBatchInitialize";
import useHandleBatchRestart from "hooks/useHandleRestartTasks";

interface OverdueTasksProps {
    open: boolean,
    tasks: Task[],
}

export default function OverdueTaskList({ open, tasks }: OverdueTasksProps) {
    const [tasksChecklist, setTaskChecklist] = useState(tasks.map(() => false))

    const [batchInitialize] = useHandleBatchInitialize()
    const [batchRestart] = useHandleBatchRestart()

    const tags = useAppSelector((state) => state.tasks.tags)
    const dispatch = useAppDispatch()

    const handleChecklist = (index: number) => {
        setTaskChecklist((oldState) => {
            const newState = [...oldState]
            newState[index] = !newState[index]
            return newState
        })
    }

    let tasksToUpdate: number[] = []
    let tasksToDelete: number[] = []

    if (tasks.length !== 0) {
        tasksChecklist.forEach((checked, index) => {
            if (checked) {
                tasksToUpdate.push(tasks[index].id)
            }
            else {
                tasksToDelete.push(tasks[index].id)
            }
        })
    }


    const getColor = (tagName: string) => {
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
                onClick={handleChecklist} />
        )
    })
    //Reset checklist when tasks change
    useEffect(() => {
        setTaskChecklist(tasks.map(() => false))
    }, [tasks])

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
                    batchRestart()
                    dispatch(initialize())
                }}>
                    Discard
                </Button>
                <Button onClick={() => {
                    batchRestart()
                    batchInitialize(tasksToUpdate, tasksToDelete)
                    dispatch(initialize())
                }}>Import</Button>

            </DialogActions>
        </Dialog >
    )
}


