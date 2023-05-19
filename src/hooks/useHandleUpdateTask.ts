import { useUpdateTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { editTask } from "features/tasksSlice"
import Task from 'types/Task'
import { setSnackbar, setSnackbarError } from "features/appSlice"

//Handles saving a task update
export default function useHandleUpdateTask() {
    const [updateTask, updateResult] = useUpdateTaskMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const hasSession = useAppSelector(state => state.auth.hasSession)
    const dispatch = useAppDispatch()

    async function dispatchEditTask(task: Task) {
        try {
            if (hasSession && (userid !== null)) {
                const response = updateTask({
                    userId: userid!,
                    task: task
                }
                ).unwrap()
                console.log(response)
            }
            dispatch(editTask(task))
            dispatch(setSnackbar("Task updated!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error updating task"))
        }
    }

    return [dispatchEditTask]

}