import React, { useState, useEffect, useRef } from 'react';
import TimerCard from './TimerCard';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { addTimeEntry } from '../../features/tasksSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';

import Button from '@mui/material/Button'
import { ElevatorSharp } from '@mui/icons-material';

import useSound from 'use-sound';

//notification sounds
import notifications from '../../sounds/tones.mp3'
//ticking sounds
import tickers from '../../sounds/tickers.mp3'

import {
  startRunning, stopRunning, startRest, endRest, timerHasStarted, timerNotStarted, establishPomodoroTime,
  disableNormalTriggeredRest, setStoredTime, setCalendarDate, resetPomodoros, increasePomodoros
} from '../../features/appSlice'
import { updateBlocks } from '../../features/tasksSlice';

import workerTimer from "./worker"

//Todo
//After finishing a break 
//Optimization 
//Don't really need to trigger a re-render on every minute/second change. Can let the reducer handle it instead. 

export default function TimerControl(props) {
  //Random settings
  const settings = useSelector(state => state.settings)
  const actualTag = useSelector(state => state.app.tag)
  const actualIndex = useSelector(state => state.app.index)
  const todayDate = useSelector(state => state.app.todayDate)
  const calendarDate = useSelector(state => state.app.calendarDate)
  //TimerState
  const timerMinuts = useSelector(state => state.app.minutes)
  const timerSeconds = useSelector(state => state.app.seconds)
  const timerState = useSelector(state => state.app.timerState)
  const timerStarted = useSelector(state => state.app.timerStarted)
  const rest = useSelector(state => state.app.rest)
  const normalTriggeredRest = useSelector(state => state.app.normalTriggeredRest)

  const storedTime = useSelector(state => state.app.storedTime)

  const pomodoros = useSelector(state => state.app.pomodoros)
  //Dispatch
  const dispatch = useDispatch()

  const [showWarning, setShowWarning] = useState(true)
  const [warningDialog, setWarningDialog] = useState(false);


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
              if(settings.longBreakEvery === pomodoros){
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
      <Dialog
        open={warningDialog}
        onClose={handleWarningDialog}
      >
        <DialogTitle>
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Skipping the current pomodoro won't count towards the pomodoro count.
            The time spent will not be saved for statistics either. Do you want to
            continue?
          </DialogContentText>
          <FormControlLabel control={<Checkbox checked={!showWarning} onChange={() => setShowWarning(false)}></Checkbox>} label="Don't show again"></FormControlLabel>
          <DialogActions>
            <Button onClick={handleWarningDialog}>Disagree</Button>
            <Button onClick={
              () => {
                resetTimer();
                handleWarningDialog();
              }
            }>Agree</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}