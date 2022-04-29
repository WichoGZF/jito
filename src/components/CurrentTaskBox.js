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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

export default function CurrentTaskBox(props) {
    const [datePick, setDatePick] = React.useState(false);
    const [newDate, setNewDate] = React.useState(null);

    const handleDatePicker = () => {
        setDatePick(true)
    }

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
                        <IconButton onClick={()=> props.openTagSelect(true)}>
                            <LocalOfferIcon></LocalOfferIcon>
                        </IconButton>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                            label="Date"
                                value={newDate}
                                onChange={(newValue) => {
                                    setNewDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        
                    </Stack>

                </Box>
            </CardContent>
        </Card >
    );
}
