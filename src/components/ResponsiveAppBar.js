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
import { Switch } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import { Link } from '@mui/material';
import { Chip } from "@mui/material";
import { DialogContent, DialogTitle, DialogActions, Dialog } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import { Divider } from "@mui/material";

import { SvgIcon } from "@mui/material";
import {ReactComponent as GoogleIcon} from '../assets/Google__G__Logo.svg'
import {ReactComponent as FacebookIcon} from '../assets/Facebook_Logo.svg'

const DialogSettings = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
                        <Typography>
                            Settings
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
                <Box>
                    <Typography>Timer configuration</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField label="Pomodoro duration" defaultValue="25" helperText="Minutes"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Short break duration" defaultValue="25" helperText="Minutes"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Long break duration" defaultValue="25" helperText="Minutes"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Long break every" defaultValue="4" helperText="pomodoros"></TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container justifyContent="space-between">
                        <Grid item xs="auto">
                            <Typography>Automatic pomodoro start:</Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <Switch></Switch>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container justifyContent="space-between">
                        <Grid item xs="auto">
                            <Typography>Automatic break start:</Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <Switch></Switch>
                        </Grid>
                    </Grid>
                </Box>

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
                                <Link underline="none" href="#">Forgot your password?</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider orientation = "vertical" flexItem sx={{pl:"40px"}}></Divider>
                    <Grid item xs>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Button variant="outlined" fullWidth="true" startIcon={<SvgIcon viewBox = '0 0 24 24' component={GoogleIcon}></SvgIcon>}>Log in with Google</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" fullWidth="true" startIcon={<SvgIcon viewBox= '0 0 24 24' component={FacebookIcon}></SvgIcon>}>Log in with Facebook</Button>
                            </Grid>
                            <Grid item>
                                <Button fullWidth = "true">Register with email</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>
    )
}

const DialogStatistics = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
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
        <AppBar position="static">
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
