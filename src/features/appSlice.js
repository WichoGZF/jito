import { createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

const initialState =  {
    calendarDate: format(new Date, 'MM/dd/yyyy'),
    initialized: format(new Date("2022", "05", "23"), 'MM/dd/yyyy'),
    tag: null,
    index: null,
    running: false,
    resting: false,
    
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
        } ,
        setCalendarDate: (state, action) => {
            const date = action.payload
            console.log(action.payload)
            state.calendarDate = date
        },
        currentTag: (state, action) => {
            const tag  = action.payload;
            state.tag = tag
        }, 
        currentIndex: (state, action) => {
            const index = action.payload;
            state.index = index
        },
        initialize: (state) => {
            state.initialized = format(new Date, 'MM/dd/yyyy')
            console.log(state.intialized)
        }
    }
})
export const {startRunning, stopRunning, setCalendarDate, currentTag, currentIndex, initialize} = appSlice.actions
export default appSlice.reducer 

