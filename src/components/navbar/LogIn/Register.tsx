import { Grid, DialogContent, TextField, Button, Stack, SvgIcon, Divider } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";

function Register() {
    return (
        <DialogContent>
            <Stack gap={2}>
                <Grid container direction="column" gap={2}>
                    <Grid item>
                        <Button variant="outlined" size="medium" fullWidth={true} startIcon={<SvgIcon component={Google}></SvgIcon>}>Sign in with Google</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size={'medium'} fullWidth={true} startIcon={<SvgIcon component={Facebook}></SvgIcon>}>Continue with Facebook</Button>
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container spacing={2} direction="column" alignItems="expand">
                    <Grid item>
                        <TextField placeholder="Username or email" size={'small'} fullWidth></TextField>
                    </Grid>
                    <Grid item>
                        <TextField placeholder="Password" size={'small'} fullWidth={true}></TextField>
                    </Grid>
                    <Grid item xs mt={2}>
                        <Button variant="contained" size={'large'} fullWidth={true} >Register</Button>
                    </Grid>
                </Grid>
            </Stack>
        </DialogContent >
    );
}

export default Register;