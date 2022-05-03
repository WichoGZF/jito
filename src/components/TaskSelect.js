import { Dialog, DialogActions } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { DialogContent } from "@mui/material"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";


export default function TaskSelect(props) {
    const [datePick, setDatePick] = React.useState(props);
    const [newDate, setNewDate] = React.useState(props.date || null);
    const [taskName, setTaskName] = React.useState(props.taskName)
    const [taskDescription, setTaskDescription] = React.useState(props.taskDescription)
    const handleDatePicker = () => {
        setDatePick(true)
    }
    return (
        <Dialog open={props.openTaskSelect} onClose={props.closeTaskSelect}>
            <DialogTitle>Edit task <EditIcon /></DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'grid', gridTemplateColumns: "50px 1fr", rowGap: "5px", alignItems: "center" }}>
                    <Input id="task-name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        sx={{ flexGrow: 9 }}
                        disableUnderline
                        multiline
                    />
                    <Input id="task-description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        sx={{ fontSize: 14, gridColumn: '2', gridRow: '2', color: "GrayText" }}
                        disableUnderline
                        multiline
                    />

                    <Stack direction="row" spacing={1} sx={{ gridColumn: '2', gridRow: "3", alignItems: "center" }}>
                        <Chip label="primary" color="primary" />
                        <Chip label="secondary" color="success" />
                        <IconButton onClick={() => props.openTagSelect(true)}>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeTaskSelect}>Cancel</Button>
                <Button onClick={() => { }}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}
