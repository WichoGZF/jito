import React, {useState} from 'react';
import TimerCard from './TimerCard';

export default function TimerControl(props) {
    const [timerSeconds, setTimerSeconds] = useState(0); 
    const [timerMinuts, setTimerMinuts] = useState(25);
    const [timerState, setTimerState] = useState(false);
    const [clockType, setClockType] = useState("pomodoro");
    const [clockStarted, setClockStarted] = useState(false);
  
    function changeTimerState() {
      setTimerState(!timerState);
    }
  
    function setTime(minutes, seconds) {
      setTimerMinuts(minutes);
      setTimerSeconds(seconds);
    }
    
    /*Function for resetting the timer back to it's starting value. Acessed when skip is pressed or when a task is finished
    and the clock is non zero.*/
    function resetTimer() {
      if(clockType === "regular"){
          setTime(25, 0)
      }
  
    function establishTimerType(type) {
      setClockType(type);
      console.log("Clock type changed to... ", type)
      if (type === "pomodoro") {
        setTime(25, 0)
      }
      else if (type === "long pomodoro") {
        setTime(50, 0)
      }
    }
  
  
    useEffect(() => {
      console.log(timerMinuts, timerSeconds)
      if (timerState) {
        const interval = setInterval(() => {
          if (clockType === "pomodoro" || clockType === "rest") {
            if (timerSeconds === 0) {
              if (timerMinuts === 0) {
                if (clockType === "pomodoro") {
                  console.log("Ended!")
                  changeTimerState();
                  setTime(5, 0)
                  setClockType("rest")
                  setClockStarted(false)
                  props.updateTimeHandler(25, 0)
                }
                else {
                  resetTimer() //Sets to pomodoro
                }
              }
              else {
                setTime(timerMinuts - 1, 59)
              }
            }
            else {
              setTimerSeconds(timerSeconds - 1);
            }
          }
          else {
            if (timerSeconds === 60) {
              setTime(timerMinuts + 1)
            }
            else {
              setTimerSeconds(timerSeconds + 1);
            }
  
          }
  
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timerState, timerSeconds]);
  
    return (
      <TimerCard></TimerCard>
    )
  }