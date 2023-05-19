import { usePostBatchRestartMutation } from "features/api/apiSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import Task from "types/Task";
import { restartTask } from "features/tasksSlice";
import { setSnackbarError } from "features/appSlice";
import { setSnackbar } from "features/appSlice";

export default function useHandleBatchRestart() {
    const [postBatchRestart, { data, error, isLoading }] = usePostBatchRestartMutation()
    const userid = useAppSelector((state) => state.auth.userid)
    const hasSession = useAppSelector((state) => state.auth.hasSession)
    const dispatch = useAppDispatch()

    const toRestartIds = useAppSelector((state) => {
        return (
            state.tasks.tasks.filter((task: Task) => {
                if (task.repeat !== 'no-repeat') {
                    if (task.completed || task.defaultBlocks > task.blocks!) { //Since is repeatable task.blocks isnt empty
                        return true
                    }
                }
                return false
            }).map((task: Task) => task.id))
    })

    //Restarts overdue repeatables
    async function restartTasks(): Promise<void> {
        try {
            if (hasSession && (userid !== null)) {
                const response = postBatchRestart(
                    {
                        userId: userid!,
                        restartIds: toRestartIds
                    }
                ).unwrap()
                console.log(response)
            }
            dispatch(restartTask(toRestartIds))
            dispatch(setSnackbar("Tasks restarted!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error restarting tasks"))
        }
    }

    return [restartTasks]
}