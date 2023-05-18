import { Grid, DialogContent, TextField, Button, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react"
import googleLogo from "assets/Google__G__Logo.svg"
import facebookLogo from "assets/facebook_logo.webp"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import { validateUser } from "features/authActions";

interface Props {
    handleSetRegister: () => void,
}

function Login({ handleSetRegister }: Props) {
    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<null | string>(null);
    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<null | string>(null)

    const loginLoading = useAppSelector(state => state.auth.loginLoading)
    const loginError = useAppSelector(state => state.auth.loginError)
    const loginSuccess = useAppSelector(state => state.auth.loginSuccess)
    const loginErrorMsg = useAppSelector(state => state.auth.loginErrorMessage)

    let loginErrorTxt = ""
    if (loginError) {
        loginErrorTxt = "Incorrect username or password"
    }

    const dispatch = useAppDispatch()

    const usernameHasError = () => {
        if (username.length < 5) {
            setUsernameError("Username must be between 5 to 15 characters.")
            return true
        }
        else if (usernameError !== null) {
            setUsernameError(null)
            return false
        }
    }

    const passwordHasError = () => {
        if (password.length < 8) {
            setPasswordError("Password must be between 8 to 15 characters.")
            return true
        }
        else if (passwordError !== null) {
            setPasswordError(null)
            return false
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const userErr = usernameHasError()
        const passErr = passwordHasError()
        if (userErr || passErr) {
            return
        }
        else {
            dispatch(validateUser({ username: username, password: password }))
        }
    }

    return (
        <DialogContent>
            <Grid container spacing={5} direction="row" >
                <Grid item xs>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} direction="column" alignItems="expand">
                            <Grid item>
                                <TextField
                                    error={usernameError !== null || loginError}
                                    helperText={loginError ? loginErrorTxt : usernameError}
                                    inputProps={{ maxLength: 15 }}
                                    placeholder="Username"
                                    required
                                    name="user"
                                    value={username}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setUsername(event.target.value)
                                        if (event.target.value.length < 5) {
                                            setUsernameError("Username must be between 5 to 15 characters.")
                                        }
                                        else {
                                            setUsernameError(null)
                                        }
                                    }}
                                >

                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={passwordError !== null || loginError}
                                    type="password"
                                    helperText={loginError ? '' : passwordError}
                                    inputProps={{ maxLength: 15 }}
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(event.target.value)
                                        if (event.target.value.length < 8) {
                                            setPasswordError("Password must be between 8 to 15 characters.")
                                        }
                                        else {
                                            setPasswordError(null)
                                        }
                                    }}
                                ></TextField>
                            </Grid>
                            <Grid item xs>
                                <LoadingButton loading={loginLoading} variant="contained" fullWidth={true} type='submit'>Log in</LoadingButton>
\                            </Grid>
                            <Grid item xs>  
                                <Button>Forgot your password?</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ pl: "40px" }}></Divider>
                <Grid item xs>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Button variant="outlined" fullWidth={true} startIcon={<img style={{ width: '20px', height: '20px' }} src={googleLogo} />}>Sign in with Google</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" fullWidth={true} startIcon={<img style={{ width: '20px', height: '20px' }} src={facebookLogo} />}>Continue with Facebook</Button>
                        </Grid>
                        <Grid item>
                            <Button fullWidth={true} onClick={handleSetRegister}>Don't have an account? Register</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
    );
}

export default Login;