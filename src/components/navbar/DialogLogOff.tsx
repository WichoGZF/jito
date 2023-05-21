import { Button, Dialog, DialogTitle, Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions'
import { useAppDispatch } from "hooks/useAppDispatch";
import { logoutSession } from "features/authSlice";
import { useDisconnectUserMutation } from "features/api/apiSlice";
import { useAppSelector } from "hooks/useAppSelector";

interface PropTypes {
    handleClose: () => void
    open: boolean
}

export function DialogLogOff({ handleClose, open }: PropTypes) {
    const dispatch = useAppDispatch()
    const [disconnectUser] = useDisconnectUserMutation()
    const hasSession = useAppSelector(state => state.auth.hasSession)

    function handleCloseSession(){ 
        dispatch(logoutSession())
        handleClose()
        if(hasSession){
            disconnectUser()
        }
        window.location.reload();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
                        Sign out?
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Do you want to close the current session? All unfinished pomodoros won't be saved. 
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleCloseSession} variant="outlined">Yes</Button>
                    <Button onClick={handleClose} variant="contained">No</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default DialogLogOff;