import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import * as React from "react";
import { useState } from "react"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import RepeatIcon from '@mui/icons-material/Repeat';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { DialogContent, DialogTitle, DialogActions, Dialog } from "@mui/material";
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

import { TagDialog } from "./TaskList.js";

import { useDispatch } from "react-redux";
import { addTask, editTask } from '../features/tasksSlice.js'

export default function TaskInput(props) {
    const dispatch = useDispatch()
    const [taskName, setTaskName] = useState(props.edit ? props.name : "")
    const [taskDesc, setTaskDesc] = useState(props.edit ? props.description : "")
    const [taskType, setTaskType] = useState(props.edit ? props.type : 'normal') //normal or block
    const [blocks, setBlocks] = useState(props.edit ? props.blocks : '') //nuumber of blocks
    const [repeat, setRepeat] = useState(props.edit ? props.repeat : false) //true or false
    const [repeatOn, setRepeatOn] = useState(props.edit ? props.repeatOn : [0, 0, 0, 0, 0, 0, 0])
    const [tag, setTag] = useState(props.edit ? props.tagName : 'None')
    const [color, setColor] = useState(props.edit? props.tagColor : 'gray')
    //for comps.
    const [toggleRepeat, setToggleRepeat] = useState(false)
    const [openTagSelect, setOpenTagSelect] = useState(false)

    const handleOpenTagSelect = () => {
        console.log("Opened tag select")
        setOpenTagSelect(!openTagSelect)
    }
    const handleRepeatSelect = () => {
        setToggleRepeat(!toggleRepeat);
    }

    const handleChangeRepeat = (event) => {
        setRepeat(event.target.value)
        console.log("Repeat:", repeat)
    }

    const handleChangeTaskType = (event) => {
        setTaskType(event.target.value);
    };

    const handleChangeRepeatOn = (digit) => {
        setRepeatOn(oldState => {
            let newState = []
            newState = [...oldState]
            newState[digit] = !newState[digit]
            return newState
        })
    }

    const handleChangeTag = (tag) => {
        setTag(tag)
    }

    const handleChangeColor = (color) => {
        setColor(color)
    }

    const handleBlocks = (event) => {
        const input = event.target.value
        const filteredInput = input.replace(/\D/g, '')
        setBlocks(filteredInput)
    }
    /*
    const handleSaveTask = () => {
        if(props.edit){
            
        }
        else{
            dispatch(addTask({
                "name": taskName,
                "tag": tag,
                "description": taskDesc,
                "date": "06/22/2022",
                "type": taskType,
                "blocks": 0,
                "repeat": repeat,
                "repeatOn": repeatOn,
              }))
        }
    }
    */

    console.log(openTagSelect)

    const isWeekly = repeat === 'weekly'

    return (
        <Box sx={{ width: '95%' }}>
            <Grid container direction='column' gap={0.5} sx={{ padding: "15px", border: '1px', borderStyle: 'solid', borderColor: "#e2e2e2", borderRadius: '25px' }}>

                <Input id="task-name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    sx={{ flexGrow: 9, gridRow: '1', gridColumn: '2' }}
                    multiline
                    autoFocus={true}
                    placeholder="Title"
                />
                <Input id="task-description"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    sx={{ fontSize: 14, gridColumn: '2', gridRow: '2', color: "GrayText" }}
                    placeholder="Details"
                    multiline
                />
                <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '10px' }}>
                    <FormControl>
                        <FormLabel>Task type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={taskType}
                            onChange={handleChangeTaskType}
                            row
                        >
                            <FormControlLabel value="normal" control={<Radio></Radio>} label="Normal" sx={{ color: 'text.primary' }} />
                            <FormControlLabel value="block" control={<Radio />} label="Block" sx={{ color: 'text.primary' }} />
                        </RadioGroup>
                    </FormControl>
                    <Stack>
                        <FormLabel>Number of blocks</FormLabel>
                        <Input disabled={taskType === 'normal'} value={blocks} onChange={handleBlocks}></Input>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <FormLabel>Tag</FormLabel>
                    <Chip clickable onClick={handleOpenTagSelect} label={tag} sx={{ backgroundColor: color }}></Chip>
                </Stack>
                <Stack direction="row" justifyContent={"space-between"}>
                    <FormLabel>Repeat</FormLabel>
                    <IconButton onClick={handleRepeatSelect}><RepeatIcon color={ repeat!=='false' ? 'primary' : 'disabled'}></RepeatIcon></IconButton>
                </Stack>

            </Grid>
            <Grid container direction="row" justifyContent='flex-end' alignItems={'center'} sx={{ marginTop: 2 }}>
                <Button onClick={props.handleTaskSelectClose}>Cancel</Button>
                <Button onClick={props.handleTaskSelectClose}>OK</Button>
            </Grid>

            <Dialog
                open={toggleRepeat}
                onClose={handleRepeatSelect}>
                <DialogContent>
                    <FormControl>
                        <FormLabel id="select-repeat">Repeat</FormLabel>
                        <RadioGroup
                            name="select-repeat-buttons-group"
                            value={repeat}
                            onChange={handleChangeRepeat}
                            row
                        >
                            <FormControlLabel value={false} control={<Radio />} label="No repeat" />
                            <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                            <FormControlLabel value="weekly" control={<Radio></Radio>} label="Weekly" />
                        </RadioGroup>
                    </FormControl>
                    <FormLabel component="legend">Select days</FormLabel>
                    <FormGroup>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[0]}
                                onChange={() => handleChangeRepeatOn(0)} />}
                            label="Sunday"
                        ></FormControlLabel>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[1]}
                                onChange={() => handleChangeRepeatOn(1)} />}
                            label="Monday"
                        ></FormControlLabel>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[2]}
                                onChange={() => handleChangeRepeatOn(2)} />}
                            label="Tuesday"
                        ></FormControlLabel>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[3]}
                                onChange={() => handleChangeRepeatOn(3)} />}
                            label="Wednesday"
                        ></FormControlLabel>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[4]}
                                onChange={() => handleChangeRepeatOn(4)} />}
                            label="Thursday"
                        ></FormControlLabel>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[5]}
                                onChange={() => handleChangeRepeatOn(5)} />}
                            label="Friday"
                        ></FormControlLabel>
                        <FormControlLabel disabled={!isWeekly}
                            control={<Checkbox checked={repeatOn[6]}
                                onChange={() => handleChangeRepeatOn(6)} />}
                            label="Saturday"
                        ></FormControlLabel>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRepeatSelect}>Cancel</Button>
                    <Button onClick={handleRepeatSelect}>OK</Button>
                </DialogActions>
            </Dialog>
            <TagDialog openTagSelect={openTagSelect}
                handleOpenTagSelect={handleOpenTagSelect}
                tagSelected={tag}
                handleChangeTag={handleChangeTag}
                handleChangeColor={handleChangeColor}
                ></TagDialog>

        </Box>
    )
}
