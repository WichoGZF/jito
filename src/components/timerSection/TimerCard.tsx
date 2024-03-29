import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LinearProgress from '@mui/material/LinearProgress'
import PauseIcon from '@mui/icons-material/Pause';
import Stack from '@mui/material/Stack';
import { Grid, Typography, IconButton} from "@mui/material";

interface PropTypes {
  clockStarted: boolean,
  timerState: boolean,
  onClickStartStop: () => void,
  onClickSkip: () => void,
  minutes: number,
  seconds: number,
  pomodoros: number,
  longBreakEvery: number, //Every long break
  progress: number,
  rest: boolean,

}

export default function TimerCard(props: PropTypes) {
  let pomodorosCompleted = [];
  for (let i = 0; i < props.longBreakEvery; i++) {
    if (props.pomodoros > i) {
      pomodorosCompleted.push(
        <Grid key={i} item xs><LinearProgress variant='determinate' value={100}></LinearProgress></Grid>
      )
    }
    else {
      pomodorosCompleted.push(
        <Grid key={i} item xs><LinearProgress variant='determinate' value={0}></LinearProgress></Grid>
      )
    }

  }
  return (
    <Stack alignItems='center' spacing={2}>
      <Typography component="div" variant="h2" color="text.primary">
        {String(props.minutes).padStart(2, '0')}:{String(props.seconds).padStart(2, '0')}
      </Typography>
      <LinearProgress sx={{ width: '80%' }} variant='determinate' value={props.progress}></LinearProgress>
      <Grid container direction="row" spacing={1} sx={{ width: "80%" }}>
        {pomodorosCompleted}
      </Grid>
      <Stack direction="row" justifyContent="center" sx={{ width: '100%' }}>
        <Box sx={{ height: '54px', width: '54px' }}></Box>
        <IconButton onClick={props.onClickStartStop} aria-label="play/pause">
          {!props.timerState ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
        </IconButton>
        <IconButton onClick={props.onClickSkip} aria-label="next" sx={{ visibility: (props.clockStarted || props.rest) ? 'visible' : 'hidden' }}>
          <SkipNextIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
