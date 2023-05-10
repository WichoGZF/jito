import { useState } from 'react';
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import TaskList from './components/tasks/TaskList';
import Grid from '@mui/material/Grid'
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Calendar from './components/timerSection/Calendar';
import { Container, Divider, Stack, Box } from '@mui/material';
import Footer from 'components/bottom/Footer';
import PaginationPanel from 'components/bottom/PaginationPanel';
import { lightTheme, darkTheme } from 'theme';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch'
import Subscribe from 'components/subscription/Subscribe';

import useMidnightClock from 'hooks/useMidnightClock';
import useGetUserData from 'hooks/useGetUserData';

function App() {
  const [subscribeDialogOpen, setSusbcribeDialogOpen] = useState<boolean>(false);

  const handleCloseSubscripe = () => {
    setSusbcribeDialogOpen(false);
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
      <Subscribe open={subscribeDialogOpen} handleClose={handleCloseSubscripe}></Subscribe>
    </ThemeProvider>
  );
}

export default App;
