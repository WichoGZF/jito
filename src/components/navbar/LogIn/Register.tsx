import { Grid, DialogContent, TextField, Button, Divider, Typography, Alert } from "@mui/material";
import facebookLogo from "assets/facebook_logo.webp"
import googleLogo from "assets/Google__G__Logo.svg"

import { useState } from 'react'
import { registerUser } from "features/authActions";
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import { LoadingButton } from "@mui/lab";

function Register() {
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<null | string>(null);
    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<null | string>(null)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [confirmPasswordError, setConfirmPasswordError] = useState<null | string>(null)
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<null | string>(null)

    const dispatch = useAppDispatch()

    const registerLoading = useAppSelector(state => state.auth.registerLoading)
    const registerError = useAppSelector(state => state.auth.registerError)
    const registerErrorMessage = useAppSelector(state => state.auth.registerErrorMessage)

    function isEmail(email: string) {
        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
    }

    const checkUsername = () => {
        if (username.length < 5) {
            setUsernameError("Please enter an username from 5 to 15 characters.")
        }
        else if (usernameError !== null) {
            setUsernameError(null)
        }
    }

    const handleChangeUsername = (e: any) => {
        const newVal = e.target.value
        setUsername(newVal)
        if (e.target.value.length < 5) {
            setUsernameError("Please enter an username from 5 to 15 characters.")
        }
        else {
            setUsernameError(null)
        }
    }

    const checkPassword = () => {
        if (password.length < 8) {
            setPasswordError("Please enter a password from 8 to 15 characters.")
        }
        else if (passwordError !== null) {
            setPasswordError(null)
        }
    }

    const handleChangePassword = (e: any) => {
        const newVal = e.target.value
        setPassword(newVal)
        const newValLength = e.target.value.length
        if (newValLength < 8) {
            setPasswordError("Please enter a password from 8 to 15 characters.")
        }
        else {
            setPasswordError(null)
        }
    }

    const checkConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords are not equal.")
        }
        else {
            setConfirmPasswordError(null)
        }
    }

    const handleChangeConfirmPassword = (e: any) => {
        const newVal = e.target.value
        setConfirmPassword(newVal)
        if (newVal !== password) {
            setConfirmPasswordError("Passwords are not equal.")
        }
        else {
            setConfirmPasswordError(null)
        }
    }

    const checkEmail = () => {
        if (!!email.length) {
            let newMessage: string = ""
            if (!isEmail(email)) {
                newMessage += "Please enter a valid email."
            }
            if (email.length > 50) {
                newMessage = "\nPlease enter an email smaller than 50 characters."
            }
            if (!!newMessage.length) {
                setEmailError(newMessage)
            }
            else {
                setEmailError(null)
            }
        }
        else if (passwordError !== null) {
            setPasswordError(null)
        }
    }

    const handleChangeEmail = (e: any) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        if (!!newEmail.length) {
            let newMessage: string = ""
            if (!isEmail(newEmail)) {
                newMessage += "Please enter a valid email."
            }
            if (email.length > 50) {
                newMessage = "\nPlease enter an email smaller than 50 characters."
            }
            if (!!newMessage.length) {
                setEmailError(newMessage)
            }
            else {
                setEmailError(null)
            }
        }
        else if (passwordError !== null) {
            setPasswordError(null)
        }

    }


    function handleSubmit(e: any) {
        e.preventDefault()
        checkUsername()
        checkPassword()
        checkConfirmPassword()
        checkEmail()
        if (usernameError || emailError || passwordError || confirmPasswordError) {
            return
        }
        else {
            //Submit dispatcher
            dispatch(registerUser({ username: username, password: password, email: email }))
        }
    }

    return (
        <DialogContent>
            <Grid container direction='row' spacing={5}>
                <Grid item xs>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} direction="column" alignItems="expand">
                            {registerError ? <Alert severity="error">{registerErrorMessage}</Alert> : <></>}
                            <Grid item>
                                <TextField
                                    error={usernameError !== null}
                                    inputProps={{ maxLength: 15 }}
                                    name="username"
                                    placeholder="Username"
                                    size={'small'}
                                    fullWidth
                                    value={username}
                                    onChange={handleChangeUsername}
                                    helperText={usernameError}
                                >
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={(passwordError !== null) || (confirmPasswordError !== null)}
                                    inputProps={{ maxLength: 15 }}
                                    name="password"
                                    placeholder="Password"
                                    size={'small'}
                                    fullWidth={true}
                                    type="password"
                                    value={password}
                                    onChange={handleChangePassword}
                                    helperText={passwordError}
                                >
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={confirmPasswordError !== null}
                                    inputProps={{ maxLength: 15 }}
                                    name="confirm-password"
                                    placeholder="Confirm password"
                                    size={'small'}
                                    fullWidth={true}
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleChangeConfirmPassword}
                                    helperText={confirmPasswordError}
                                >
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={emailError !== null}
                                    inputProps={{ maxLength: 50 }}
                                    name="email"
                                    placeholder="Email"
                                    size={'small'}
                                    fullWidth
                                    value={email}
                                    onChange={handleChangeEmail}
                                    helperText={emailError}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs mt={2}>
                                <LoadingButton loading={registerLoading} type="submit" variant="contained" size={'large'} fullWidth={true} >
                                    Register
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Divider orientation="vertical"></Divider>

                <Grid container item xs direction="column" alignItems={'center'} gap={2}>
                    <Grid item>
                        <Typography variant="body2">
                            OR
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size="medium" fullWidth={true} startIcon={<img style={{ width: "20px", height: "20px" }} src={googleLogo}></img>}>Sign in with Google</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size={'medium'} fullWidth={true} startIcon={<img style={{ width: "20px", height: "20px" }} src={facebookLogo}></img>}>Continue with Facebook</Button>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent >
    );
}

export default Register;