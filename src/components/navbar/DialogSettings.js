import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { Dialog, DialogTitle, Grid, Tabs, Tab, IconButton, DialogContent, TextField, Typography, Switch, Slider, Select, MenuItem, ToggleButtonGroup, ToggleButton, Button, DialogActions } from "@mui/material";
import { establishPomodoroTime } from "../../features/appSlice";
import { updateSettings } from '../../features/settingsSlice.js'
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Box } from "@mui/system";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DialogSettings(props) {
    const settings = useSelector(state => state.settings)
    const dispatch = useDispatch()
    //State holding the setting's values
    const [tabSelected, setTabSelected] = useState(0) //0 for timer, 1 for notification, 2 for app section.
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

    const handleChangeTabSelected = (event, newValue) => {
        setTabSelected(newValue)
    };

    const saveSettings = () => {
        if (settings.pomodoroDuration !== pomodoroDuration) {
            dispatch(establishPomodoroTime(pomodoroDuration, 0))
        }
        dispatch(updateSettings(
            {
                pomodoroDuration: parseInt(pomodoroDuration),
                shortBreakDuration: parseInt(shortBreakDuration),
                longBreakDuration: parseInt(longBreakDuration),
                longBreakEvery: parseInt(longBreakEvery), //pomodoros
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
                hoursPastMidnight: parseInt(hoursPastMidnight),
                language: language
            }
        ))
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth={"xs"}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <Grid item xs="auto">
                        <Tabs
                            onChange={handleChangeTabSelected}
                            value={tabSelected}>
                            <Tab label="Timer" {...a11yProps(0)}>
                            </Tab>
                            <Tab label="Notification" {...a11yProps(1)}>
                            </Tab>
                            <Tab label="App" {...a11yProps(2)}>
                            </Tab>
                        </Tabs>
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                <TabPanel value={tabSelected} index={0}>
                    <Grid container spacing={2} direction='column'>
                        <Grid item>
                            <TextField label="Pomodoro duration" helperText="Minutes"
                                value={pomodoroDuration}
                                onChange={(event) => setPomodoroDuration(event.target.value)}
                                sx={{ width: "100%" }}

                            ></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Short break duration" helperText="Minutes"
                                value={shortBreakDuration}
                                onChange={(event) => setShortBreakDuration(event.target.value)}
                                sx={{ width: "100%" }}
                            ></TextField>

                        </Grid>
                        <Grid item>
                            <TextField label="Long break duration" helperText="Minutes"
                                value={longBreakDuration}
                                onChange={(event) => setLongBreakDuration(event.target.value)}
                                sx={{ width: "100%" }}
                            ></TextField>

                        </Grid>
                        <Grid item>
                            <TextField label="Long break every" helperText="Pomodoros"
                                value={longBreakEvery}
                                onChange={(event) => setLongBreakEvery(event.target.value)}
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

                    </Grid>
                </TabPanel>
                <TabPanel value={tabSelected} index={1}>
                    <Grid container spacing={3} direction="column" >
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
                                                onChange={(event, newValue) => { setAlarmVolume(newValue) }} />
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
                                    <Select
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
                                                onChange={(event, newValue) => { setTickingVolume(newValue) }} />
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
                                    <Select sx={{ width: '100%' }}
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
                    </Grid>
                </TabPanel>
                <TabPanel value={tabSelected} index={2}>
                    <Grid container spacing={2} direction="column" >
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                                <Grid item xs='auto'>
                                    <Typography>Start new day at</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        sx={{ width: "100%" }}
                                        value={hoursPastMidnight}
                                        disabled
                                        onChange={(event) => { setHoursPastMidnight(event.target.value) }}>
                                        <MenuItem value="0">0 hours past midnight</MenuItem>
                                        <MenuItem value="1">1 hours past midnight</MenuItem>
                                        <MenuItem value="2">2 hours past midnight</MenuItem>
                                        <MenuItem value="3">3 hours past midnight</MenuItem>
                                        <MenuItem value="4">4 hours past midnight</MenuItem>
                                        <MenuItem value="5">5 hours past midnight</MenuItem>
                                        <MenuItem value="6">6 hours past midnight</MenuItem>
                                        <MenuItem value="7">7 hours past midnight</MenuItem>
                                        <MenuItem value="8">8 hours past midnight</MenuItem>
                                        <MenuItem value="9">9 hours past midnight</MenuItem>
                                        <MenuItem value="10">10 hours past midnight</MenuItem>
                                        <MenuItem value="11">11 hours past midnight</MenuItem>
                                        <MenuItem value="12">12 hours past midnight</MenuItem>
                                        <MenuItem value="13">13 hours past midnight</MenuItem>
                                        <MenuItem value="14">14 hours past midnight</MenuItem>
                                        <MenuItem value="15">15 hours past midnight</MenuItem>
                                        <MenuItem value="16">16 hours past midnight</MenuItem>
                                        <MenuItem value="17">17 hours past midnight</MenuItem>
                                        <MenuItem value="18">18 hours past midnight</MenuItem>
                                        <MenuItem value="19">19 hours past midnight</MenuItem>
                                        <MenuItem value="20">20 hours past midnight</MenuItem>
                                        <MenuItem value="21">21 hours past midnight</MenuItem>
                                        <MenuItem value="22">22 hours past midnight</MenuItem>
                                        <MenuItem value="23">23 hours past midnight</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
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
                                    <Select sx={{ width: '100%' }}
                                        value={language}
                                        onChange={(event) => { setLanguage(event.target.value) }}>
                                        <MenuItem value={"English"}>English</MenuItem>
                                        <MenuItem value={"Español"}>Español</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
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