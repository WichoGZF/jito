import { useDeleteTagMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { deleteTag } from "features/tasksSlice"
import { setSnackbar, setSnackbarError } from "features/appSlice"

export default function useHandleDeleteTag() {
    const [deleteTagMut, deleteTagResult] = useDeleteTagMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const hasSession = useAppSelector(state => state.auth.hasSession)
    const dispatch = useAppDispatch()
    async function deleteTagHandler(tagId: number) {
        try {
            if (hasSession && (userid !== null)) {
                const response = deleteTagMut(
                    {
                        userId: userid!,
                        tagId: tagId
                    }
                ).unwrap()
                console.log(response)
            }
            dispatch(deleteTag({ id: tagId }))
            dispatch(setSnackbar("Tag deleted!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error deleting tag"))
        }

    }

    return [deleteTagHandler]
}