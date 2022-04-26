import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function TimerControlCard(props) {
  return (
    <Card variant="outlined" sx={{ display: "flex", justifyContent: "center", width: "60vw" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pl: 1, pb: 1 }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
            </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
