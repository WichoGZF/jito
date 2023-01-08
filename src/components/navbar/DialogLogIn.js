import { Dialog, DialogTitle, Grid, Typography, IconButton, DialogContent, TextField, Button, Divider, SvgIcon } from "@mui/material";
import React from "react";
import { ReactComponent as GoogleIcon } from '../../assets/Google__G__Logo.svg'
import { ReactComponent as FacebookIcon } from '../../assets/Facebook_Logo.svg'
import CloseIcon from '@mui/icons-material/Close';


export default function DialogLogIn(props){
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
