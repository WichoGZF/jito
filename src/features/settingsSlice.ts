import { createSlice } from '@reduxjs/toolkit'

interface StateType { 
    pomodoroDuration: number,
    shortBreakDuration: number,
    longBreakDuration: number,
    longBreakEvery: number, //pomodoros
    automaticPomodoroStart:  boolean,
    automaticBreakStart:  boolean,

    // notification

    alarmVolume: number, 
    alarmSound: string,
    tickingVolume: number,
    tickingSound: string,
    alarmOnPomodoroEnd: boolean,
    alarmOnBreakEnd: boolean,
    tickingSoundOnBreak: boolean,
    tickingSoundOnPomodoro: boolean,
    //app

    colorTheme: string,
    hoursPastMidnight:number,
    language: string,

}

const mockSettings: StateType = {
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