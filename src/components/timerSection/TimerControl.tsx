import { useState } from 'react';
import TimerCard from './TimerCard';
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import { addTimeEntry } from '../../features/tasksSlice';
import { stopRunning } from '../../features/appSlice'
import { updateBlocks } from '../../features/tasksSlice';
import { usePostHistoricTaskMutation } from 'features/api/apiSlice';
import DialogSkipWarning from './DialogSkipWarning';
import useTimerControl from 'hooks/useTimerControl';

/* TIMER CONTROL  
  Component handling logic for timer.
  */

export default function TimerControl() {
  //Random settings
  const settings = useAppSelector(state => state.settings)
  const actualTag = useAppSelector(state => state.app.tag)
  const actualIndex = useAppSelector(state => state.app.index)
  const todayDate = useAppSelector(state => state.app.todayDate)
  //TimerState
  const timerMinuts = useAppSelector(state => state.app.minutes)
  const timerSeconds = useAppSelector(state => state.app.seconds)
  const timerState = useAppSelector(state => state.app.timerState)
  const timerStarted = useAppSelector(state => state.app.timerStarted)
  const rest = useAppSelector(state => state.app.rest)
  const pomodoros = useAppSelector(state => state.app.pomodoros)
  //Task info 
  //Dispatch
  const dispatch = useAppDispatch()


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

  const [progress, changeTimerState, resetTimer] = useTimerControl(dispatchPomodoro)

  const [showWarning, setShowWarning] = useState(true)
  const [warningDialog, setWarningDialog] = useState(false);

  const [postHistoric, postResult] = usePostHistoricTaskMutation();
  const userid = useAppSelector(state => state.auth.userid)

  //Callback for handling user deciding to skip warning dialog.
  const handleSkipCallback = () => {
    resetTimer();
    handleWarningDialog();
  }

  const onPomodoroEnd = () => {
    dispatchPomodoro()
    dispatch(updateBlocks(actualIndex))
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
        longBreakEvery={settings.longBreakEvery} //Every long break
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