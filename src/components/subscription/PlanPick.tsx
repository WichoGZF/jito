import { Container, Typography, Grid, Paper, Stack, Button, useTheme, Divider } from "@mui/material";

function PlanPick() {
    const theme = useTheme();

    return (<>
        <Container>
            <Typography variant='body1' textAlign='center'>
                Support the development of Pomodoro Planner & get special features!
            </Typography>
        </Container>
        <Grid container direction={'row'} spacing={3}>
            <Grid item xs={6}>
                <Paper variant="outlined" sx={{ padding: '1rem' }}>
                    <Stack alignItems={'center'} spacing={2}>
                        <Typography variant='h5'>Free</Typography>
                        <Typography variant='h4'> <b>$0</b>/mo</Typography>

                        <Typography variant='body1' textAlign={'center'} sx={{ wordWrap: 'break-word' }}>
                            No statistics
                            <br></br>
                            Local storage
                            <br></br>
                            <br></br>
                        </Typography>
                        <Button variant='outlined' size='large'>Stay on free plan</Button>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper variant="outlined" sx={{ padding: '1rem', borderColor: theme.palette.primary.main }}>
                    <Stack alignItems={'center'} spacing={2}>
                        <Typography variant='h5'>Supporter</Typography>
                        <Typography variant='h4'> <b>$4.99</b>/mo</Typography>
                        <Typography variant='body1' textAlign={'center'} sx={{ wordWrap: 'break-word' }}>
                            Statistics access
                            <br></br>
                            Cloud storage
                            <br></br>
                            Support the development!
                        </Typography>
                        <Button variant='contained' size='large'>Become a supporter</Button>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    </>);
}

export default PlanPick;