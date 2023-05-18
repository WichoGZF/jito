import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import { act } from 'react-dom/test-utils'

const fullDate = new Date
const todayDate = format(fullDate, 'MM/dd/yyyy')
const hours = fullDate.getHours()
const minutes = fullDate.getMinutes()
const minutesPastMidnight = minutes + (hours * 60)

interface Time { 
    minutes: number, 
    seconds: number,
}

type FormattedDate = string

type Tag = string

type TaskType = 'normal' | 'block'

interface StateType {
    calendarDate: FormattedDate, 
    initialized: FormattedDate, 
    todayDate: FormattedDate, 
    tag: Tag | null, 
    index: number | null, 
    type: TaskType | null, 
    timerState: boolean, 
    rest: boolean, 
    timerStarted: boolean, 
    minutes: number,
    seconds: number, 
    completedRegular: boolean, 
    normalTriggeredRest: boolean, 
    storedTime: number, 
    pomodoros: number, 
    snackbar: boolean,
    snackbarMessage: string,
    snackbarError: boolean,
    snackbarErrorMessage: string,
}

//Type property is not used, should be removed. 
const initialState: StateType = {
    //Dates
    calendarDate: todayDate,
    initialized: format(new Date(2022, 5, 23), 'MM/dd/yyyy'), //move into tasks slice
    todayDate: todayDate,
    //First task properties
    tag: null,
    index: null,
    type: null, 
    //Clock timer state
    timerState: false,
    rest: false,
    timerStarted: false,
    //Clock timer time 
    minutes: 0,
    seconds: 0,
    //'Regular task' completion time
    completedRegular: false,  
    normalTriggeredRest: false,
    storedTime: 0, //The time stored
    pomodoros: 0, //The ammount of pomodoros until now that have been completed. 
    snackbar: false, 
    snackbarMessage: '',
    snackbarError: false,
    snackbarErrorMessage: '',
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        startRunning: (state) => {
            state.timerState = true
        },
        stopRunning: (state) => {
            state.timerState = false
        },
        startRest: (state) => {
            state.rest = true
        },
        endRest: (state) => {
            state.rest = false
        },
        timerHasStarted: (state) => {
            state.timerStarted = true
        },
        timerNotStarted: (state) => {
            state.timerStarted = false
        },
        setCalendarDate: (state, action: PayloadAction<FormattedDate>) => {
            const date = action.payload
            console.log(action.payload)
            state.calendarDate = date
        },
        currentTag: (state, action: PayloadAction<Tag>) => {
            const tag = action.payload;
            state.tag = tag
        },
        currentIndex: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.index = index
        },
        currentType: (state, action: PayloadAction<TaskType>)  => {
            const type = action.payload; 
            state.type = type
        },
        initialize: (state) => {
            state.initialized = format(new Date, 'MM/dd/yyyy')
        },
        startNewDay: (state, action: PayloadAction<number>) => {
            //Calendar time
            state.calendarDate = format(new Date, 'MM/dd/yyyy')
            state.todayDate = format(new Date, 'MM/dd/yyyy')
            //Other settings reset
            state.timerState = false
            state.rest = false
            state.timerStarted = false
            //Clock timer time 
            state.minutes = action.payload
            state.seconds = 0
            //'Regular task' completion time
            state.completedRegular = false  
            state.normalTriggeredRest = false
            state.storedTime = 0 //The time stored
            //reset pomdoros 
            state.pomodoros = 0 
            
        },
        establishPomodoroTime: { //QoL Misleading name, not only it encompasses pomodoros but also rests
            reducer(state, action: PayloadAction<Time>) {
                const { minutes, seconds } = action.payload
                state.minutes = minutes
                state.seconds = seconds
            },
            prepare(minutes, seconds) {
                return {
                    payload: {
                        minutes: minutes,
                        seconds: seconds,
                    }
                }
            }

        },
        handleCompletedRegular: (state) => {
            if(state.timerStarted){
            state.completedRegular = !state.completedRegular
        }
        },
        setStoredTime: (state, action: PayloadAction<number>) => {
            state.storedTime = action.payload //In seconds 
        },
        setNormalTriggeredRest: (state) => {
            state.normalTriggeredRest = true
        },
        disableNormalTriggeredRest: (state) => {
            state.normalTriggeredRest = false
        },
        resetPomodoros: (state) => { 
            state.pomodoros = 0; 
        },
        increasePomodoros: (state) => { 
            state.pomodoros++; 
        },
        setSnackbar: (state, action: PayloadAction<string>) => {
            state.snackbar = true
            state.snackbarMessage = action.payload
        }, 
        setSnackbarError: (state, action: PayloadAction<string>) => {
            state.snackbarError = true
            state.snackbarErrorMessage = action.payload
        },
        unsetSnackbar: (state) => { 
            state.snackbar = false
            state.snackbarMessage = ""
        },
        unsetSnackbarError: (state) => {
            state.snackbarError = false, 
            state.snackbarErrorMessage = ""
        }
    }
})
//Could wrap the three 'current' reducers into a single one
export const { startRunning, stopRunning, startRest, endRest, timerHasStarted, timerNotStarted, setCalendarDate, currentTag, currentIndex, 
    currentType, initialize, startNewDay, establishPomodoroTime, handleCompletedRegular, setStoredTime, setNormalTriggeredRest, 
    disableNormalTriggeredRest, resetPomodoros, increasePomodoros, setSnackbar, setSnackbarError, unsetSnackbar, unsetSnackbarError} = appSlice.actions
export default appSlice.reducer

