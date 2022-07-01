import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
    calendarDate: new Date(), 
    tag: null,
    index: null,
    running: false,
    resting: false
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
        }
    }
})
export const {startRunning, stopRunning, setCalendarDate, currentTag, currentIndex} = appSlice.actions
export default appSlice.reducer 

