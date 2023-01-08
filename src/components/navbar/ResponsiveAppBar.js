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

import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux'

import DialogSettings from './DialogSettings'
import DialogLogIn from './DialogLogIn'
import DialogStatistics from "./DialogStatistics";


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
