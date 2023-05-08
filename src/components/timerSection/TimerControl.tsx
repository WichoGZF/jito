import { useState, useEffect, useRef } from 'react';
import TimerCard from './TimerCard';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addTimeEntry } from '../../features/tasksSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button'
import useSound from 'use-sound';
import notifications from '../../sounds/tones.mp3'
import tickers from '../../sounds/tickers.mp3'
import {
  startRunning, stopRunning, startRest, endRest, timerHasStarted, timerNotStarted, establishPomodoroTime,
  disableNormalTriggeredRest, setStoredTime, setCalendarDate, resetPomodoros, increasePomodoros
} from '../../features/appSlice'
import { updateBlocks } from '../../features/tasksSlice';
import workerTimer from "./worker"
import { usePostHistoricTaskMutation } from 'features/api/apiSlice';
import DialogSkipWarning from './DialogSkipWarning';

/* TIMER CONTROL  
  Manages clock related logic and functionality depending on state of worker. Dispatches updates to tasks-slice on clock end and updates the app state. 
*/

export default function TimerControl() {
  //Random settings
  const settings = useAppSelector(state => state.settings)
  const actualTag = useAppSelector(state => state.app.tag)
  const actualIndex = useAppSelector(state => state.app.index)
  const todayDate = useAppSelector(state => state.app.todayDate)
  const calendarDate = useAppSelector(state => state.app.calendarDate)
  //TimerState
  const timerMinuts = useAppSelector(state => state.app.minutes)
  const timerSeconds = useAppSelector(state => state.app.seconds)
  const timerState = useAppSelector(state => state.app.timerState)
  const timerStarted = useAppSelector(state => state.app.timerStarted)
  const rest = useAppSelector(state => state.app.rest)
  const normalTriggeredRest = useAppSelector(state => state.app.normalTriggeredRest)
  const storedTime = useAppSelector(state => state.app.storedTime)
  const pomodoros = useAppSelector(state => state.app.pomodoros)
  //Task info 
  //Dispatch
  const dispatch = useAppDispatch()

  const [showWarning, setShowWarning] = useState(true)
  const [warningDialog, setWarningDialog] = useState(false);

  const [postHistoric, postResult] = usePostHistoricTaskMutation();
  const userid = useAppSelector(state => state.auth.userid)

  const alarmSound = settings.alarmSound
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
  const tickingSound = settings.tickingSound
  const [tick] = useSound(tickers, {
    sprite: {
      clock: [0, 100],
      pendulum: [100, 130],
      wallClockTick: [230, 120]
    },
    volume: settings.tickingVolume / 100,
  })
  //Callback for handling user deciding to skip warning dialog.
  const handleSkipCallback = () => { 
      resetTimer();
      handleWarningDialog();
  }


  //TODO
  //Proper rounding, plus add it into every other calculation 
  const minutesStored = Math.round(storedTime / 60)
  const secondsStored = storedTime % 60

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

  const dispatchPomodoro = () => {
    const newHistoricTask = {
      id: 0,
      completeDate: todayDate,
      time: settings.pomodoroDuration,
      tag: actualTag!,
    }
    postHistoric(
      {
        userId: userid!,
        historicTask: newHistoricTask
      }
    ).unwrap().then(fulfilled => console.log(fulfilled)).catch(rejected => console.log(rejected))
    dispatch(addTimeEntry(todayDate, settings.pomodoroDuration * 60, actualTag))
  }

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
      worker.current.postMessage('stop')
    }
    else {
      dispatch(startRunning())
      worker.current.postMessage('start')

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

  const handleWarningDialog = () => {
    setWarningDialog(!warningDialog);
  }

  const openWarningDialog = () => {
    setWarningDialog(true);
    dispatch(stopRunning())
  }

  const worker = useRef()

  //Debugging needed
  //Initializing use effect, establishing starting value of pomodoro.
  useEffect(() => {
    if (timerMinuts === 0 && timerSeconds === 0) {
      dispatch(establishPomodoroTime(settings.pomodoroDuration, 0))
    }
  }, [1])

  useEffect(() => {
    worker.current = new Worker(workerTimer)
    return () => {
      worker.current.terminate();
    }
  }, [])

  useEffect(() => {
    const eventHandler = (e) => {
      console.log('Message from worker: ', e.data);

      if (timerState) {
        console.log('TimerState: ', timerState)

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
              dispatchPomodoro()
              //"UpdateBlocks" reducer already handles the logic for how to update the specific task (only need index)
              dispatch(updateBlocks(actualIndex))
            }
          }
          else {
            console.log("One minute less")
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
          console.log('One second less')
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

    worker.current.addEventListener('message', eventHandler);
    return () => {
      worker.current.removeEventListener('message', eventHandler)
    }
  }, [timerState, timerMinuts, timerSeconds])

  /*
  qol
  Can move many of the props inside the TimerCard component since they're directly handled by redux.
  */
  return (
    <>
      <TimerCard clockStarted={timerStarted}
        timerState={timerState}
        onClickStartStop={changeTimerState}
        onClickSkip={(showWarning && !rest) ? openWarningDialog : resetTimer}
        minutes={timerMinuts}
        seconds={timerSeconds}
        pomodoros={pomodoros}
        longBreakEvery={settings.longBreakEvery} //Every long break
        progress={progress}
        rest={rest}
      ></TimerCard>
      <DialogSkipWarning 
      open={warningDialog} 
      onClose={handleWarningDialog} 
      skipCallback={handleSkipCallback} 
      showWarning={showWarning} 
      handleShowWarning={() => setShowWarning(!showWarning)}/>
    </>
  )
}