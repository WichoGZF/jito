import Tag from "types/Tag";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { usePostTagMutation, useUpdateTagMutation } from "features/api/apiSlice";
import { updateTag } from "features/tasksSlice";


//Updates a certain task
export default function useHandleUpdateTag() {
    const [updateTagMutation, updateTagResult] = useUpdateTagMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const dispatch = useAppDispatch()

    const saveTag = async (newTag: Tag) => {
        try {
            const response = updateTagMutation({
                tag: newTag,
                userId: userid!
            }).unwrap()
            console.log(response)
            dispatch(updateTag({newTag: newTag}))
        }
        catch (error) {
            console.log(error)
        }
    }

    return [saveTag]
}

