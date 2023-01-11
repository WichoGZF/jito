import CloseIcon from '@mui/icons-material/Close'
const { Dialog, DialogTitle, Grid, IconButton, DialogContent, DialogContentText, FormControlLabel, Checkbox, Typography, DialogActions, Button } = require("@mui/material")
const { establishPomodoroTime, setStoredTime, startRest, setNormalTriggeredRest, timerNotStarted, handleCompletedRegular } = require("features/appSlice")
const { useState } = require("react")
const React = require("react")
const { useSelector, useDispatch } = require("react-redux")

const composeStoredTime = (action) => (dispatch, getState) => {
    const pomodoroDuration = getState().settings.pomodoroDuration
    if (action === 'discard') {
      dispatch(establishPomodoroTime(pomodoroDuration, 0))
    }
    else {
      const storedTime = getState().app.storedTime
      const secondsRemaining = getState().app.minutes * 60 + getState().app.seconds
      const totalSeconds = pomodoroDuration * 60
      const restToWorkRatio = getState().settings.shortBreakDuration / pomodoroDuration
      const restConversion = Math.floor((totalSeconds - secondsRemaining) * restToWorkRatio)
      if (action === 'store') {
        dispatch(setStoredTime(storedTime + restConversion))
        dispatch(establishPomodoroTime(pomodoroDuration, 0))
      }
      else if (action === 'use') {
        const totalRestSeconds = restConversion + storedTime
        const restMinutes = Math.floor(totalRestSeconds / 60)
        const restSeconds = totalRestSeconds % 60
        dispatch(establishPomodoroTime(restMinutes, restSeconds))
        dispatch(startRest())
        dispatch(setNormalTriggeredRest())
      }
    }
    dispatch(timerNotStarted())
  }

 export default function CompletedDialog(props) {
    //True/false property activated when task is completed
    const completedRegular = useSelector((state) => state.app.completedRegular)
    const dispatch = useDispatch()
  
    const [rememberSelection, setRememberSelection] = useState(false)
  
    const closeDialog = () => {
      dispatch(handleCompletedRegular())
    }
  
    const clockMinutes = useSelector((state) => state.app.minutes);
    const clockSeconds = useSelector((state) => state.app.seconds);
    const pomodoroDuration = useSelector((state) => state.settings.pomodoroDuration)
    const shortBreakDuration = useSelector((state) => state.settings.shortBreakDuration)
  
    const pomodoroSeconds = pomodoroDuration * 60
    const totalClock = (pomodoroSeconds) - (clockMinutes * 60 + clockSeconds)
    const shortBreakDurationSeconds = shortBreakDuration * 60;
  
    const restRatio = shortBreakDurationSeconds/pomodoroSeconds
    const secondsOfRest = restRatio*totalClock
  
    console.log(clockMinutes, clockSeconds, pomodoroDuration, totalClock, pomodoroSeconds, secondsOfRest)
    return (
      <Dialog open={completedRegular}>
        <DialogTitle>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs="auto">
              Task completed
            </Grid>
            <Grid item xs="auto">
              <IconButton onClick={closeDialog}><CloseIcon></CloseIcon></IconButton>
           </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            What do you want to do with the {Math.floor(secondsOfRest / 60)}:{Math.floor(secondsOfRest % 60).toString().padStart(2, '0')} stored?
          </DialogContentText>
          <FormControlLabel
            control={<Checkbox checked={rememberSelection}
              onChange={() => { setRememberSelection(!rememberSelection) }} />}
            label={<Typography sx={{color: 'gray', fontSize: '1rem'}}>Remember my decision </Typography>}
          ></FormControlLabel>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={() => {
            dispatch(composeStoredTime('store'))
            closeDialog()
          }}>Store Time</Button>
          <Button onClick={() => {
            dispatch(composeStoredTime('use'))
            closeDialog()
          }}>Take a rest</Button>
          <Button onClick={() => {
            closeDialog()
          }}>Discard Time</Button>
        </DialogActions>
      </Dialog>
    )
  }