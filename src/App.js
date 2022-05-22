import React, { useState, useEffect } from 'react';


import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TimerControl from './components/TimerControl';
import TaskList from './components/TaskList';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(
    () => {
      if (loggedIn) {
        //Fetch data from server
      }
      else {
        try {
          setTasks(JSON.parse(localStorage.getItem('tasks')))
          setTags(JSON.parse(localStorage.getItem('tags')))
        }
        catch (error) {
          console.error(error)
          localStorage.setItem('tasks', JSON.stringify(tasks))
          localStorage.setItem('tags', JSON.stringify(tags))
        }
      }
    }, []
  )

  useEffect(
    () => {
      //What to do when the user is logged in? Synch to server? 
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]
  )

  useEffect(
    () => {
      localStorage.setItem('tags', JSON.stringify(tags))
    }, [tags]
  )


  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
      <Grid container spacing={4}>
        <Grid container item xs={4} spacing={3} direction='column'>
          <Grid item>
            <TimerControl></TimerControl>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker  /> {/*date={date}  onChange={(newDate) => setDate(newDate)}*/}
            </LocalizationProvider>
          </Grid>
          <Grid item>

          </Grid>
        </Grid>
        <Grid item xs={8} position='sticky'>
          <TaskList></TaskList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
