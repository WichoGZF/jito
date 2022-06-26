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
    alarmOnPomdoroEnd: true,
    alarmOnBreakEnd: true,
    tickingSoundOnBreak: true,
    tickingSoundOnPomodoro: true,
    //app

    colorTheme: 'light',
    hoursPastMidnight: 0,
    timeFormat: '12', //12 or 24
    dateFormat: 'MM/DD/YYYY', //how to sort date

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