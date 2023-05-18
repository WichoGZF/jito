import { useState } from 'react';
import TimerCard from './TimerCard';
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import { stopRunning } from '../../features/appSlice'
import { updateBlocks } from '../../features/tasksSlice';
import DialogSkipWarning from './DialogSkipWarning';
import useTimerControl from 'hooks/useTimerControl';
import useHandleCreateHistoric from 'hooks/useHandleCreateHistoric';

/* TIMER CONTROL  
  Component handling logic for timer.
  */

export default function TimerControl() {
  //Random settings
  const longBreakEvery = useAppSelector(state => state.settings.longBreakEvery)
  const actualIndex = useAppSelector(state => state.app.index)
  //TimerState
  const timerMinuts = useAppSelector(state => state.app.minutes)
  const timerSeconds = useAppSelector(state => state.app.seconds)
  const timerState = useAppSelector(state => state.app.timerState)
  const timerStarted = useAppSelector(state => state.app.timerStarted)
  const rest = useAppSelector(state => state.app.rest)
  const pomodoros = useAppSelector(state => state.app.pomodoros)

  const dispatch = useAppDispatch()

  const [dispatchPomodoro] = useHandleCreateHistoric()

  const [progress, changeTimerState, resetTimer] = useTimerControl(dispatchPomodoro)

  const [showWarning, setShowWarning] = useState(true)
  const [warningDialog, setWarningDialog] = useState(false);

  //Callback for handling user deciding to skip warning dialog.
  const handleSkipCallback = () => {
    resetTimer();
    handleWarningDialog();
  }

  const onPomodoroEnd = () => {
    dispatchPomodoro()
    dispatch(updateBlocks(actualIndex!))
  }

  const handleWarningDialog = () => {
    setWarningDialog(!warningDialog);
  }

  const openWarningDialog = () => {
    setWarningDialog(true);
    dispatch(stopRunning())
  }

  return (
    <>
      <TimerCard clockStarted={timerStarted}
        timerState={timerState}
        onClickStartStop={changeTimerState}
        onClickSkip={(showWarning && !rest) ? openWarningDialog : resetTimer}
        minutes={timerMinuts}
        seconds={timerSeconds}
        pomodoros={pomodoros}
        longBreakEvery={longBreakEvery} //Every long break
        progress={progress}
        rest={rest}
      ></TimerCard>
      <DialogSkipWarning
        open={warningDialog}
        onClose={handleWarningDialog}
        skipCallback={handleSkipCallback}
        showWarning={showWarning}
        handleShowWarning={() => setShowWarning(!showWarning)} />
    </>
  )
}