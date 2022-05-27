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

export default function TimerCard(props) {
  return (
    <Card variant="outlined" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pl: 1, pb: 1 }}>
            <Typography component="div" variant="h2">
              {String(props.minutes).padStart(2, '0')}:{String(props.seconds).padStart(2, '0')}
            </Typography>
          </Box>
          <LinearProgress variant='determinate' value={100 - (props.minutes * 4)}></LinearProgress>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pl: 1, pb: 1 }}>
            <IconButton onClick={props.onClickStartStop} aria-label="play/pause">
              {props.clockStarted && !props.timerState ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
            </IconButton>
            <IconButton onClick={props.onClickSkip} aria-label="next" sx={{ visibility: props.clockStarted ? 'visible' : 'hidden' }}>
              <SkipNextIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}