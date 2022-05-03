import React, { useState } from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TimerControlCard from './components/TimerControlCard';
import './App.css';
import Box from "@mui/material/Box";
import TaskSection from './components/TaskSection';
import { useEffect } from 'react';

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

 const taskHandler = (task, index) =>{
    tasks[index] = task 
 }
 
 const tagHandler = (tag, index) => {
   tag[index] = tag
 }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
      <TimerControlCard></TimerControlCard>
      <TaskSection tagHandler={tagHandler} taskHandler={taskHandler} tasks={tasks} tags={tags}></TaskSection>
    </Box>
  );
}

export default App;
