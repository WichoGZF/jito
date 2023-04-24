import { Container, Dialog, DialogContent, Paper, Typography, Stack, Button, Grid, List, ListItem, ListItemButton, ListItemText, DialogTitle } from "@mui/material";
import PlanPick from "./PlanPick";
import CompareTable from "./CompareTable";

interface PropTypes{
    open: boolean, 
    handleClose: () => void,
}

function Subscribe({open, handleClose}: PropTypes) {

    const listItemProps = {
        textAlign: 'center'
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth='md'>
            <DialogTitle>
            <Typography variant="h3" textAlign='center'>
                Become a supporter
            </Typography>
            </DialogTitle>
            <DialogContent>
                
                <Stack gap={3} alignItems='center'>
                    <PlanPick></PlanPick>
                    <CompareTable></CompareTable>
                    
                </Stack>
            </DialogContent>
        </Dialog >);
}

export default Subscribe;