import React, { useState, useEffect } from 'react';
import TimerCard from './TimerCard';
import { useSelector, useDispatch } from 'react-redux/es/exports.js';

import { addTimeEntry } from '../features/tasksSlice.js';

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
import notifications from '../sounds/tones.mp3'
//ticking sounds
import tickers from '../sounds/tickers.mp3'

import {
  startRunning, stopRunning, startRest, endRest, timerHasStarted, timerNotStarted, establishPomodoroTime,
  disableNormalTriggeredRest, setStoredTime
} from '../features/appSlice.js'
import { updateBlocks } from '../features/tasksSlice.js';

//Optimization 
//Don't really need to trigger a re-render on every minute/second change. Can let the reducer handle it instead. 

export default function TimerControl(props) {
  //Random settings
  const settings = useSelector(state => state.settings)
  const actualTag = useSelector(state => state.app.tag)
  const actualIndex = useSelector(state => state.app.index)
  const todayDate = useSelector(state => state.app.todayDate)
  //TimerState
  const timerMinuts = useSelector(state => state.app.minutes)
  const timerSeconds = useSelector(state => state.app.seconds)
  const timerState = useSelector(state => state.app.timerState)
  const timerStarted = useSelector(state => state.app.timerStarted)
  const rest = useSelector(state => state.app.rest)
  const normalTriggeredRest = useSelector(state => state.app.normalTriggeredRest)

  const storedTime = useSelector(state => state.app.storedTime)
  //Dispatch
  const dispatch = useDispatch()

  const [pomodoros, setPomodoros] = useState(0);
  const [showWarning, setShowWarning] = useState(true)
  const [warningDialog, setWarningDialog] = useState(false);

  console.log('Settings in timer control: ', settings)

  const alarmSound = settings.alarmSound
  const [alarm] = useSound(notifications, {
    sprite: {
      answerTone: [0, 2000],
      bell: [2000, 6000],
      clearAnnounce: [6000, 11000],
      confirmationTone: [11000, 13000],
      doorbellLight: [13000, 15000],
      doorbellPlain: [15000, 17000],
      flute: [17000, 21000],
      positive: [22000, 25000]
    },
    volume: settings.alarmVolume / 100,
  })
  const tickingSound = settings.tickingSound
  const [tick] = useSound(tickers, {
    sprite: {
      clock: [0, 100],
      pendulum: [100, 230],
      wallClockTick: [230, 350]
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
        progress = ((timerMinuts * 60 + timerSeconds) / (settings.longBreakDuration)) * 100
      }
      else {
        progress = ((timerMinuts * 60 + timerSeconds) / (settings.shortBreakDuration)) * 100
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
    if (timerState) {
      dispatch(stopRunning())
    }
    else {
      dispatch(startRunning())
    }
  }

  function resetTimer() {
    dispatch(establishPomodoroTime(settings.pomodoroDuration, 0))
    dispatch(timerNotStarted())
    dispatch(stopRunning)
  }

  const handleWarningDialog = () => {
    setWarningDialog(!warningDialog);
  }

  const openWarningDialog = () => {
    setWarningDialog(true);
    changeTimerState()
  }

  useEffect(() => {
    //if the timer is on and the clock hasn't been set to started, start
    if (timerState) {
      if (!timerStarted) {
        dispatch(timerHasStarted())
      }

      const interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinuts === 0) {
            if (rest) { //On rest end
              if (settings.alarmOnBreakEnd) {
                alarm({ id: settings.alarmSound })
              }
              dispatch(endRest())
              if (!settings.automaticPomodoroStart) {
                changeTimerState();
                dispatch(timerNotStarted())
              }
              (establishPomodoroTime(25, 0))
              if (pomodoros === settings.longBreakEvery) {
                setPomodoros(0)
              }
              if(normalTriggeredRest){
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
              setPomodoros(pomodoros + 1)
              dispatchPomodoro()
              //"UpdateBlocks" reducer already handles the logic for how to update the specific task (only need index)
              dispatch(updateBlocks(actualIndex))
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
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerState, timerSeconds]);

  //Debugging needed
  //Initializing use effect, establishing starting value of pomodoro.
  useEffect(() => {
    if (timerMinuts === 0 && timerSeconds === 0) {
      dispatch(establishPomodoroTime(settings.pomodoroDuration, 0))
    }
  }, [1])

  console.log(settings.longBreakEvery)
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