import React, { useState, useEffect } from 'react';

import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import TimerControl from './components/timerSection/TimerControl';
import TaskList from './components/TaskList';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'

import { format, compareAsc } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

import { Divider } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import { setCalendarDate, startNewDay } from './features/appSlice.js'
import { createTheme, ThemeProvider } from "@mui/material/styles";

const composeResetDay = (tag) => (dispatch, getState) => {
  dispatch(startNewDay(getState().settings.pomodoroDuration))
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const date = useSelector((state) => state.app.calendarDate);
  const timerStarted = useSelector((state) => state.app.timerStarted);
  const timerState = useSelector((state) => state.app.timerState);
  const hoursAfterMidnight = useSelector((state) => state.settings.hoursAfterMidnight)

  const colorTheme = useSelector((state) => state.settings.colorTheme)

  const dispatchCalendarChange = (newDate) => {
    dispatch(setCalendarDate(format(newDate, 'MM/dd/yyyy')))
  }
  //Converting from
  const dateDigits = date.split('/') //mm/dd/yyyy
  const [month, day, year] = dateDigits
  const dateInDateType = new Date(year, month - 1, day)

  useEffect(() => {
    const hours = dateInDateType.getHours()
    const minutes = dateInDateType.getMinutes()
    const extraMiliseconds = hoursAfterMidnight*60*60*1000 
    const actualMinutesInDay = hours * 60 + minutes
    const remainingMinutes = 24 * 60 - actualMinutesInDay
    const remainingMiliseconds = remainingMinutes * 60 * 1000
    let resetDay = setTimeout(() => {
      dispatch(composeResetDay())
    }, remainingMiliseconds+extraMiliseconds)

    return () => {
      clearTimeout(resetDay);
    };

  }, [hoursAfterMidnight, date])

  let theme
  if (colorTheme === "dark") {
    theme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: 'rgb(217, 85, 80)'
        }
      },
    });
  }
  else {
    theme = createTheme({
      palette: {
        text: {
          primary: "#616161",
        },
        primary: {
          main: 'rgb(217, 85, 80)'
        }

      },
    });
  }


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: '700px', backgroundColor: 'background.default' }}>
        <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
        <Grid container spacing={4} sx={{ marginTop: '5px' }}>
          <Grid container item
            xs="auto"
            spacing={3}
            direction='column'
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{ pl: 0, pt: 0, position: 'sticky' }}>

            <Grid item sx={{ width: '100%' }}>
              <TimerControl></TimerControl>
            </Grid>
            <Grid item>
              <Divider></Divider>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker disablePast date={dateInDateType} onChange={dispatchCalendarChange}
                  disabled={timerState || timerStarted} />
              </LocalizationProvider>

            </Grid>
            <Divider orientation="vertical"></Divider>
          </Grid>
          <Grid item xs>
            <TaskList></TaskList>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
