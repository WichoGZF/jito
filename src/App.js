import React, { useState, useEffect, useRef } from 'react';

import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import TaskList from './components/tasks/TaskList';

import Grid from '@mui/material/Grid'

import { useDispatch, useSelector } from 'react-redux'
import { startNewDay } from '../src/features/appSlice'
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

import Calendar from './components/timerSection/Calendar';
import { Container, Divider, Stack, Box} from '@mui/material';
import Footer from 'components/bottom/Footer';
import PaginationPanel from 'components/bottom/PaginationPanel';

import midnightWorker from './midnightWorker'

import { lightTheme, darkTheme } from 'theme';

const composeResetDay = (tag) => (dispatch, getState) => {
  dispatch(startNewDay(getState().settings.pomodoroDuration))
}

const milisecondsInDay = (24 * 60 * 60 * 1000)

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const todayDate = useSelector((state) => state.app.todayDate)
  const hoursAfterMidnight = useSelector((state) => state.settings.hoursPastMidnight)
  const colorTheme = useSelector((state) => state.settings.colorTheme)

  const worker = useRef()

  //Establishing worker 
  useEffect(() => {
    worker.current = new Worker(midnightWorker)
    return () => {
      worker.current.terminate();
    }
  }, [])

  useEffect(() => {
    function eventHandler(event){ 
      console.log('New day started');
      dispatch(composeResetDay())
    }
    //Actual timestamp
    const timestamp = new Date();  
    //Timestamp converted to miliseconds 
    const timestampMiliseconds = (timestamp.getHours() * 60 * 60 * 1000) + (timestamp.getMinutes() * 60 * 1000) + (timestamp.getSeconds() * 1000);

    //Extra miliseconds in a day according to settings
    const extraMiliseconds = hoursAfterMidnight * 60 * 60 * 1000;
    //Miliseconds remaining until rest
    const remainingMiliseconds = (milisecondsInDay + extraMiliseconds) - timestampMiliseconds;

    worker.current.postMessage(remainingMiliseconds)

    worker.current.addEventListener('message', eventHandler);
    return () => {
      worker.current.removeEventListener('message', eventHandler)
    }

  }, [hoursAfterMidnight, todayDate])

  let theme;
  if (colorTheme === 'dark'){
    theme = darkTheme
  }
  else{
    theme = lightTheme
  }

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{backgroundColor: theme.palette.background.default}}>
        <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
        <Container>
          <Stack
            justifyContent="flex-start"
            alignItems="center"
            sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default', minWidth: '700px', maxWidth: '1200px', }}
            gap={4}
          >
            <Grid container spacing={4} sx={{ marginTop: '5px', width: '100%' }}>
              <Calendar></Calendar>
              <Grid item xs>
                <TaskList></TaskList>
              </Grid>
            </Grid>
            <Divider style={{ width: '100%' }}></Divider>
            <PaginationPanel></PaginationPanel>
            <Divider style={{ width: '100%' }}></Divider>
            <Footer></Footer>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
