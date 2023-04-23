export default interface Setting {
    pomodoroDuration: number,
    shortBreakDuration: number,
    longBreakDuration: number,
    longBreakEvery: number, //pomodoros
    automaticPomodoroStart: boolean,
    automaticBreakStart: boolean,

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
}