import { Typography } from "@mui/material";
import React from 'react'

const footerContent = `Pomodoro Planner is not related to the Pomodoro Technique™/Pomodoro™’s trademark holder Cirillo Company and respects its trademarks.
Pomodoro Technique® and Pomodoro® are registered trademarks of Francesco Cirillo.
All logos and marks contained herein are the property of their respective owners.
Pomodoro Planner made by Luis Gustavo - wichogzf@gmail.com`

export default function Footer(props) { 

    return (
            <Typography fontSize={12} pb={4} color='text.secondary' textAlign={'center'} sx={{ whiteSpace: 'pre-line' }}>
                {footerContent}
            </Typography>
    )
}