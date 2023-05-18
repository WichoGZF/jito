import { useDeleteTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { deleteTask } from "features/tasksSlice"
import { setSnackbar, setSnackbarError } from "features/appSlice"
//Actions to do on delete task
export default function useHandleDeleteTask(taskid: number, index: number, onDelete: () => void) { 
    const userid = useAppSelector(state => state.auth.userid)
    const dispatch = useAppDispatch()

    const [deleteTaskMut, deleteResult] = useDeleteTaskMutation()

    async function handleDeleteTask() { 
        try{
            const response = deleteTaskMut({
                userId: userid!,
                taskId: taskid
            }).unwrap() 
            console.log(response)
            dispatch(deleteTask(index));
            onDelete()
            dispatch(setSnackbar("Task deleted!"))
        }
        catch(error){ 
            console.log(error)
            dispatch(setSnackbarError("Error deleting task"))
        }
    }



    return [handleDeleteTask]
}