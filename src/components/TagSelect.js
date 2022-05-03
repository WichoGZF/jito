import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';


export default function TagSelect(props) {
    const [secondaryTag, setSecondaryTag] = React.useState(false)

    const handleSecondaryTag = () => {
        setSecondaryTag(!secondaryTag)
    }
            return (
                <div>
                    <Dialog open={props.openTagSelect} onClose={props.closeTagSelect}>
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
                            <Button onClick={props.closeTagSelect}>Cancel</Button>
                            <Button onClick={() => { }}>Done</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )

}
