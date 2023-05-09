import { useEffect, useRef } from 'react'
import midnightWorker from 'midnightWorker'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { startNewDay } from 'features/appSlice'
import { format } from 'date-fns';
/*
Checks if day is outdated and resets the day once it reaches 0.
*/

const composeResetDay = () => (dispatch, getState) => {
    dispatch(startNewDay(getState().settings.pomodoroDuration))
}
const milisecondsInDay = (24 * 60 * 60 * 1000)

export default function useMidnightClock() {
    const todayDate = useAppSelector((state) => state.app.todayDate)

    const dispatch = useAppDispatch()
    const worker = useRef<Worker>()
    //Establishing worker 
    useEffect(() => {
        worker.current! = new Worker(midnightWorker)
        return () => {
            worker!.current!.terminate();
        }
    }, [])

    //Check if the day has been shown yet 
    useEffect(() => {
        //Fetch actual date to see if todayDate is outdated
        const actualDate = format(new Date(), 'MM/dd/yyyy')
        if (actualDate !== todayDate) {
            dispatch(composeResetDay());
        }
    }, [])
    //Worker logic and setting the clock. 
    useEffect(() => {
        function eventHandler() {
            console.log('New day started');
            dispatch(composeResetDay());
        }
        //Actual timestamp
        const timestamp = new Date();
        //Timestamp converted to miliseconds 
        const timestampMiliseconds = (timestamp.getHours() * 60 * 60 * 1000) + (timestamp.getMinutes() * 60 * 1000) + (timestamp.getSeconds() * 1000);
        //Miliseconds remaining until rest
        const remainingMiliseconds = (milisecondsInDay) - timestampMiliseconds;
        worker.current!.postMessage(remainingMiliseconds)
        worker.current!.addEventListener('message', eventHandler);
        return () => {
            worker.current!.removeEventListener('message', eventHandler)
        }
    }, [todayDate])

}