import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import { flexbox } from "@mui/system";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CurrentTaskBox() {
  return (
    <Card sx={{width: "60vw", minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Current task
        </Typography>
        <Box sx={{display: "flex", alignItems: "start"}}>
        <IconButton aria-label="complete" size="large">
          <CheckCircleOutlineIcon />
        </IconButton>
        <Typography variant="h5" component="div">
          Finish this app because youre rtard longer longer longre
        </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" />
          <Chip label="secondary" color="success" />
        </Stack>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
