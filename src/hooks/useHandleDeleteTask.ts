import { useDeleteTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { deleteTask } from "features/tasksSlice"
import { setSnackbar, setSnackbarError } from "features/appSlice"
//Actions to do on delete task
export default function useHandleDeleteTask() { 
    const userid = useAppSelector(state => state.auth.userid)
    const dispatch = useAppDispatch()

    const [deleteTaskMut, deleteResult] = useDeleteTaskMutation()

    async function handleDeleteTask(taskId: number) { 
        try{
            const response = deleteTaskMut({
                userId: userid!,
                taskId: taskId
            }).unwrap() 
            console.log(response)
            dispatch(deleteTask(taskId));
            dispatch(setSnackbar("Task deleted!"))
        }
        catch(error){ 
            console.log(error)
            dispatch(setSnackbarError("Error deleting task"))
        }
    }



    return [handleDeleteTask]
}