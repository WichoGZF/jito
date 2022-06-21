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
    alarmSound: "bird",
    tickingVolume: 50,
    tickingSound: "clock",
    alarmOnPomdoroEnd: true,
    alarmOnBreakEnd: true,
    tickingSoundOnBreak: false,
    tickingSoundOnPomodoro: false,
    //app

    colorTheme: 'light',
    timeZone: 'EST',
    timeFormat: '', //12 or 24
    dateFormat: '', //how to sort date

}

const settingSlice = createSlice({
    name: 'settings',
    initialState: mockSettings,
    reducers: {
       updateSettings: (state, action) => {
           state.settings = action.payload
       }
    }
})

export default settingSlice.reducer 