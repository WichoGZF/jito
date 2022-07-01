import React, { useState, useEffect } from 'react';
import TimerCard from './TimerCard';
import { useSelector,useDispatch } from 'react-redux/es/exports.js';

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

import {startRunning, stopRunning} from '../features/appSlice.js'


export default function TimerControl(props) {

  const settings = useSelector(state => state.settings)
  const actualTag = useSelector(state => state.app.tag)
  const actualIndex = useSelector(state=> state.app.index)
  const dispatch = useDispatch()

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinuts, setTimerMinuts] = useState(settings.pomodoroDuration);
  const [timerState, setTimerState] = useState(false);
  const [clockStarted, setClockStarted] = useState(false);
  const [rest, setRest] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const [warningDialog, setWarningDialog] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

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

  let progress;
  if (rest) {
    if (pomodoros === settings.longBreakEvery) {
      progress = ((timerMinuts * 60 + timerSeconds) / (settings.longBreakDuration)) * 100
    }
    else {
      progress = ((timerMinuts * 60 + timerSeconds) / (settings.shortBreakDuration)) * 100
    }
  }
  else {
    const timePassed = (settings.pomodoroDuration * 60) - (timerMinuts * 60 + timerSeconds)
    progress = timePassed * 100 / (settings.pomodoroDuration * 60)
  }

  const dispatchPomodoro = () => {
    dispatch(addTimeEntry(settings.pomodoroDuration*60, actualTag))
  }

  const changeTimerState = () => {
    setTimerState(!timerState);
  }

  const turnOnClockState = () => {
    setClockStarted(true);
  }

  function setTime(minutes, seconds) {
    setTimerMinuts(minutes);
    setTimerSeconds(seconds);
  }

  /*Function for resetting the timer back to it's starting value. Acessed when skip is pressed or when a task is finished
  and the clock is non zero.*/
  function resetTimer() {
    setTime(settings.pomodoroDuration, 0)
    setClockStarted(false)
    setTimerState(false)
  }

  const handleWarningDialog = () => {
    setWarningDialog(!warningDialog);
  }

  const openWarningDialog = () => {
    setWarningDialog(true);
    changeTimerState()
  }

  useEffect(() => {
    console.log(timerMinuts, timerSeconds)

    //if the timer is on and the clock hasn't been set to started, start
    if (timerState) {
      if (!clockStarted) {
        setClockStarted(true);
      }
      const interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinuts === 0) {
            if (rest) {
              if(settings.alarmOnBreakEnd){
                alarm({id: settings.alarmSound})
              }
              setRest(false)
              if (!settings.automaticPomodoroStart) {
                changeTimerState();
                setClockStarted(false)
              }
              setTime(settings.pomodoroDuration)
              if (pomodoros === settings.longBreakEvery) {
                setPomodoros(0)
              }
            }
            else {
              if(settings.alarmOnPomodoroEnd){
                alarm({id:settings.alarmSound})
              }
              if (pomodoros + 1 === settings.longBreakEvery) {
                setTime(settings.longBreakDuration, 0)
              }
              else {
                setTime(settings.shortBreakDuration, 0)
              }
              if (!settings.automaticBreakStart) {
                changeTimerState();
                setClockStarted(false)
              }
              setRest(true)
              setPomodoros(pomodoros + 1)
              dispatchPomodoro()
            }
          }
          else {
            setTime(timerMinuts - 1, 59)
            if (rest && settings.tickingSoundOnBreak) {
              tick({ id: settings.tickingSound })
            }
            else if (!rest && settings.tickingSoundOnPomodoro) {
              tick({ id: settings.tickingSound })
            }
          }
        }
        else {
          setTimerSeconds(timerSeconds - 1);
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

  console.log(settings.longBreakEvery)
  return (
    <>
      <TimerCard clockStarted={clockStarted}
        timerState={timerState}
        onClickStartStop={changeTimerState}
        onClickSkip={showWarning ? openWarningDialog : resetTimer}
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