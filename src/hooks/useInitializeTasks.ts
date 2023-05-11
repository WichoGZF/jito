import {useEffect} from 'react'
import Task from 'types/Task'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import isBefore from 'date-fns/isBefore'
import { restartTask } from 'features/tasksSlice'
import { initialize } from 'features/appSlice'
/*
Initializes completed or partially completed repeatables. Returns past tasks if any.
*/

export default function useInitializeTasks(tasks: Task[], initialized: boolean):[overdueNormals: Task[]] {
    const dispatch = useAppDispatch()

    let overdueNormals: Task[] = []
    //Checks overdue tasks.
    function initializeTasks() {
        const nonInitialized: number[] = [] //Repeatable tasks with past history
        const pastTasks: Task[] = [] //Normal tasks in the past
        //Today date
        const todayDate = new Date
        todayDate.setHours(0, 0, 0, 0)
        tasks.forEach((task: Task, index: number) => {
            if (task.repeat !== 'no-repeat') {
                if (task.completed || task.defaultBlocks > task.blocks!) { //Since is repeatable task.blocks isnt empty
                    nonInitialized.push(index)
                }
            }
            else {
                const dateArray: string[] = task.date!.split('/');
                const taskDate = new Date(parseInt(dateArray[2]), parseInt(dateArray[0]) - 1, parseInt(dateArray[1]))
                let dayIsBefore;
                dayIsBefore = isBefore(taskDate, todayDate)

                if (dayIsBefore) {
                    pastTasks.push(task)
                }
            }
        })
        dispatch(restartTask(nonInitialized))
        return (pastTasks)
    }
    //Initializes overdue tasks, and pushes past dates into array 
    useEffect(() => {
        if (!initialized) {
            overdueNormals = initializeTasks()
            //If there are no overdue normals initialize the app
            if (overdueNormals.length === 0) {
                dispatch(initialize())
            }
        }
    }, [initialized])
    
    return [overdueNormals]
}