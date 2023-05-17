import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import { useAppSelector } from "hooks/useAppSelector";
import DialogSettings from './DialogSettings'
import DialogLogIn from './DialogLogIn'
import DialogStatistics from "./DialogStatistics";
import DialogRegister from "./DialogRegister";
import ButtonGroup from "@mui/material/ButtonGroup";
import DialogLogOff from "./DialogLogOff";

const ResponsiveAppBar = () => {
    const [dialogOpen, setDialogOpen] = useState<number>(0)

    const hasSession = useAppSelector((state) => state.auth.hasSession)

    const handleOpenDialog = (index: number) => {
        setDialogOpen(index);
    }

    const handleCloseDialog = () => {
        setDialogOpen(0)
    }

    let buttonGroup
    if (hasSession) {
        buttonGroup = <ButtonGroup variant={'text'} aria-label="outlined primary button group">
            <Button onClick={() => handleOpenDialog(2)}>Statistics</Button>
            <Button onClick={() => handleOpenDialog(1)}>Settings</Button>
            <Button onClick={() => handleOpenDialog(5)}>Sign out</Button>
        </ButtonGroup>
    }
    else {

        buttonGroup = <Stack direction="row" gap={2}>
            <Button variant="outlined" onClick={() => handleOpenDialog(3)}>Sign In</Button>
            <Button variant="contained" onClick={() => handleOpenDialog(4)}>Sign Up</Button>
        </Stack>
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
                        {buttonGroup}
                    </Box>
                </Toolbar>
            </Container>
            <DialogSettings open={dialogOpen === 1} handleClose={handleCloseDialog}></DialogSettings>
            <DialogStatistics open={dialogOpen === 2} handleClose={handleCloseDialog}></DialogStatistics>
            <DialogLogIn open={dialogOpen === 3} handleClose={handleCloseDialog}></DialogLogIn>
            <DialogRegister open={dialogOpen === 4} handleClose={handleCloseDialog}></DialogRegister>
            <DialogLogOff open={dialogOpen === 5} handleClose={handleCloseDialog}></DialogLogOff>
        </AppBar>
    );
};
export default ResponsiveAppBar;
