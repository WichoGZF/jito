import React, { useState, useEffect } from 'react';
import TimerCard from './TimerCard';

export default function TimerControl(props) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinuts, setTimerMinuts] = useState(25);
  const [timerState, setTimerState] = useState(false);
  const [clockStarted, setClockStarted] = useState(false);
  const [rest, setRest] = useState(false);
  
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
    setTime(25, 0)
    setClockStarted(false)
    setTimerState(false)
  }

  useEffect(() => {
    console.log(timerMinuts, timerSeconds)

    if (timerState) {
      if (!clockStarted) {
        setClockStarted(true);
      }
      const interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinuts === 0) {
            if (rest) {
              setRest(false)
            }
            else {
              console.log("Ended doro!")
              changeTimerState();
              setTime(5, 0)
              setRest(true)
              setClockStarted(false)
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

  return (
    <TimerCard clockStarted={clockStarted} timerState={timerState} onClickStartStop={changeTimerState} onClickSkip={resetTimer} minutes={timerMinuts} seconds={timerSeconds}></TimerCard>
  )
}