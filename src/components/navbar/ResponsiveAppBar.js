import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import Button from '@mui/material/Button';
import { Select, Stack, Switch } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { DialogContent, DialogTitle, DialogActions, Dialog } from "@mui/material";

import { Divider } from "@mui/material";

import { SvgIcon } from "@mui/material";
import { ReactComponent as GoogleIcon } from '../../assets/Google__G__Logo.svg'
import { ReactComponent as FacebookIcon } from '../../assets/Facebook_Logo.svg'

import PropTypes from 'prop-types';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

import { useSelector, useDispatch } from 'react-redux'

import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";
import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns";
import getDay from 'date-fns/getDay'
import subDays from 'date-fns/subDays'
import subMonths from "date-fns/subMonths";
import DialogSettings from './DialogSettings'

import CloseIcon from '@mui/icons-material/Close';

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



const DialogLogIn = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
                        <Typography>
                            Log in (WIP)
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={5} direction="row" >
                    <Grid item xs>
                        <Grid container spacing={2} direction="column" alignItems="expand">
                            <Grid item>
                                <TextField placeholder="Username or email address"></TextField>
                            </Grid>
                            <Grid item>
                                <TextField placeholder="Password"></TextField>
                            </Grid>
                            <Grid item xs>
                                <Button variant="contained" fullWidth={true}>Log in</Button>
                            </Grid>
                            <Grid item xs>
                                <Button>Forgot your password?</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ pl: "40px" }}></Divider>
                    <Grid item xs>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Button variant="outlined" fullWidth={true} startIcon={<SvgIcon component={GoogleIcon}></SvgIcon>}>Sign in with Google</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" fullWidth={true} startIcon={<SvgIcon component={FacebookIcon} viewBox="0 0 48 48"></SvgIcon>}>Continue with Facebook</Button>
                            </Grid>
                            <Grid item>
                                <Button fullWidth={true}>Register with email</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>
    )
}


const DialogStatistics = (props) => {
    //Redux selectors
    const tags = useSelector(state => state.tasks.tags)
    const history = useSelector(state => state.tasks.history)

    //Component state
    const [historySelect, setHistorySelect] = useState("days")
    const [productiveTimeSelect, setProductiveTimeSelect] = useState("minutes")
    const [timeDistribuitionSelect, setTimeDistribuitionSelect] = useState("today")

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const todayDate = new Date();
    const todayMonth = String(todayDate.getMonth() + 1).padStart(2, 0)
    const todayMonthName = monthNames[todayDate.getMonth()]
    const todayDay = String(todayDate.getDate()).padStart(2, 0);
    const todayYear = String(todayDate.getFullYear())
    const todayStringDate = todayMonth + "/" + todayDay + "/" + todayYear

    const dayTime = () => {
        let totalTimeSpent = 0;
        for (const completedTask of history) {
            console.log(completedTask)
            const { completeDate, time } = completedTask
            if (completeDate === todayStringDate) {
                totalTimeSpent += time
            }
        }
        return totalTimeSpent
    }

    const weekTime = () => {
        let totalTimeSpent = 0;
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const weekDifference = differenceInCalendarWeeks(
                todayDate,
                new Date(completedYear, parseInt(completedMonth) - 1, completedDay)
            )
            if (weekDifference < 1) {
                totalTimeSpent += time;
            }
        }
        return totalTimeSpent
    }

    const monthTime = () => {
        let totalMonthTime = 0;
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            console.log(completeDate)
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')
            console.log(todayYear, completedYear, todayMonth, completedMonth)
            if (todayYear === completedYear && todayMonth === completedMonth) {
                totalMonthTime += time
            }
        }
        return totalMonthTime
    }

    const totalTime = () => {
        let totalTime = 0;
        for (const completeTask of history) {
            totalTime += completeTask.time
        }
        return totalTime
    }

    const daysTime = () => {
        let dayTimeSpent = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const dayDifference = differenceInCalendarDays(
                todayDate,
                new Date(completedYear, parseInt(completedMonth) - 1, completedDay)
            )
            if (dayDifference < 7) {
                dayTimeSpent[6 - dayDifference] += time;
            }
        }
        return dayTimeSpent
    }

    const weeksTime = () => {
        let weekTimeSpent = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const weekDifference = differenceInCalendarWeeks(
                todayDate,
                new Date(completedYear, parseInt(completedMonth) - 1, completedDay)
            )
            if (weekDifference < 7) {
                weekTimeSpent[6 - weekDifference] += time;
            }
        }
        return weekTimeSpent
    }

    const monthsTime = () => {
        let monthTimeSpent = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const monthDifference = differenceInCalendarMonths(
                todayDate,
                new Date(completedYear, parseInt(completedMonth) - 1, completedDay)
            )
            if (monthDifference < 7) {
                monthTimeSpent[6 - monthDifference] += time;
            }
        }
        return monthTimeSpent
    }

    const daysOfTheWeekTime = () => {
        let daysOfTheWeek = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const dayOfTheWeek = getDay(new Date(completedYear, parseInt(completedMonth) - 1, completedDay))
            daysOfTheWeek[dayOfTheWeek] += time;
        }
        return daysOfTheWeek
    }


    const tagsTime = (time) => {
        console.log("Entering tags time")
        let tagTime = {}
        for (const tag of tags) {
            console.log(tag)
            tagTime[tag.name] = 0
        }
        switch (time) {
            case 'today':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    if (todayStringDate === completeDate) {
                        tagTime[tag] += time;
                    }
                }
                break;
            case 'week':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    const [completedMonth, completedDay, completedYear] = completeDate.split('/')
                    const dayDifference = differenceInCalendarDays(
                        todayDate,
                        new Date(completedYear, parseInt(completedMonth) - 1, completedDay)
                    )
                    if (dayDifference < 7) {
                        tagTime[tag] += time;
                    }
                }
                break;
            case 'month':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    const [completedMonth, completedDay, completedYear] = completeDate.split('/')
                    const monthDifference = differenceInCalendarMonths(
                        todayDate,
                        new Date(completedYear, parseInt(completedMonth) - 1, completedDay)
                    )
                    if (monthDifference < 1) {
                        tagTime[tag] += time;
                    }
                }
                break;
            case 'all':
                for (const completedTask of history) {
                    const { completedTime, time, tag } = completedTask
                    tagTime[tag] += time;
                }
                break;
        }


        let array = []
        Object.values(tagTime).forEach((value, index) => array.push(value))
        console.log("Tags time:", tagTime, array)
        return (array)
    }

    const secondsToHourMins = (seconds) => {
        const minutes = Math.trunc(seconds / 60)
        const hours = Math.trunc(minutes / 60)
        if (hours > 0) {
            return (`${hours}h ${minutes % 60}m`)
        }
        else {
            return (`${minutes}m`)
        }
    }


    const secondsArrayToMinutesArray = (secondsArray) => {
        secondsArray.forEach((seconds, index) => secondsArray[index] = Math.floor(seconds / 60))
        return secondsArray
    }

    const secondsArrayToHoursArray = (secondsArray) => {
        secondsArray.forEach((seconds, index) => secondsArray[index] = ((seconds / 60) / 60))
        return secondsArray
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        ChartTooltip,
        Legend,
        BarElement,
        ArcElement
    );

    const optionsLineChart = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };
    let labelsLineChart = []
    switch (historySelect) {
        case "days":
            for (let i = 6; i >= 0; i--) {
                const newDate = subDays(todayDate, i)
                labelsLineChart.push(String(newDate.getDate()))
            }
            break;
        case "weeks":
            for (let i = 6; i > 0; i--) {
                labelsLineChart.push(`${i} weeks ago`)
            };
            labelsLineChart.push("This week")
            break;
        case "months":
            for (let i = 6; i >= 0; i--) {
                const newDate = subMonths(todayDate, i)
                labelsLineChart.push(`${monthNames[newDate.getMonth()]}`)

            }
            break;
    }

    let dataLineData = []
    switch (historySelect) {
        case "days":
            dataLineData = secondsArrayToHoursArray(daysTime());
            break;
        case "weeks":
            dataLineData = secondsArrayToHoursArray(weeksTime());
            break;
        case "months":
            dataLineData = secondsArrayToHoursArray(monthsTime());
    }

    console.log("Data line data:", dataLineData)

    const dataLineChart = {
        labels: labelsLineChart,
        datasets: [
            {
                label: 'Hours',
                data: dataLineData,
                borderColor: 'rgb(217, 85, 80)',
                backgroundColor: 'rgb(255 142 138)',
            }
        ],
    };

    const labelsBarChart = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    const optionsBarChart = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const dataBarChart = {
        labels: labelsBarChart,
        datasets: [
            {
                label: productiveTimeSelect === 'minutes' ? "Minutes" : "Hours",
                data: productiveTimeSelect === 'minutes' ? secondsArrayToMinutesArray(daysOfTheWeekTime()) : secondsArrayToHoursArray(daysOfTheWeekTime()),
                backgroundColor: 'rgb(255 142 138)',
            },
        ],
    };

    function getRandomColor() {
        const color1 = Math.floor(Math.random() * 255)
        const color2 = Math.floor(Math.random() * 255)
        const color3 = Math.floor(Math.random() * 255)
        return `rgb(${color1} ${color2} ${color3})`;
    }

    const doughnutColors = () => {
        let colors = []
        for (const tag of tags) {
            colors.push(tag.color)
        }
        return (colors)
    }


    const dataDoughnut = {
        labels: tags.map((tag) => { return (tag.name) }),
        datasets: [
            {
                label: 'Minutes',
                data: secondsArrayToHoursArray(tagsTime(timeDistribuitionSelect)),
                backgroundColor: doughnutColors(),
                borderColor: doughnutColors(),
                borderWidth: 1,
            },
        ],
    };


    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography color="grey.700" variant="h5">
                            Statistics (WIP)
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container direction='column' spacing={2}>
                    <Stack spacing={4} sx={{ paddingLeft: '16px', paddingTop: '16px', marginBottom: '16px' }}>
                        <Typography >Total stats</Typography>
                        <Grid container item>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(dayTime())}</Typography>
                                    <Typography color="grey.600">Today</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(weekTime())}</Typography>
                                    <Typography color="grey.600">This week</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(monthTime())}</Typography>
                                    <Typography color="grey.600">{todayMonthName}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(totalTime())}</Typography>
                                    <Typography color="grey.600">Total</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Divider></Divider>
                    <Grid container item direction={'column'} spacing={2} sx={{ marginBottom: '32px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item><Typography>History</Typography></Grid>
                            <Grid item>
                                <Select value={historySelect} onChange={(event) => { setHistorySelect(event.target.value) }}>
                                    <MenuItem value={'days'}><Typography>Days</Typography></MenuItem>
                                    <MenuItem value={'weeks'}><Typography>Weeks</Typography></MenuItem>
                                    <MenuItem value={'months'}><Typography>Months</Typography></MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Line options={optionsLineChart} data={dataLineChart}></Line>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container item spacing={2} sx={{ marginBottom: '32px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography >Productive time</Typography>
                            </Grid>
                            <Grid item>
                                <Select value={productiveTimeSelect} onChange={(event) => { setProductiveTimeSelect(event.target.value) }}>
                                    <MenuItem value={'minutes'}>Minutes</MenuItem>
                                    <MenuItem value={'hours'}>Hours</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Bar options={optionsBarChart} data={dataBarChart}></Bar>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container item spacing={2} sx={{ marginBottom: '32px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Stack>
                                    <Typography >Time distribution (hours)</Typography>
                                </Stack>

                            </Grid>
                            <Grid item>
                                <Select value={timeDistribuitionSelect} onChange={(event) => { setTimeDistribuitionSelect(event.target.value) }}>
                                    <MenuItem value={'today'}>Today</MenuItem>
                                    <MenuItem value={'week'}>This week</MenuItem>
                                    <MenuItem value={'month'}>This month</MenuItem>
                                    <MenuItem value={'all'}>Total</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Doughnut data={dataDoughnut}></Doughnut>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

const ResponsiveAppBar = (props) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(null)
    const [loggedIn, setLoggedIn] = useState(true)

    const timerStarted = useSelector((state) => state.app.timerStarted);

    console.log(dialogOpen);

    let loggedInLabel
    if (props.loggedIn) {
        loggedInLabel = "Logout"
    }
    else {
        loggedInLabel = "Log In"
    }

    const settings = ["Settings", "Statistics", loggedInLabel];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        console.log(anchorElUser)
    };

    const handleSelectUserMenu = (selection) => {
        setDialogOpen(selection);
        setAnchorElUser(null);
        console.log(dialogOpen)
    };

    const handleCloseDialog = () => {
        setDialogOpen(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    console.log('Timer started', timerStarted)

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AvTimerIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Pomodoro Planner
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open menu">
                            {loggedIn
                                ? <IconButton onClick={handleOpenUserMenu}
                                disabled={timerStarted}
                                sx={{ p: 0 }}>
                                    <Avatar alt="?" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                                : <Button onClick={handleOpenUserMenu}
                                disabled={timerStarted}
                                >user</Button>
                            }
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, index) => (
                                <MenuItem key={setting} onClick={() => handleSelectUserMenu(index + 1)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <DialogLogIn open={dialogOpen === 3} handleClose={handleCloseDialog}></DialogLogIn>
            <DialogSettings open={dialogOpen === 1} handleClose={handleCloseDialog}></DialogSettings>
            <DialogStatistics open={dialogOpen === 2} handleClose={handleCloseDialog}></DialogStatistics>
        </AppBar>
    );
};
export default ResponsiveAppBar;
