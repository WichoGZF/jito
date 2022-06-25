import React, { useState, useEffect } from 'react';
import TimerCard from './TimerCard';
import { useSelector } from 'react-redux/es/exports.js';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';

import Button from '@mui/material/Button'
import { ElevatorSharp } from '@mui/icons-material';

export default function TimerControl(props) {

  const settings = useSelector(state => state.settings)

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinuts, setTimerMinuts] = useState(settings.pomodoroDuration);
  const [timerState, setTimerState] = useState(false);
  const [clockStarted, setClockStarted] = useState(false);
  const [rest, setRest] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const [warningDialog, setWarningDialog] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  let progress;
  if (rest) {
    if(pomodoros===settings.longBreakEvery){
      progress = ((timerMinuts * 60 + timerSeconds) / (settings.longBreakDuration))*100
    }
    else{
      progress = ((timerMinuts * 60 + timerSeconds) / (settings.shortBreakDuration))*100
    }
  }
  else {
    const timePassed = (settings.pomodoroDuration * 60) - (timerMinuts * 60 + timerSeconds)
    progress = timePassed * 100 / (settings.pomodoroDuration * 60)
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
              setRest(false)
              changeTimerState();
              setClockStarted(false)
              setTime(settings.pomodoroDuration)
              if (pomodoros === settings.longBreakEvery) {
                setPomodoros(0)
              }
            }
            else {
              if (pomodoros + 1 === settings.longBreakEvery) {
                setTime(settings.longBreakDuration, 0)
              }
              else {
                setTime(settings.shortBreakDuration, 0)
              }
              changeTimerState();
              setRest(true)
              setClockStarted(false)
              setPomodoros(pomodoros + 1)
            }
          }
          else {
            setTime(timerMinuts - 1, 59)
          }
        }
        else {
          setTimerSeconds(timerSeconds - 1);
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