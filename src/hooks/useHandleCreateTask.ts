import { usePostTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { addTask } from "features/tasksSlice"
import { setSnackbar, setSnackbarError } from "features/appSlice"
import Task from 'types/Task'

export default function useHandleCreateTask() {
    const [postTask, { data, isSuccess, isError }] = usePostTaskMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const hasSession = useAppSelector(state => state.auth.hasSession)
    const maxTaskId = useAppSelector(state => state.tasks.tasks.reduce((max, task) => (task.id > max ? task.id : max), 0))
    const dispatch = useAppDispatch()
    async function createTask(task: Task) {
        try {
            let newTask: Task
            if (hasSession && (userid !== null)) {
                const response = await postTask(
                    {
                        userId: userid!,
                        task: task
                    }
                ).unwrap()
                console.log(response)
                newTask = {
                    ...task,
                    id: response
                }
            }else{
                newTask = {
                    ...task,
                    id: maxTaskId + 1
                }
            }

            dispatch(addTask(newTask))
            dispatch(setSnackbar("Task created!"))
        } catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error creating task"))
        }
    }

    return [createTask]
}