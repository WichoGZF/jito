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

export default function DialogLogIn(props: PropTypes) {
    const [register, setRegister] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);

    const loginSucess = useAppSelector(store => store.auth.loginSuccess)

    const handleSetRegister = () => { 
        setRegister((state) => !state)   
    }

    const handleClose = () => {
        props.handleClose()
    }

    //Due to double state change elements would swap making it ugly. 
    useEffect(()=> { 
        const timer = setTimeout(() => {
            if(register){ 
                setRegister(false);
            }
        },100);
        return () => clearTimeout(timer)
    
    }, [props.open])

    useEffect(() => { 
        if(loginSucess){
            handleClose()
        }

    }, [loginSucess])

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
                            {register? 'Register' : 'Log-In'}
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            {register ? <Register/> : <Login handleSetRegister={handleSetRegister}/>}

        </Dialog>
    )
}
