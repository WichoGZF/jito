import React, { useState } from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TimerControlCard from './components/TimerControlCard';
import './App.css';
import Box from "@mui/material/Box";
import TaskSection from './components/TaskSection';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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
      <TaskSection></TaskSection>
    </Box>
  );
}

export default App;
