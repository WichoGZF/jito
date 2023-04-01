import { Button, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import RepeatIcon from '@mui/icons-material/Repeat';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import TagDialog from "./tags/TagDialog";

import { useAppDispatch, useAppSelector } from "hooks";
import { addTask, editTask } from 'features/tasksSlice'

import WeekPicker from './WeekPicker'

interface PropTypes {
    edit: boolean,
    name: string,
    tag: string,
    description: string,
    type: 'normal' | 'block',
    blocks: number | null,
    repeat: 'daily' | 'weekly' | 'false',
    repeatOn: number[],
    index: number,
    tagColor: string,
    handleTaskSelectClose: () => void
}

export default function TaskInput(props: PropTypes) {
    const tags = useAppSelector(state => state.tasks.tags)
    const dateSelected = useAppSelector(state => state.app.calendarDate)
    const dispatch = useAppDispatch()

    const [taskName, setTaskName] = useState(props.edit ? props.name : "")
    const [taskDesc, setTaskDesc] = useState(props.edit ? props.description : "")
    const [taskType, setTaskType] = useState(props.edit ? props.type : 'normal') //normal or block
    const [blocks, setBlocks] = useState(props.edit ? props.blocks : '') //nuumber of blocks
    const [repeat, setRepeat] = useState(props.edit ? props.repeat : 'false') //true or false
    const [repeatOn, setRepeatOn] = useState(props.edit ? props.repeatOn : [false, false, false, false, false, false, false])
    const [tag, setTag] = useState(props.edit ? props.tag : tags[0].name)
    const [color, setColor] = useState(props.edit ? props.tagColor : tags[0].color)
    //for comps.
    const [toggleRepeat, setToggleRepeat] = useState(false)
    const [openTagSelect, setOpenTagSelect] = useState(false)

    const handleOpenTagSelect = () => {
        setOpenTagSelect(!openTagSelect)
    }
    const handleRepeatSelect = () => {
        setToggleRepeat(!toggleRepeat);
    }

    const handleChangeRepeat = (event) => {
        setRepeat(event.target.value)
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

    const handleSaveTask = () => {
        const numericalBlocks = parseInt(blocks)
        let blocksToSend;
        if (taskType === 'block') {
            !!numericalBlocks ? blocksToSend = numericalBlocks : blocksToSend = 1
        }
        else {
            blocksToSend = 0
        }
        const taskToSend = {
            "name": taskName,
            "tag": tag,
            "description": taskDesc,
            "date": dateSelected,
            "type": taskType,
            'defaultBlocks': blocksToSend,
            "blocks": blocksToSend,
            "repeat": repeat,
            "repeatOn": repeatOn,
        }

        if (props.edit) {
            dispatch(editTask(taskToSend, props.index))
        }
        else {
            dispatch(addTask(taskToSend))
        }
        props.handleTaskSelectClose()
    }

    const isWeekly = repeat === 'weekly'

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container direction='column' gap={1.5} sx={{ padding: "15px", border: '1px', borderStyle: 'solid', borderColor: "#e2e2e2", borderRadius: '25px' }}>

                <TextField id="task-name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    sx={{ flexGrow: 1, gridRow: '1', gridColumn: '2' }}
                    autoFocus={true}
                    label={<Typography variant='button'>Name</Typography>}
                    required
                    size='small'
                />
                <TextField id="task-description"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    label={<Typography variant='button'>Details</Typography>}
                    multiline
                    size='small'
                />
                <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '10px' }}>
                    <FormControl>
                        <FormLabel >
                            <Typography variant='button'>
                                Task type
                            </Typography>
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={taskType}
                            onChange={handleChangeTaskType}
                            row
                        >
                            <FormControlLabel value="normal" control={<Radio></Radio>} label="Normal" sx={{ color: 'text.secondary' }} />
                            <FormControlLabel value="block" control={<Radio />} label="Block" sx={{ color: 'text.secondary' }} />
                        </RadioGroup>
                    </FormControl>
                    <Stack>
                        <FormLabel>
                            <Typography variant='button'>
                                {taskType === 'normal' ? 'Number of expected pomodoros' : 'Number of blocks'}
                            </Typography>
                        </FormLabel>
                        <Input value={blocks} onChange={handleBlocks}></Input>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <FormLabel>
                        <Typography variant='button'>Tag</Typography>
                    </FormLabel>
                    <Chip clickable onClick={handleOpenTagSelect} label={tag} sx={{ backgroundColor: color }}></Chip>
                </Stack>
                <Stack direction="row" justifyContent={"space-between"}>
                    <Grid
                        container
                        alignItems="center"
                        gap={1}

                    >
                        <FormLabel>
                            <Typography variant='button'>Repeat</Typography>
                        </FormLabel>
                        <RepeatIcon color={repeat ? 'primary' : 'disabled'}></RepeatIcon>
                    </Grid>
                    <Select labelId="select"
                        value={repeat}
                        label="Repeat"
                        onChange={handleChangeRepeat}
                        size='small'
                    >
                        <MenuItem value={false}>No repeat</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                </Stack>
                {repeat === 'weekly' ?
                    <Stack direction="row" justifyContent={"space-between"}>
                        <Box></Box>
                        <WeekPicker handleChangeRepeatOn={handleChangeRepeatOn} repeatOn={repeatOn}></WeekPicker>
                    </Stack>
                    : <></>
                }

            </Grid>
            <Grid container direction="row" justifyContent='flex-end' alignItems={'center'} sx={{ marginTop: 2 }}>
                <Button onClick={props.handleTaskSelectClose}>Cancel</Button>
                <Button onClick={handleSaveTask}>Save</Button>
            </Grid>
            <TagDialog openTagSelect={openTagSelect}
                handleOpenTagSelect={handleOpenTagSelect}
                tagSelected={tag}
                handleChangeTag={handleChangeTag}
                handleChangeColor={handleChangeColor}
            ></TagDialog>
        </Box>
    )
}
