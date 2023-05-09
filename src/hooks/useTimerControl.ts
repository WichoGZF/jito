import useSound from 'use-sound';
import { useRef, useEffect } from 'react'
import workerTimer from "components/timerSection/worker"
import { useAppSelector } from './useAppSelector'
import { useAppDispatch } from './useAppDispatch'
import {
    startRunning, stopRunning, startRest, endRest, timerHasStarted, timerNotStarted, establishPomodoroTime,
    disableNormalTriggeredRest, setStoredTime, setCalendarDate, resetPomodoros, increasePomodoros
} from 'features/appSlice'
import notifications from 'sounds/tones.mp3'
import tickers from 'sounds/tickers.mp3'
/*
Hook that handles app instrinsic timer actions and logic, alongside countdown. Allows callbacks for certain events within the clock.
Props are callbacks to functions that occur when a pomodoro block ends, and a task ends (all blocks done).
*/


export default function useTimerControl(onPomodoroEnd: () => void): [number, () => void, () => void] {
    const settings = useAppSelector(state => state.settings)
    const todayDate = useAppSelector(state => state.app.todayDate)
    const calendarDate = useAppSelector(state => state.app.calendarDate)
    const timerMinuts = useAppSelector(state => state.app.minutes)
    const timerSeconds = useAppSelector(state => state.app.seconds)
    const timerState = useAppSelector(state => state.app.timerState)
    const timerStarted = useAppSelector(state => state.app.timerStarted)
    const rest = useAppSelector(state => state.app.rest)
    const normalTriggeredRest = useAppSelector(state => state.app.normalTriggeredRest)
    const storedTime = useAppSelector(state => state.app.storedTime)
    const pomodoros = useAppSelector(state => state.app.pomodoros)

    const dispatch = useAppDispatch()

    const [alarm] = useSound(notifications, {
        sprite: {
            answerTone: [0, 2000],
            bell: [2000, 4000],
            clearAnnounce: [6000, 5000],
            confirmationTone: [11000, 2000],
            doorbellLight: [13000, 2000],
            doorbellPlain: [15000, 2000],
            flute: [17000, 4000],
            positive: [22000, 2000]
        },
        volume: settings.alarmVolume / 100,
    })
    const [tick] = useSound(tickers, {
        sprite: {
            clock: [0, 100],
            pendulum: [100, 130],
            wallClockTick: [230, 120]
        },
        volume: settings.tickingVolume / 100,
    })

    const worker = useRef<Worker>()
    useEffect(() => {
        worker.current = new Worker(workerTimer)!
        return () => {
            worker.current!.terminate();
        }
    }, [])

    const changeTimerState = () => {
        if (!rest) {
            if (!timerStarted) {
                if (todayDate !== calendarDate) {
                    dispatch(setCalendarDate(todayDate))
                }
            }
        }
        if (timerState) {
            dispatch(stopRunning())
            worker.current!.postMessage('stop')
        }
        else {
            dispatch(startRunning())
            worker.current!.postMessage('start')

        }
    }

    function resetTimer() {
        dispatch(establishPomodoroTime(settings.pomodoroDuration, 0))
        dispatch(timerNotStarted())
        dispatch(stopRunning())
        if (rest) {
          dispatch(endRest())
          if (pomodoros === settings.longBreakEvery) {
            dispatch(resetPomodoros())
          }
        }
      }

  //Initializing use effect, establishing starting value of pomodoro.
    useEffect(() => {
        if (timerMinuts === 0 && timerSeconds === 0) {
          dispatch(establishPomodoroTime(settings.pomodoroDuration, 0))
        }
      }, [1])
//Conditional nest for handling clock events and actions.
    useEffect(() => {
        const eventHandler = (e: any) => {
            if (timerState) {
                if (!timerStarted) {
                    dispatch(timerHasStarted())
                }
                if (timerSeconds === 0) {
                    if (timerMinuts === 0) {
                        if (rest) { //On rest end 
                            //If it's the last rest reset the progress blocks 
                            if (settings.longBreakEvery === pomodoros) {
                                dispatch(resetPomodoros())
                            }
                            if (settings.alarmOnBreakEnd) {
                                alarm({ id: settings.alarmSound })
                            }
                            dispatch(endRest())
                            if (!settings.automaticPomodoroStart) {
                                changeTimerState();
                                dispatch(timerNotStarted())
                            }
                            dispatch(establishPomodoroTime(settings.pomodoroDuration, 0))

                            if (normalTriggeredRest) {
                                dispatch(disableNormalTriggeredRest())
                                dispatch(setStoredTime(0))
                            }
                        }
                        else { //On pomodoro end
                            if (settings.alarmOnPomodoroEnd) {
                                alarm({ id: settings.alarmSound })
                            }
                            if (pomodoros + 1 === settings.longBreakEvery) {
                                dispatch(establishPomodoroTime(settings.longBreakDuration, 0))

                            }
                            else {
                                dispatch(establishPomodoroTime(settings.shortBreakDuration, 0))

                            }
                            if (!settings.automaticBreakStart) {
                                changeTimerState();
                                dispatch(timerNotStarted())
                            }
                            dispatch(startRest())
                            dispatch(increasePomodoros())
                            onPomodoroEnd() //hook arg callback
                        }
                    }
                    else {
                        dispatch(establishPomodoroTime(timerMinuts - 1, 59))
                        if (rest && settings.tickingSoundOnBreak) {
                            tick({ id: settings.tickingSound })
                        }
                        else if (!rest && settings.tickingSoundOnPomodoro) {
                            tick({ id: settings.tickingSound })
                        }
                    }
                }
                else {
                    dispatch(establishPomodoroTime(timerMinuts, timerSeconds - 1))
                    if (rest && settings.tickingSoundOnBreak) {
                        tick({ id: settings.tickingSound })
                    }
                    else if (!rest && settings.tickingSoundOnPomodoro) {
                        tick({ id: settings.tickingSound })
                    }

                }
            }
        };

        worker.current!.addEventListener('message', eventHandler);
        return () => {
            worker.current!.removeEventListener('message', eventHandler)
        }
    }, [timerState, timerMinuts, timerSeconds])

    let progress;
    if (rest) {
        if (normalTriggeredRest) {
            progress = ((timerMinuts * 60 + timerSeconds) / (storedTime)) * 100
        }
        else {
            if (pomodoros === settings.longBreakEvery) {
                progress = ((timerMinuts * 60 + timerSeconds) / (settings.longBreakDuration * 60) * 100)
            }
            else {
                progress = ((timerMinuts * 60 + timerSeconds) / (settings.shortBreakDuration * 60) * 100)
            }
        }
    }
    else {
        const timePassed = (settings.pomodoroDuration * 60) - (timerMinuts * 60 + timerSeconds)
        progress = timePassed * 100 / (settings.pomodoroDuration * 60)
    }

    return [progress, changeTimerState, resetTimer]
}