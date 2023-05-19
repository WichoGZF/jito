import Tag from "types/Tag";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { usePostTagMutation, useUpdateTagMutation } from "features/api/apiSlice";
import { updateTag } from "features/tasksSlice";
import { setSnackbar, setSnackbarError } from "features/appSlice"

//Updates a certain task
export default function useHandleUpdateTag() {
    const [updateTagMutation, updateTagResult] = useUpdateTagMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const hasSession = useAppSelector(state => state.auth.hasSession)
    const dispatch = useAppDispatch()

    const saveTag = async (newTag: Tag) => {
        try {
            if (hasSession && (userid !== null)) {
                const response = updateTagMutation({
                    tag: newTag,
                    userId: userid!
                }).unwrap()
                console.log(response)
            }
            dispatch(updateTag({ newTag: newTag }))
            dispatch(setSnackbar("Tag updated!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error updating tag"))
        }
    }

    return [saveTag]
}

