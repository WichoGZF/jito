import { start } from '@popperjs/core'
import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const fullDate = new Date
const todayDate = format(fullDate, 'MM/dd/yyyy')
const hours = fullDate.getHours()
const minutes = fullDate.getMinutes()
const minutesPastMidnight = minutes + (hours * 60)

//Type property is not used, should be removed. 
const initialState = {
    //Dates
    calendarDate: todayDate,
    initialized: format(new Date("2022", "05", "23"), 'MM/dd/yyyy'), //move into tasks slice
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
    handleTime: null,  //How to handle the time stored 'null' - 'store' -'use'
    storedTime: 0, //The time stored
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
        setCalendarDate: (state, action) => {
            const date = action.payload
            console.log(action.payload)
            state.calendarDate = date
        },
        currentTag: (state, action) => {
            const tag = action.payload;
            state.tag = tag
        },
        currentIndex: (state, action) => {
            const index = action.payload;
            state.index = index
        },
        currentType: (state, action)  => {
            const type = action.payload; 
            state.type = type
        },
        initialize: (state) => {
            state.initialized = format(new Date, 'MM/dd/yyyy')
            console.log(state.intialized)
        },
        startNewDay: (state) => {
            state.calendarDate = format(new Date, 'MM/dd/yyyy')
            state.todayDate = format(new Date, 'MM/dd/yyyy')
        },
        establishPomodoroTime: { //QoL Misleading name, not only it encompasses pomodoros but also rests
            reducer(state, action) {
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
            state.completedRegular = !state.completedRegular
        },
        setHandleTime: (state, action) => {
            state.handleTime = action.payload
        },
        setStoredTime: (state, action) => {
            state.storedTime = action.payload //In seconds 
        }
    }
})
//Could wrap the three 'current' reducers into a single one
export const { startRunning, stopRunning, startRest, endRest, timerHasStarted, timerNotStarted, setCalendarDate, currentTag, currentIndex, currentType, initialize,
    startNewDay, establishPomodoroTime, handleCompletedRegular, setHandleTime, setStoredTime } = appSlice.actions
export default appSlice.reducer

