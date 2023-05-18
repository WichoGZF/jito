import { usePostHistoricTaskMutation } from "features/api/apiSlice"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"
import { setSnackbar, setSnackbarError } from "features/appSlice"
import { addTimeEntry } from "features/tasksSlice"
import Historic from "types/HistoricTask"

export default function useHandleCreateHistoric() {
    const [postHistoric, { data, error, isLoading }] = usePostHistoricTaskMutation()
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth.userid)

    const actualTag = useAppSelector(state => state.app.tag)
    const todayDate = useAppSelector(state => state.app.todayDate)
    const pomodoroDuration = useAppSelector(state => state.settings.pomodoroDuration)

    const newHistoricTask = {
        id: 0,
        completeDate: todayDate,
        time: pomodoroDuration,
        tag: actualTag!,
    }

    const createHistoric = async () => {
        try {
            const response = await postHistoric({
                userId: userId!,
                historicTask: newHistoricTask
            }).unwrap()
            console.log(response)
            dispatch(addTimeEntry(todayDate, pomodoroDuration * 60, actualTag!))
            dispatch(setSnackbar("Historic created!"))
        }
        catch (error) {
            console.log
            dispatch(setSnackbarError("Error creating historic"))
        }
    }

    return [createHistoric]
}