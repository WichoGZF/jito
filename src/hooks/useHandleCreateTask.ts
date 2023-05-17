import { usePostTaskMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import Task from 'types/Task'

export default function useHandleCreateTask() {
    const [postTask, postResult] = usePostTaskMutation()
    const userid = useAppSelector(state => state.auth.userid)
    
    async function createTask(task: Task){
        try {
            const response = await postTask(
                {
                    userId: userid!,
                    task: task
                }
            ).unwrap()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    return [createTask]
}