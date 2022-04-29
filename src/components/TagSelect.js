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
import Input from '@mui/material/Input';
import Box  from "@mui/material/Box";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CurrentTaskBox from "./CurrentTaskBox";

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
