import { useDeleteTagMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { deleteTag } from "features/tasksSlice"

export default function useHandleDeleteTag(){ 
    const [deleteTagMut, deleteTagResult] = useDeleteTagMutation()
    const userid = useAppSelector(state => state.auth.userid)   
    const dispatch = useAppDispatch()
    async function deleteTagHandler(tagId: number){ 
        try{
            const response = deleteTagMut(
                {
                  userId: userid!, 
                  tagId: tagId
                }
              ).unwrap()
            console.log(response)
            dispatch(deleteTag({id: tagId}))
        }
        catch(error){ 
            console.log(error)
        }
    
    }

    return [deleteTagHandler]
}