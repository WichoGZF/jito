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
    const hasSession = useAppSelector((state) => state.auth.hasSession)
    const maxTagId = useAppSelector((state) => state.tasks.tags.reduce((max, tag) => (tag.id > max ? tag.id : max), 0))
    const dispatch = useAppDispatch()

    async function postTag(newtag: Tag) {
        try {
            let newTagWithId: Tag
            if (hasSession && (userId !== null)) {
                const tagPostInfo = {
                    userId: userId!,
                    tag: newtag
                }
                const response = await createTag(tagPostInfo).unwrap()
                console.log(response)
                newTagWithId = {
                    ...newtag,
                    id: response, 
                }
            }
            else { // If there is no session, we can't get the id from the server. So we create a new id.
                newTagWithId = {
                    ...newtag,
                    id: maxTagId + 1,
                }
            }   
  
            dispatch(addTag(newTagWithId))
            dispatch(setSnackbar("Tag created!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error creating tag"))
        }
    }

    return [postTag]
}