import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack'
import * as React from "react";

interface PropTypes{ 
    repeatOn: boolean[], 
    handleChangeRepeatOn: (arg0:number) => void;
}

export default function WeekPicker({ repeatOn, handleChangeRepeatOn }: PropTypes) {

    console.log('Repeat on ', repeatOn, handleChangeRepeatOn)
    return (
        <Stack direction="row" spacing={1}>
            <IconButton color={repeatOn[0] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(0)}
                data-cy="repeat-on-sunday"
            >
                S
            </IconButton>
            <IconButton color={repeatOn[1] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(1)}
                data-cy="repeat-on-monday"
            >
                M
            </IconButton>
            <IconButton color={repeatOn[2] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(2)}
                data-cy="repeat-on-tuesday"
            >
                T
            </IconButton>
            <IconButton color={repeatOn[3] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(3)}
                data-cy="repeat-on-wednesday"
            >
                W
            </IconButton>
            <IconButton color={repeatOn[4] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(4)}
                data-cy="repeat-on-thursday"
            >
                T
            </IconButton>
            <IconButton color={repeatOn[5] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(5)}
                data-cy="repeat-on-friday"
            >
                F
            </IconButton>
            <IconButton color={repeatOn[6] ? 'primary' : 'default'}
                onClick={() => handleChangeRepeatOn(6)}
                data-cy="repeat-on-saturday"
            >
                S
            </IconButton>
        </Stack>
    )
}