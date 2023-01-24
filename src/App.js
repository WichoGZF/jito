import React, { useState, useEffect } from 'react';

import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import TaskList from './components/tasks/TaskList';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'

import { useDispatch, useSelector } from 'react-redux'
import { startNewDay } from '../src/features/appSlice'
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Calendar from './components/timerSection/Calendar';
import { Stack } from '@mui/material';

const composeResetDay = (tag) => (dispatch, getState) => {
  dispatch(startNewDay(getState().settings.pomodoroDuration))
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const date = useSelector((state) => state.app.calendarDate);
  const hoursAfterMidnight = useSelector((state) => state.settings.hoursPastMidnight)
  const colorTheme = useSelector((state) => state.settings.colorTheme)

  //Converting from
  const dateDigits = date.split('/') //mm/dd/yyyy
  const [month, day, year] = dateDigits
  const dateInDateType = new Date(year, month - 1, day)

  useEffect(() => {
    const hours = dateInDateType.getHours()
    const minutes = dateInDateType.getMinutes()
    const extraMiliseconds = hoursAfterMidnight * 60 * 60 * 1000
    const actualMinutesInDay = hours * 60 + minutes
    const remainingMinutes = 24 * 60 - actualMinutesInDay
    const remainingMiliseconds = remainingMinutes * 60 * 1000

    let resetDay = setTimeout(() => {
      dispatch(composeResetDay())
    }, remainingMiliseconds + extraMiliseconds)

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
      components: {
        // @ts-ignore
        MuiCalendarPicker: {
          styleOverrides: {
            root: {
              color: "white"
            }
          }
        },
      }
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
      <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
      <Stack direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', backgroundColor: 'background.default' }}>
        <Box sx={{width: '100%', minWidth: '700px', maxWidth: '1200px',minHeight: '100vh', backgroundColor: 'background.default',borderTop: 0, borderBottom: 0, borderLeft: '1px', borderRight: '1px', borderColor:'rgba(255, 255, 255, 0.12)', borderStyle:'solid' }}>
          <Grid container spacing={4} sx={{ marginTop: '5px', width: '100%' }}>
            <Calendar date={date}></Calendar>
            <Grid item xs>
              <TaskList></TaskList>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
