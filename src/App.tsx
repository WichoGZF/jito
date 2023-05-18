import { useState } from 'react';
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import TaskList from './components/tasks/TaskList';
import Grid from '@mui/material/Grid'
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Calendar from './components/timerSection/Calendar';
import { Container, Divider, Stack, Box, Alert, Snackbar } from '@mui/material';
import Footer from 'components/bottom/Footer';
import PaginationPanel from 'components/bottom/PaginationPanel';
import { lightTheme, darkTheme } from 'theme';
import { useAppSelector } from 'hooks/useAppSelector';
import Subscribe from 'components/subscription/Subscribe';
import useMidnightClock from 'hooks/useMidnightClock';
import useGetUserData from 'hooks/useGetUserData';
import CompletedDialog from 'components/tasks/CompletedDialog';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {unsetSnackbar, unsetSnackbarError} from 'features/appSlice';

function App() {
  const dispatch = useAppDispatch()
  const [subscribeDialogOpen, setSusbcribeDialogOpen] = useState<boolean>(false);

  const handleCloseSubscripe = () => {
    setSusbcribeDialogOpen(false);
  }
  //For snackbar handling
  const snackbar = useAppSelector((state) => state.app.snackbar)
  const snackbarMessage = useAppSelector((state) => state.app.snackbarMessage)
  const snackbarError = useAppSelector((state) => state.app.snackbarError)
  const snackbarErrorMessage = useAppSelector((state) => state.app.snackbarErrorMessage)

  const handleClose = () => { 
    dispatch(unsetSnackbar())
  }
  const handleCloseError = () => {
    dispatch(unsetSnackbarError())
  }

  const colorTheme = useAppSelector((state) => state.settings.colorTheme)

  useGetUserData()
  useMidnightClock()

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
        <ResponsiveAppBar></ResponsiveAppBar>
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
      <CompletedDialog key="completed"></CompletedDialog>
      <Subscribe open={subscribeDialogOpen} handleClose={handleCloseSubscripe}></Subscribe>
      <Snackbar open={snackbar} autoHideDuration={5000} message={snackbarMessage} onClose={handleClose}/>
      <Snackbar open={snackbarError} autoHideDuration={5000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Error: {snackbarErrorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
