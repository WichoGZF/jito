import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack'
import * as React from "react";

export default function WeekPicker({ repeatOn, handleChangeRepeatOn }) {

    console.log('Repeat on ', repeatOn, handleChangeRepeatOn)
    return (
        <Stack direction="row" spacing={1}>
            <IconButton color={repeatOn[0] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(0)}
            >
                S
            </IconButton>
            <IconButton color={repeatOn[1] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(1)}
            >
                M
            </IconButton>
            <IconButton color={repeatOn[2] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(2)}
            >
                T
            </IconButton>
            <IconButton color={repeatOn[3] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(3)}
            >
                W
            </IconButton>
            <IconButton color={repeatOn[4] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(4)}
            >
                T
            </IconButton>
            <IconButton color={repeatOn[5] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(5)}
            >
                F
            </IconButton>
            <IconButton color={repeatOn[6] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(6)}
            >
                S
            </IconButton>
        </Stack>
    )
}