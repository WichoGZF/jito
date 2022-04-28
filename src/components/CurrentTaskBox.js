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
import Grid from '@mui/material/Grid';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Input from '@mui/material/Input';
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
        <Card sx={{ width: "80vw", minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Current task
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: "50px 1fr", rowGap: "5px", alignItems: "center" }}>
                    <IconButton aria-label="complete" size="large" sx={{ height: "50px" }}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                    <Input id="task-name"
                        value="Finish this app because youre rtard longer longer "
                        sx={{ flexGrow: 9}}
                        disableUnderline
                        multiline
                    />
                    <Input id="task-description"
                        value="The details are i'm locked up please help goddamint i cant make it D::"
                        sx={{ fontSize: 14, gridColumn: '2', gridRow: '2', color:"GrayText" }}
                        disableUnderline
                        multiline
                    />

                    <Stack direction="row" spacing={1} sx={{ gridColumn: '2', gridRow: "3", alignItems: "center" }}>
                        <Chip label="primary" color="primary" />
                        <Chip label="secondary" color="success" />
                        <IconButton aria-label="complete" size="large" sx={{ height: "50px", width: "50px" }}>
                            <LocalOfferIcon></LocalOfferIcon>
                        </IconButton>
                        <Button startIcon={<CalendarMonthIcon />}>mon. apr 29</Button>
                    </Stack>

                </Box>
            </CardContent>
        </Card >
    );
}
