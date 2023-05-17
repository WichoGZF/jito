import Tag from "types/Tag";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { usePostTagMutation } from "features/api/apiSlice";
import { addTag } from "features/tasksSlice";

//Updates a certain task
export default function useHandleTagUpdate() {
    const [postTag, postResult] = usePostTagMutation()
    const userid = useAppSelector(state => state.auth.userid)
    const dispatch = useAppDispatch()

    const saveTag = async (newTag: Tag) => {
        try {
            const response = postTag({
                tag: newTag,
                userId: userid!
            }).unwrap()
            console.log(response)
            dispatch(addTag(newTag))
        }
        catch (error) {
            console.log(error)
        }
    }

    return [saveTag]
}