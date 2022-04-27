import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

export default function CurrentTaskBox() {
    return (
        <Card sx={{ width: "80vw", minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Current task
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: "50px 1fr", rowGap: "5px", alignItems: "center" }}>
                    <IconButton aria-label="complete" size="large" sx={{ height: "50px" }}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 9 }}>
                        Finish this app because youre rtard longer longer longre
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ gridColumn: '2', gridRow: "2", alignItems: "center" }}>
                        <Chip label="primary" color="primary" clickable disabled onDelete />
                        <Chip label="secondary" color="success" clickable onDelete />
                    </Stack>
                    <IconButton aria-label="complete" size="large" sx={{ height: "50px", width: "50px", gridColumn: '2', gridRow: '2', justifySelf: "end"}}>
                            <LocalOfferIcon></LocalOfferIcon>
                        </IconButton>
                </Box>
            </CardContent>
        </Card >
    );
}
