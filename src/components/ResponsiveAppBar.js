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
import { Input } from "@mui/material";
import { Link } from '@mui/material';
import { Chip } from "@mui/material";
import { DialogContent, DialogTitle, DialogActions, Dialog } from "@mui/material";
import { Tabs, Tab } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { Divider } from "@mui/material";

import { SvgIcon } from "@mui/material";
import { ReactComponent as GoogleIcon } from '../assets/Google__G__Logo.svg'
import { ReactComponent as FacebookIcon } from '../assets/Facebook_Logo.svg'

import PropTypes from 'prop-types';

import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { height } from "@mui/system";

import { completedTasks } from "../mock.js";

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

import faker from '@faker-js/faker'

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


const DialogSettings = (props) => {
    const [value, setValue] = useState(0);

    const [volumeValue, setVolumeValue] = useState(30);

    const [theme, setTheme] = useState('light')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    const handleVolumeChange = (event, newValue) => {
        setVolumeValue(newValue)
    }

    const handleTheme = (event, newTheme) => {
        setTheme(newTheme)
    }
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <Grid item xs="auto">
                        <Tabs
                            onChange={handleChange}
                            value={value}>
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
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2} direction='column'>
                        <Grid item>
                            <TextField label="Pomodoro duration" defaultValue="25" helperText="Minutes"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Short break duration" defaultValue="25" helperText="Minutes"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Long break duration" defaultValue="25" helperText="Minutes"></TextField>
                        </Grid>
                        <Grid item>
                            <TextField label="Long break every" defaultValue="5" helperText="Pomodoros"></TextField>
                        </Grid>

                        <Grid item>
                            <Grid container justifyContent="space-between" alignItems='center' direction='row'>
                                <Grid item xs="auto">
                                    <Typography>Automatic pomodoro start:</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Switch></Switch>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justifyContent="space-between" alignItems='center' direction='row'>
                                <Grid item xs="auto">
                                    <Typography>Automatic break start:</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Switch></Switch>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                                            <Slider aria-label="Volume" value={value} onChange={handleChange} />
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
                                    <Select sx={{ width: '100%' }}></Select>
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
                                            <Slider aria-label="Volume" value={value} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs='auto'>
                                            <VolumeUp />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={4} direction="row" justifyContent="space-between" alignItems="center" fullWidth='true'>
                                <Grid item xs>
                                    <Typography>Ticking sound</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Select sx={{ width: '100%' }}></Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                                <Grid item xs='auto'>
                                    <Typography>Alarm on pomodoro end</Typography>
                                </Grid>
                                <Grid item xs='auto'>
                                    <Switch></Switch>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                                <Grid item xs='auto'>
                                    <Typography>Alarm on break end</Typography>
                                </Grid>
                                <Grid item xs='auto'>
                                    <Switch></Switch>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                                <Grid item xs='auto'>
                                    <Typography>Ticking sound on break</Typography>
                                </Grid>
                                <Grid item xs='auto'>
                                    <Switch></Switch>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                                <Grid item xs='auto'>
                                    <Typography>Ticking sound on pomodoro</Typography>
                                </Grid>
                                <Grid item xs='auto'>
                                    <Switch></Switch>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container spacing={2} direction="column" >
                        <Grid item>
                            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                                <Grid item xs='auto'>
                                    <Typography>
                                        Color theme
                                    </Typography>
                                </Grid>
                                <Grid item xs='auto'>
                                    <ToggleButtonGroup
                                        value={theme}
                                        exclusive
                                        onChange={handleTheme}
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
                                    <Typography>Time zone</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Select sx={{ width: '100%' }}></Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} direction="row" justifyContent='space-between' alignItems='center'>
                                <Grid item xs>
                                    <Typography>Time format</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Select sx={{ width: '100%' }}></Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} direction="row" justifyContent='space-between' alignItems='center'>
                                <Grid item xs>
                                    <Typography>Date format</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Select sx={{ width: '100%' }}></Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} direction="row" justifyContent='space-between' alignItems='center'>
                                <Grid item xs>
                                    <Typography>Add new tasks to...</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Select sx={{ width: '100%' }}></Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

            </DialogContent>
            <DialogActions >
                <Button onClick={props.handleClose}> Save </Button>
            </DialogActions>

        </Dialog>
    )
}

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
                            Log in
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
                                <Button variant="contained" fullWidth="true">Log in</Button>
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
                                <Button variant="outlined" fullWidth="true" startIcon={<SvgIcon component={GoogleIcon}></SvgIcon>}>Sign in with Google</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" fullWidth="true" startIcon={<SvgIcon component={FacebookIcon} viewBox="0 0 48 48"></SvgIcon>}>Continue with Facebook</Button>
                            </Grid>
                            <Grid item>
                                <Button fullWidth="true">Register with email</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>
    )
}


const DialogStatistics = (props) => {
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

    const labelsLineChart = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const dataLineChart = {
        labels: labelsLineChart,
        datasets: [
            {
                label: 'Dataset 1',
                data: labelsLineChart.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(217, 85, 80)',
                backgroundColor: 'rgb(217, 85, 80)',
            }
        ],
    };

    const labelsBarChart = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sundayb ']

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
                label: 'Productive time',
                data: labelsBarChart.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: 'rgb(217, 85, 80)',
            },
        ],
    };

    const dataDoughnut = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth={"sm"}
            fullWidth={"true"}
        >
            <DialogTitle>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography>
                            Statistics
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container direction='column' spacing={2}>
                    <Stack spacing={4} sx={{ paddingLeft: '16px', paddingTop: '16px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography>Total stats</Typography>
                            </Grid>
                            <Grid item>
                                <Select value={'time'}>
                                    <MenuItem value={'time'}>Time</MenuItem>
                                    <MenuItem value={'sessions'}>Pomodoros</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography>0m</Typography>
                                    <Typography>Today</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography>3h 45m</Typography>
                                    <Typography>Week 24</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography>4h 48m</Typography>
                                    <Typography>June</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography>6h 1m</Typography>
                                    <Typography>Total</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Grid container item direction={'column'}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item><Typography>History</Typography></Grid>
                            <Grid item>
                                <Select value={'days'}>
                                    <MenuItem value={'days'}>Days</MenuItem>
                                    <MenuItem value={'weeks'}>Weeks</MenuItem>
                                    <MenuItem value={'months'}>Months</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Line options={optionsLineChart} data={dataLineChart}></Line>
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography>Productive time</Typography>
                            </Grid>
                            <Grid item>
                                <Select value={'days'}>
                                    <MenuItem value={'days'}>Minutes</MenuItem>
                                    <MenuItem value={'weeks'}>Pomdoros</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Bar options={optionsBarChart} data={dataBarChart}></Bar>
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography>Time distribution</Typography>
                            </Grid>
                            <Grid item>
                                <Select value={'days'}>
                                    <MenuItem value={'days'}>Today</MenuItem>
                                    <MenuItem value={'weeks'}>This week</MenuItem>
                                    <MenuItem value={'months'}>This month</MenuItem>
                                    <MenuItem value={'months'}>Total</MenuItem>
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
                        Pomodoro Pizza
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
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
