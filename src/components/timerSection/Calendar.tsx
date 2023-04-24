import { LocalizationProvider, CalendarPicker } from "@mui/x-date-pickers";
import { Grid, Divider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { setCalendarDate } from "../../features/appSlice";
import { useAppSelector, useAppDispatch } from "hooks";
import TimerControl from "./TimerControl";
import { format } from 'date-fns'

export default function Calendar() {
    const dispatch = useAppDispatch();

    const calendarDate = useAppSelector((state) => state.app.calendarDate);
    const timerStarted = useAppSelector((state) => state.app.timerStarted);
    const timerState = useAppSelector((state) => state.app.timerState);

    const dispatchCalendarChange = (newDate) => {
        dispatch(setCalendarDate(format(newDate, 'MM/dd/yyyy')))
    }

    const dateDigits = calendarDate.split('/') //mm/dd/yyyy
    const [month, day, year] = dateDigits
    const dateInDateType = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

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
                        disabled={timerState || timerStarted} 
                        views={['month', 'day']}/>
                </LocalizationProvider>

            </Grid>
            <Divider orientation="vertical"></Divider>
        </Grid>
    )
}