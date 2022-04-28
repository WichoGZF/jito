import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
export default function TagSelectPopUp(props) {
    switch (props.openPopUp) {
        case 0: return (<div></div>);//nothing
        case 1:
            return (
                <div>
                    <Dialog open={true} onClose={props.closePopUp}>
                        <DialogTitle>Select the Primary tag</DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText>
                            </DialogContentText>
                            <Stack direction="row" spacing={1}>
                                <Chip icon={<DoneIcon></DoneIcon>} clickable label="Tag Filled" />
                                <Chip icon={<DoneIcon></DoneIcon>} clickable label="Tag Outlined" variant="outlined" />
                            </Stack>
                        </DialogContent>
                        <DialogTitle>Select the Secondary tag</DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText>
                            </DialogContentText>
                            <Stack direction="row" spacing={1}>
                                <Chip icon={<DoneIcon></DoneIcon>} clickable label="Tag Filled" />
                                <Chip icon={<DoneIcon></DoneIcon>} clickable label="Tag Outlined" variant="outlined" />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.closePopUp}>Cancel</Button>
                            <Button onClick={() => { }}>Done</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );//tag select
        case 2:
            return (
                <div>
                    <Dialog open={true} onClose={props.closePopUp}>
                        <DialogTitle>Edit task</DialogTitle>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here.
                                We will send updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.closePopUp}>Cancel</Button>
                            <Button onClick={() => { }}>Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ); //task
        case 3:
            return (
                <div>
                    <Dialog open={true} onClose={props.closePopUp}>
                        <DialogTitle>Select the date</DialogTitle>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here.
                                We will send updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.closePopUp}>Cancel</Button>
                            <Button onClick={() => { }}>Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );  //calendar
    }
}
