import { Dialog, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import Login from "./LogIn/LogIn";
import Register from "./LogIn/Register";
import { useAppSelector } from "hooks/useAppSelector";

interface PropTypes {
    handleClose: any,
    open: boolean,
}

export default function DialogRegister(props: PropTypes) {
    const registerSuccess = useAppSelector(store => store.auth.registerSuccess)

    const handleClose = () => {
        props.handleClose()
    }

    useEffect(() => {
        if (registerSuccess) {
            handleClose()
        }

    }, [registerSuccess])

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
                        Sign up
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Register></Register>
        </Dialog>
    )
}
