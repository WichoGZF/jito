import { useState, useEffect, useRef, useContext } from 'react';
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import TaskList from './components/tasks/TaskList';
import Grid from '@mui/material/Grid'
import { startNewDay } from './features/appSlice'
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Calendar from './components/timerSection/Calendar';
import { Container, Divider, Stack, Box } from '@mui/material';
import Footer from 'components/bottom/Footer';
import PaginationPanel from 'components/bottom/PaginationPanel';
import midnightWorker from './midnightWorker'
import { lightTheme, darkTheme } from 'theme';
import { format } from 'date-fns';
import { useAppSelector, useAppDispatch } from 'hooks';
import Subscribe from 'components/subscription/Subscribe';
import { useLazyGetUserDataQuery } from 'features/api/apiSlice';
import { updateSettings } from 'features/settingsSlice';
import { updateTaskSlice } from 'features/tasksSlice';

const composeResetDay = () => (dispatch, getState) => {
  dispatch(startNewDay(getState().settings.pomodoroDuration))
}

const milisecondsInDay = (24 * 60 * 60 * 1000)

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [subscribeDialogOpen, setSusbcribeDialogOpen] = useState<boolean>(false);

  const hasSession = useAppSelector(state => state.auth.hasSession)
  const userid = useAppSelector(state => state.auth.userid)

  const [getUserData, result] = useLazyGetUserDataQuery()

  useEffect(() => {
    if (hasSession && (userid !== null)) {
      getUserData(userid)
    }

  }, [hasSession])

  useEffect(() => { 
    if(result.data){ 
      dispatch(updateSettings(result.data.settings))
      dispatch(updateTaskSlice({
        tasks: result.data.tasks,
        tags: result.data.tags,
        history: result.data.historicTask
      }))
    }
  }, [result])


  const handleCloseSubscripe = () => {
    setSusbcribeDialogOpen(false);
  }

  const dispatch = useAppDispatch();

  const todayDate = useAppSelector((state) => state.app.todayDate)
  const colorTheme = useAppSelector((state) => state.settings.colorTheme)

  const worker = useRef()

  //Establishing worker 
  useEffect(() => {
    worker.current = new Worker(midnightWorker)
    return () => {
      worker!.current.terminate();
    }
  }, [])

  //UseEffect to check if the day has been shown yet 
  useEffect(() => {
    //Fetch actual date to see if todayDate is outdated
    const actualDate = format(new Date(), 'MM/dd/yyyy')
    if (actualDate !== todayDate) {
      dispatch(composeResetDay());
    }
  }, [])

  useEffect(() => {
    function eventHandler() {
      console.log('New day started');
      dispatch(composeResetDay());
    }
    //Actual timestamp
    const timestamp = new Date();
    //Timestamp converted to miliseconds 
    const timestampMiliseconds = (timestamp.getHours() * 60 * 60 * 1000) + (timestamp.getMinutes() * 60 * 1000) + (timestamp.getSeconds() * 1000);

    //Miliseconds remaining until rest
    const remainingMiliseconds = (milisecondsInDay) - timestampMiliseconds;

    worker.current.postMessage(remainingMiliseconds)

    worker.current.addEventListener('message', eventHandler);
    return () => {
      worker.current.removeEventListener('message', eventHandler)
    }

  }, [todayDate])

  let theme;
  if (colorTheme === 'dark') {
    theme = darkTheme
  }
  else {
    theme = lightTheme
  }

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
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
      <Subscribe open={subscribeDialogOpen} handleClose={handleCloseSubscripe}></Subscribe>
    </ThemeProvider>
  );
}

export default App;
