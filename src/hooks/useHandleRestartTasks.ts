import { usePostBatchRestartMutation } from "features/api/apiSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import Task from "types/Task";
import { restartTask } from "features/tasksSlice";
import { setSnackbarError } from "features/appSlice";
import { setSnackbar } from "features/appSlice";

export default function useHandleBatchRestart() {
    const [postBatchRestart, { data, error, isLoading }] = usePostBatchRestartMutation()

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
    const userid = useAppSelector((state) => state.auth.userid)
    const dispatch = useAppDispatch()

    //Restarts overdue repeatables
    async function restartTasks(): Promise<void> {
        try {
            const response = postBatchRestart(
                {
                    userId: userid!,
                    restartIds: toRestartIds
                }
            ).unwrap()
            console.log(response)
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