import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LinearProgress from '@mui/material/LinearProgress'
import PauseIcon from '@mui/icons-material/Pause';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import { StayPrimaryLandscape } from "@mui/icons-material";

function ProgressBox(props) {

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item sx={{ backgroundColor: "blue", height: "10px" }}></Grid>
      <Grid item sx={{ backgroundColor: "blue", height: "10px" }}></Grid>
      <Grid item sx={{ backgroundColor: "blue", height: "10px" }}></Grid>
      <Grid item sx={{ backgroundColor: "blue", height: "10px" }}></Grid>
    </Grid>
  )
}

export default function TimerCard(props) {
  let pomodorosCompleted = [];
  for(let i=0; i<props.longBreakEvery; i++){
    console.log('for repeat timer card')
    if (props.pomodoros>i){
      pomodorosCompleted.push(
        <Grid key = {i} item xs><LinearProgress  variant='determinate' value={100}></LinearProgress></Grid>
      )
    }
    else {
      pomodorosCompleted.push(
        <Grid key = {i} item xs><LinearProgress  variant='determinate' value={0}></LinearProgress></Grid>
      )
    }

  }
  return (
    <Stack alignItems='center' spacing={2}>
      <Typography component="div" variant="h2" color="grey.900">
        {String(props.minutes).padStart(2, '0')}:{String(props.seconds).padStart(2, '0')}
      </Typography>
      <LinearProgress sx={{ width: '80%' }} variant='determinate' value={props.progress}></LinearProgress>
      <Grid container direction="row" spacing={1} sx={{width: "80%"}}>
        {pomodorosCompleted}
      </Grid>
      <Stack direction="row" justifyContent="center" sx={{ width: '100%' }}>
        <Box sx={{ height: '54px', width: '54px' }}></Box>
        <IconButton onClick={props.onClickStartStop} aria-label="play/pause">
          {!props.timerState ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
        </IconButton>
        <IconButton onClick={props.onClickSkip} aria-label="next" sx={{ visibility: props.clockStarted ? 'visible' : 'hidden' }}>
          <SkipNextIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
