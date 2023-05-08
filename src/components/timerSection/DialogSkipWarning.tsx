import { Dialog, DialogTitle, DialogContent, DialogContentText, FormControlLabel, Checkbox, DialogActions, Button } from "@mui/material";

/*Dialog showing warning whenever user clicks "skip" on an ongoing pomodoro*/
function DialogSkipWarning({ open, onClose, skipCallback, showWarning, handleShowWarning }
    :{ open: boolean, onClose: () => void, skipCallback: () => void, showWarning: boolean, handleShowWarning: () => void }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {"Warning"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Skipping the current pomodoro won't count towards the pomodoro count.
                    The time spent will not be saved for statistics either. Do you want to
                    continue?
                </DialogContentText>
                <FormControlLabel control={<Checkbox checked={!showWarning} onChange={handleShowWarning}></Checkbox>} label="Don't show again"></FormControlLabel>
                <DialogActions>
                    <Button onClick={onClose}>Disagree</Button>
                    <Button onClick={skipCallback}>Agree</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default DialogSkipWarning;