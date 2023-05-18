import { usePostTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { addTask } from "features/tasksSlice"
import { setSnackbar, setSnackbarError } from "features/appSlice"
import Task from 'types/Task'

export default function useHandleCreateTask() {
    const [postTask, {data, isSuccess, isError}] = usePostTaskMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const dispatch = useAppDispatch()
    async function createTask(task: Task){
        try {
            const response = await postTask(
                {
                    userId: userid!,
                    task: task
                }
            ).unwrap()
            console.log(response)
            dispatch(addTask({
                ...task, 
                id: response
            }))
            dispatch(setSnackbar("Task created!"))
        } catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error creating task"))
        }
    }
    
    return [createTask]
}