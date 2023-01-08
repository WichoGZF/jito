import { LocalizationProvider, CalendarPicker } from "@mui/lab";
import { Grid, Divider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { setCalendarDate } from "../../features/appSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TimerControl from "./TimerControl";
import { format } from 'date-fns'

export default function Calendar(props) {
    const date = props.date

    const dispatch = useDispatch();

    const timerStarted = useSelector((state) => state.app.timerStarted);
    const timerState = useSelector((state) => state.app.timerState);

    const dispatchCalendarChange = (newDate) => {
        dispatch(setCalendarDate(format(newDate, 'MM/dd/yyyy')))
    }

    const dateDigits = date.split('/') //mm/dd/yyyy
    const [month, day, year] = dateDigits
    const dateInDateType = new Date(year, month - 1, day)

    return (
        <Grid container item
            xs="auto"
            spacing={3}
            direction='column'
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{ pl: 0, pt: 0, position: 'sticky' }}>

            <Grid item sx={{ width: '100%' }}>
                <TimerControl></TimerControl>
            </Grid>
            <Grid item>
                <Divider></Divider>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CalendarPicker disablePast date={dateInDateType} onChange={dispatchCalendarChange}
                        disabled={timerState || timerStarted} />
                </LocalizationProvider>

            </Grid>
            <Divider orientation="vertical"></Divider>
        </Grid>
    )
}
