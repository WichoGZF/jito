import React, { useState } from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import TimerControlCard from './components/TimerControlCard';
import CurrentTaskBox from './components/CurrentTaskBox';
import './App.css';
import Box from "@mui/material/Box";


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
      <CurrentTaskBox></CurrentTaskBox>
    </Box>
  );
}

export default App;
