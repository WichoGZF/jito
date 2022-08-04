import { createSlice } from '@reduxjs/toolkit'

const mockSettings = {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakEvery: 4, //pomodoros
    automaticPomodoroStart: false,
    automaticBreakStart: false,

    // notification

    alarmVolume: 50, 
    alarmSound: "bell",
    tickingVolume: 50,
    tickingSound: "clock",
    alarmOnPomodoroEnd: true,
    alarmOnBreakEnd: true,
    tickingSoundOnBreak: true,
    tickingSoundOnPomodoro: true,
    //app

    colorTheme: 'light',
    hoursPastMidnight: 0,
    language: "English"

}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: mockSettings,
    reducers: {
       updateSettings: (state, action) => {
            return action.payload
       }
    }
})
export const {updateSettings} = settingsSlice.actions
export default settingsSlice.reducer 