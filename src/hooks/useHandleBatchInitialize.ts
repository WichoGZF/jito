import { usePostBatchInitializeMutation } from "features/api/apiSlice"
import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { initialize, setSnackbar } from "features/appSlice"
import { setSnackbarError } from "features/appSlice"
import { updateDates } from "features/tasksSlice"
import { deleteDue } from "features/tasksSlice"
import format from "date-fns/format"

export default function useHandleBatchInitialize() {
    const [postBatchInitialize] = usePostBatchInitializeMutation()
    const userId = useAppSelector((state) => state.auth.userid)
    const hasSession = useAppSelector((state) => state.auth.hasSession)
    const dispatch = useAppDispatch()

    async function initializeTasks(initializeIds: number[], deleteIds: number[]): Promise<void> {
        const date = format(new Date(), "dd/LL/yy")
        try {
            if (hasSession && (userId !== null)) {
                const response = await postBatchInitialize({
                    date: date,
                    userId: userId!,
                    updateIds: initializeIds,
                    deleteIds: deleteIds

                }).unwrap()
                console.log(response)
            }
            dispatch(updateDates(initializeIds))
            dispatch(deleteDue(deleteIds))
            dispatch(setSnackbar("Tasks initialized!"))
        }
        catch (error) {
            console.log(error)
            dispatch(setSnackbarError("Error initializing tasks"))
        }
    }

    return [initializeTasks]
}