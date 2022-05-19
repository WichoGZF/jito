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
import { DialogContent, DialogTitle, DialogActions, Dialog } from "@mui/material";

const DialogSettings = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                Settings
            </DialogTitle>
            <DialogContent dividers>
                <Box>
                    <Typography>Timer configuration</Typography>
                    <Grid container spacing = {2}>
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
                            <TextField label="Long break every" defaultValue = "4" helperText="pomodoros"></TextField>
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
                <Button onClick={props.handleClose}>Cancel</Button>
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
                Log In
            </DialogTitle>
            <DialogContent>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={props.handleClose}> Log in </Button>
            </DialogActions>

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
                Statistics
            </DialogTitle>
            <DialogContent dividers>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>

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
