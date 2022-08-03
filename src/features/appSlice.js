import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const fullDate = new Date
const todayDate = format(fullDate, 'MM/dd/yyyy')
const hours = fullDate.getHours()
const minutes = fullDate.getMinutes()
const minutesPastMidnight = minutes + (hours * 60)

const initialState = {
    calendarDate: todayDate,
    initialized: format(new Date("2022", "05", "23"), 'MM/dd/yyyy'), //move into tasks slice
    todayDate: todayDate,
    tag: null,
    index: null,
    running: false,
    resting: false,
    minutes: 0,
    seconds: 0,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        startRunning: (state) => {
            state.running = true
        },
        stopRunning: (state) => {
            state.running = false
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
        initialize: (state) => {
            state.initialized = format(new Date, 'MM/dd/yyyy')
            console.log(state.intialized)
        },
        startNewDay: (state) => {
            state.calendarDate = format(new Date, 'MM/dd/yyyy')
            state.todayDate = format(new Date, 'MM/dd/yyyy')
        },
        establishPomodoroTime: {
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

    }
})
export const { startRunning, stopRunning, setCalendarDate, currentTag, currentIndex, initialize,
    startNewDay, establishPomodoroTime } = appSlice.actions
export default appSlice.reducer

