import { Grid, DialogContent, TextField, Button, Divider, SvgIcon, FormControl, Typography } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup/FormGroup";
interface Props {
    handleSetRegister: () => void,
}

function Login({ handleSetRegister }: Props) {
    return (
        <DialogContent>
            <Grid container spacing={5} direction="row" >
                <Grid item xs>
                    <form>
                            <Grid container spacing={2} direction="column" alignItems="expand">
                                <Grid item>
                                    <TextField inputProps={{ maxLength: 15 }} placeholder="Username" required name="user"></TextField>
                                </Grid>
                                <Grid item>
                                    <TextField inputProps={{ maxLength: 15 }} placeholder="Password" required name="password"></TextField>
                                </Grid>
                                <Grid item xs>
                                    <Button variant="contained" fullWidth={true} type='submit'>Log in</Button>
                                </Grid>
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
                            <Button variant="outlined" fullWidth={true} startIcon={<SvgIcon component={Google}></SvgIcon>}>Sign in with Google</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" fullWidth={true} startIcon={<SvgIcon component={Facebook}></SvgIcon>}>Continue with Facebook</Button>
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