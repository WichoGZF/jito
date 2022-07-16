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

import {useDispatch, useSelector} from 'react-redux'
import {setCalendarDate, startNewDay} from './features/appSlice.js'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const date = useSelector((state) => state.app.calendarDate); 

  const dispatchCalendarChange = (newDate) => {
    dispatch(setCalendarDate(format(newDate, 'MM/dd/yyyy')))
  } 
  //Converting from
  const dateDigits = date.split('/') //mm/dd/yyyy
  const [month, day, year] = dateDigits
  const dateInDateType = new Date(year, month-1, day)

  useEffect(()=> {
    const hours = dateInDateType.getHours()
    const minutes = dateInDateType.getMinutes()

    const actualMinutesInDay = hours*60 + minutes
    const remainingMinutes = 24^60 - actualMinutesInDay
    const remainingMiliseconds = remainingMinutes * 60 * 1000
    setTimeout(()=>{
      dispatch(startNewDay())
    }, remainingMiliseconds)
  }, [])

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
              <CalendarPicker disablePast date={dateInDateType} onChange={dispatchCalendarChange}/> 
            </LocalizationProvider>

          </Grid>
          <Divider orientation="vertical"></Divider>
        </Grid>
        <Grid item xs>
          <TaskList></TaskList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
