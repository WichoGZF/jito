import { Dialog, DialogActions } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { DialogContent } from "@mui/material"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import * as React from "react";
import { useState } from "react"
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
import RepeatIcon from '@mui/icons-material/Repeat';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function TaskInput(props) {
    const [datePick, setDatePick] = useState(false);
    const [date, setDate] = useState(props.edit ? props.task.date : "")
    const [taskName, setTaskName] = useState(props.edit ? props.task.name : "")
    const [taskDesc, setTaskDesc] = useState(props.edit ? props.task.description : "")
    const [taskType, setTaskType] = useState('normal')

    const handleDatePicker = () => {
        setDatePick(true)
    }

    const handleChange = (event) => {
        setTaskType(event.target.value);
    };

    return (
        <Box sx={{ width: '90%'}}>
            <Grid container direction='column' gap={2} sx={{ padding: "15px", border: '1px', borderStyle: 'solid', borderColor: "#e2e2e2", borderRadius: '25px'}}>

                <Input id="task-name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    sx={{ flexGrow: 9, gridRow: '1', gridColumn: '2' }}
                    multiline
                    autoFocus={true}
                    placeholder="Task name"
                />
                <Input id="task-description"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    sx={{ fontSize: 14, gridColumn: '2', gridRow: '2', color: "GrayText" }}
                    placeholder="Task description"
                    multiline
                />
                <Stack direction="row" spacing={1} sx={{ gridColumn: '2', gridRow: "3", alignItems: "center" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <IconButton><RepeatIcon></RepeatIcon></IconButton>

                    <FormControl>
                        <FormLabel id="task-type-radio-buttons-group">Task type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={taskType}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                            <FormControlLabel value="square" control={<Radio />} label="Square" />
                        </RadioGroup>
                    </FormControl>
                </Stack>

            </Grid>
            <Grid container direction="row" justifyContent='flex-end' alignItems={'center'} sx={{marginTop: 2}}>
                <Button onClick={props.handleTaskSelectClose}>Cancel</Button>
                <Button onClick={props.handleTaskSelectClose}>OK</Button>
            </Grid>
        </Box>
    )
}
