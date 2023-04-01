import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { Dialog, DialogTitle, Grid, IconButton, DialogContent, TextField, Typography, Switch, Slider, Select, MenuItem, ToggleButtonGroup, ToggleButton, Button, DialogActions, Divider } from "@mui/material";
import { establishPomodoroTime } from "../../features/appSlice";
import { updateSettings } from '../../features/settingsSlice.js'
import  { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from "hooks";

interface PropTypes{ 
    open: boolean,
    handleClose: any,
}

export default function DialogSettings(props: PropTypes) {
    const settings = useAppSelector(state => state.settings)
    const dispatch = useAppDispatch()
    //Timer settings
    const [pomodoroDuration, setPomodoroDuration] = useState(settings.pomodoroDuration);
    const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration);
    const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration)
    const [longBreakEvery, setLongBreakEvery] = useState(settings.longBreakEvery)
    const [automaticPomodoroStart, setAutomaticPomodoroStart] = useState(settings.automaticPomodoroStart)
    const [automaticBreakStart, setAutomaticBreakStart] = useState(settings.automaticBreakStart)
    //Notification settings
    const [alarmVolume, setAlarmVolume] = useState(settings.alarmVolume)
    const [alarmSound, setAlarmSound] = useState(settings.alarmSound)
    const [tickingVolume, setTickingVolume] = useState(settings.tickingVolume)
    const [tickingSound, setTickingSound] = useState(settings.tickingSound)
    const [alarmOnPomodoroEnd, setAlarmOnPomodoroEnd] = useState(settings.alarmOnPomodoroEnd)
    const [alarmOnBreakEnd, setAlarmOnBreakEnd] = useState(settings.alarmOnBreakEnd)
    const [tickingSoundOnBreak, setTickingSoundOnBreak] = useState(settings.tickingSoundOnBreak)
    const [tickingSoundOnPomodoro, setTickingSoundOnPomodoro] = useState(settings.tickingSoundOnPomodoro)
    //App 
    const [colorTheme, setColorTheme] = useState(settings.colorTheme)
    const [hoursPastMidnight, setHoursPastMidnight] = useState(settings.hoursPastMidnight)
    const [language, setLanguage] = useState(settings.language)

    const saveSettings = () => {
        if (settings.pomodoroDuration !== pomodoroDuration) {
            dispatch(establishPomodoroTime(pomodoroDuration, 0))
        }
        dispatch(updateSettings(
            {
                pomodoroDuration: pomodoroDuration,
                shortBreakDuration: shortBreakDuration,
                longBreakDuration: longBreakDuration,
                longBreakEvery: longBreakEvery, //pomodoros
                automaticPomodoroStart: automaticPomodoroStart,
                automaticBreakStart: automaticBreakStart,

                // notification

                alarmVolume: alarmVolume,
                alarmSound: alarmSound,
                tickingVolume: tickingVolume,
                tickingSound: tickingSound,
                alarmOnPomodoroEnd: alarmOnPomodoroEnd,
                alarmOnBreakEnd: alarmOnBreakEnd,
                tickingSoundOnBreak: tickingSoundOnBreak,
                tickingSoundOnPomodoro: tickingSoundOnPomodoro,
                //app

                colorTheme: colorTheme,
                hoursPastMidnight: hoursPastMidnight,
                language: language
            }
        ))
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <Typography variant='h5'>
                        Settings
                    </Typography>
                    <IconButton onClick={props.handleClose}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} direction='column'>
                    <Grid item>
                        <Typography variant='h6'>Timer</Typography>
                    </Grid>
                    <Grid item>
                        <TextField label="Pomodoro duration" helperText="Minutes" size='small'
                            value={pomodoroDuration}
                            onChange={(event) => setPomodoroDuration(parseInt(event.target.value))}
                            sx={{ width: "100%" }}

                        ></TextField>
                    </Grid>
                    <Grid item>
                        <TextField label="Short break duration" helperText="Minutes" size='small'
                            value={shortBreakDuration}
                            onChange={(event) => setShortBreakDuration(parseInt(event.target.value))}
                            sx={{ width: "100%" }}
                        ></TextField>

                    </Grid>
                    <Grid item>
                        <TextField label="Long break duration" helperText="Minutes" size='small'
                            value={longBreakDuration}
                            onChange={(event) => setLongBreakDuration(parseInt(event.target.value))}
                            sx={{ width: "100%" }}
                        ></TextField>

                    </Grid>
                    <Grid item>
                        <TextField label="Long break every" helperText="Pomodoros" size='small'
                            value={longBreakEvery}
                            onChange={(event) => setLongBreakEvery(parseInt(event.target.value))}
                            sx={{ width: "100%" }}
                        ></TextField>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent="space-between" alignItems='center' direction='row'>
                            <Grid item xs="auto">
                                <Typography>Automatic pomodoro start:</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Switch checked={automaticPomodoroStart}
                                    onChange={() => setAutomaticPomodoroStart(!automaticPomodoroStart)}></Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent="space-between" alignItems='center' direction='row'>
                            <Grid item xs="auto">
                                <Typography>Automatic break start:</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Switch
                                    checked={automaticBreakStart}
                                    onChange={() => setAutomaticBreakStart(!automaticBreakStart)}></Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider></Divider>
                    </Grid>

                    {/*Sounds*/}
                    <Grid item>
                        <Typography variant='h6'>Sounds</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                            <Grid item xs="auto"><Typography>Alarm volume</Typography></Grid>
                            <Grid item xs>
                                <Grid container spacing={2} direction="row" alignItems="center">
                                    <Grid item xs='auto'>
                                        <VolumeDown />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider aria-label="Volume"
                                            value={alarmVolume}
                                            onChange={(event, newValue) => { setAlarmVolume(newValue as number) }} />
                                    </Grid>
                                    <Grid item xs='auto'>
                                        <VolumeUp />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={4} direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs>
                                <Typography>Alarm sound</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Select size='small'
                                    sx={{ width: "100%" }}
                                    value={alarmSound}
                                    onChange={(event) => { setAlarmSound(event.target.value) }}>
                                    <MenuItem value="answerTone">Answer tone</MenuItem>
                                    <MenuItem value="bell">Bell</MenuItem>
                                    <MenuItem value="clearAnnounce">Clear announce</MenuItem>
                                    <MenuItem value="confirmationTone">Confirmation tone</MenuItem>
                                    <MenuItem value="doorbellLight">Doorbell light</MenuItem>
                                    <MenuItem value="doorbellPlain">Doorbell plain</MenuItem>
                                    <MenuItem value="flute">Flute</MenuItem>
                                    <MenuItem value="positive">Positive</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent="space-between" alignItems="center" spacing={4}>
                            <Grid item xs='auto'>
                                <Typography>Ticking volume</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                    <Grid item xs='auto'>
                                        <VolumeDown />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider aria-label="Volume"
                                            value={tickingVolume}
                                            onChange={(event, newValue) => { setTickingVolume(newValue as number) }} />
                                    </Grid>
                                    <Grid item xs='auto'>
                                        <VolumeUp />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={4} direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs>
                                <Typography>Ticking sound</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Select sx={{ width: '100%' }} size='small'
                                    value={tickingSound}
                                    onChange={(event) => setTickingSound(event.target.value)}>
                                    <MenuItem value="clock">Clock tick</MenuItem>
                                    <MenuItem value="pendulum">Pendulum</MenuItem>
                                    <MenuItem value="wallClockTick">Wall clock tick</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                            <Grid item xs='auto'>
                                <Typography>Alarm on pomodoro end</Typography>
                            </Grid>
                            <Grid item xs='auto'>
                                <Switch checked={alarmOnPomodoroEnd}
                                    onChange={() => { setAlarmOnPomodoroEnd(!alarmOnPomodoroEnd) }}></Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                            <Grid item xs='auto'>
                                <Typography>Alarm on break end</Typography>
                            </Grid>
                            <Grid item xs='auto'>
                                <Switch checked={alarmOnBreakEnd}
                                    onChange={() => { setAlarmOnBreakEnd(!alarmOnBreakEnd) }}></Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                            <Grid item xs='auto'>
                                <Typography>Ticking sound on break</Typography>
                            </Grid>
                            <Grid item xs='auto'>
                                <Switch value={tickingSoundOnBreak}
                                    onChange={() => { setTickingSoundOnBreak(!tickingSoundOnBreak) }}></Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                            <Grid item xs='auto'>
                                <Typography>Ticking sound on pomodoro</Typography>
                            </Grid>
                            <Grid item xs='auto'>
                                <Switch checked={tickingSoundOnPomodoro}
                                    onChange={() => { setTickingSoundOnPomodoro(!tickingSoundOnPomodoro) }}></Switch>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Divider></Divider>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>General</Typography>

                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                            <Grid item xs='auto'>
                                <Typography>
                                    Color theme
                                </Typography>
                            </Grid>
                            <Grid item xs='auto'>
                                <ToggleButtonGroup
                                    value={colorTheme}
                                    size='small'
                                    exclusive
                                    onChange={(event, newTheme) => { setColorTheme(newTheme) }}
                                    aria-label="theme select"
                                >
                                    <ToggleButton value="light" aria-label="dark theme">
                                        <Button>Light</Button>
                                    </ToggleButton>
                                    <ToggleButton value="dark" aria-label="dark theme">
                                        <Button>Dark</Button>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={2} direction="row" justifyContent='space-between' alignItems='center'>
                            <Grid item xs>
                                <Typography>Language</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Select sx={{ width: '100%' }} size='small'
                                    value={language}
                                    onChange={(event) => { setLanguage(event.target.value) }}>
                                    <MenuItem value={"English"}>English</MenuItem>
                                    <MenuItem value={"Español"}>Español</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions >
                <Button onClick={
                    () => {
                        props.handleClose()
                        saveSettings()
                    }}
                > Save </Button>
            </DialogActions>

        </Dialog>
    )
}