import { useEffect, useMemo } from 'react'
import Task from 'types/Task'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import isBefore from 'date-fns/isBefore'
import { initialize } from 'features/appSlice'
import useHandleBatchRestart from './useHandleRestartTasks'
/*
Initializes completed or partially completed repeatables. Returns past tasks if any.
*/

export default function useInitializeTasks(tasks: Task[], initialized: boolean): [overdueNormals: Task[]] {
    const dispatch = useAppDispatch()
    const [restartTasks] = useHandleBatchRestart()
    const hasSession = useAppSelector(state => state.auth.hasSession)
    //Checks overdue tasks.
    function getInitializeTasks(): Task[] {
        const pastTasks: Task[] = [] //Normal tasks in the past
        //Today date
        const todayDate = new Date
        todayDate.setHours(0, 0, 0, 0)
        tasks.forEach((task: Task, index: number) => {
            if (task.repeat === 'no-repeat') {
                const [year, month, day]: string[] = task.date!.split('-');
                const taskDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
                let dayIsBefore;
                console.log('isBefore:',taskDate, todayDate)
                dayIsBefore = isBefore(taskDate, todayDate)

                if (dayIsBefore) {
                    pastTasks.push(task)

                }
            }
        })

        return (pastTasks)
    }

    let overdueNormals: Task[] = useMemo(() => getInitializeTasks(), [tasks, initialized])


    //Initializes overdue tasks, and pushes past dates into array 
    useEffect(() => {
        if (!initialized) {
            //If there are no overdue normals initialize the app
            if (overdueNormals.length === 0) {
                dispatch(initialize())
                if (hasSession) {
                    restartTasks()
                }
            }
        }
    }, [initialized])
    //Restarts overdue repeatables

    return [overdueNormals]
}