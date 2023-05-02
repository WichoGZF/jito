import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Setting from 'types/Setting'

const mockSettings: Setting = {
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
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: mockSettings,
    reducers: {
        updateSettings: (state, action: PayloadAction<Setting>) => {
            return action.payload
        }
    }
})
export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer 