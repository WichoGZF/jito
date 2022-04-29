import { Dialog, DialogActions } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { DialogContent } from "@mui/material"
import { Button } from "@mui/material"
import CurrentTaskBox from "./CurrentTaskBox"
import EditIcon from "@mui/icons-material/Edit"

export default function TaskAdd(props) {
    return (
        <Dialog open={props.openTaskSelect} onClose={props.closeTaskSelect}>
                        <DialogTitle>Edit task <EditIcon /></DialogTitle>
                        <DialogContent>
                            <CurrentTaskBox openTagSelect={props.openTagSelect}></CurrentTaskBox>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.closeTaskSelect}>Cancel</Button>
                            <Button onClick={() => { }}>Subscribe</Button>
                        </DialogActions>
                    </Dialog>
    )
}
