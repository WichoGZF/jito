import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux'

import DialogSettings from './DialogSettings'
import DialogLogIn from './DialogLogIn'
import DialogStatistics from "./DialogStatistics";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useTheme } from '@mui/material/styles';

const ResponsiveAppBar = (props) => {
    const [dialogOpen, setDialogOpen] = useState(0)

    const theme = useTheme()

    const colorTheme = useSelector((state) => state.settings.colorTheme)

    let loggedInLabel
    if (props.loggedIn) {
        loggedInLabel = "Logout"
    }
    else {
        loggedInLabel = "Log In"
    }

    const handleOpenDialog = (index) => {
        setDialogOpen(index);
    }

    const handleCloseDialog = () => {
        setDialogOpen(null)
    }

    return (
        <AppBar position="sticky" color='secondary'>
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
                        <ButtonGroup variant={'text'} aria-label="outlined primary button group">
                            <Button onClick={() => handleOpenDialog(2)}>Statistics</Button>
                            <Button onClick={() => handleOpenDialog(1)}>Settings</Button>
                            <Button onClick={() => handleOpenDialog(3)}>Log In</Button>
                        </ButtonGroup>
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
