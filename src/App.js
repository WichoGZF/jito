import React, { useState, useEffect } from 'react';

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TimerControl from './components/TimerControl';
import TaskList from './components/TaskList';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'

import {format, compareAsc} from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

import { Divider } from '@mui/material';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Box sx={{minWidth:'700px'}}>
      <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
      <Grid container spacing={4} sx={{ marginTop: '5px'}}>
        <Grid container item
          xs="auto"
          spacing={3}
          direction='column'
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{ pl: 0, pt: 0, position:'sticky'}}>
          
          <Grid item sx={{width:'100%'}}>
            <TimerControl></TimerControl>
          </Grid>
          <Grid item>
            <Divider></Divider>
          </Grid>
          <Grid item sx={{width:'100%'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker disablePast date={date} onChange={(newDate)=>setDate(newDate)}/> 
            </LocalizationProvider>

          </Grid>
          <Divider orientation="vertical"></Divider>
        </Grid>
        <Grid item xs>
          <TaskList date={date}></TaskList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
