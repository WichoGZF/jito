import { useUpdateTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { editTask } from "features/tasksSlice"
import Task from 'types/Task'
//Handles saving a task update
export default function useHandleUpdateTask(index: number) {
    const [updateTask, updateResult] = useUpdateTaskMutation()
    const userid = useAppSelector(state => state.auth.userid)

    const dispatch = useAppDispatch()

    async function dispatchEditTask(task: Task) {
        try {
            const response = updateTask(
                {
                    userId: userid!,
                    task: task
                }
            ).unwrap()
            dispatch(editTask(task, index))
        }
        catch (error) {
            console.log(error)
        }
    }

    return [dispatchEditTask]

}