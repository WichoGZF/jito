import { usePostTagMutation } from "features/api/apiSlice";
import Tag from "types/Tag";
import { useAppDispatch } from "./useAppDispatch";
import { addTag } from "features/tasksSlice";
import { useAppSelector } from "./useAppSelector";
import { setSnackbar } from "features/appSlice";
import { setSnackbarError } from "features/appSlice";

export default function useHandleCreateTag() {
    const [createTag, { data, error, isLoading }] = usePostTagMutation()
    const userId = useAppSelector((state) => state.auth.userid)
    const dispatch = useAppDispatch()

    async function postTag(newtag: Tag) {
        try {
            const tagPostInfo = {
                userId: userId!,
                tag: newtag
            }
            const response = await createTag(tagPostInfo).unwrap()
            console.log(response)
            dispatch(addTag(newtag))
            dispatch(setSnackbar("Tag created!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error creating tag"))
        }
    }

    return [postTag]
}