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
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import WeekPicker from './WeekPicker'
import Task from "types/Task";

/*
Input component for handling a new task. Handles both use cases of adding a new task and editing an existing one. 
*/
export default function TaskInput({ task, tagColor, onSaveTask, onClose }
    :{ task: Task, tagColor: string, onSaveTask: () => void, onClose: () => void }) {
    const dateSelected = useAppSelector(state => state.app.calendarDate)
    const dispatch = useAppDispatch()

    const [taskVal, setTaskVal] = useState<Task>(task)
    //USE SELECTOR for color
    const [color, setColor] = useState(tagColor)

    //for comps.
    const [openTagSelect, setOpenTagSelect] = useState(false)

    const handleOpenTagSelect = () => {
        setOpenTagSelect(!openTagSelect)

    }

    const handleSetTaskName = (event) => {
        setTaskVal(
            state => {
                return {
                    ...state,
                    name: event.target.value
                }
            })
    }

    const handleSetTaskDescription = (event) => {
        setTaskVal(
            state => {
                return {
                    ...state,
                    description: event.target.value
                }
            }
        )
    }

    const handleChangeRepeat = (event) => {
        setTaskVal(
            state => {
                return {
                    ...state,
                    repeat: event.target.value
                }
            }
        )
    }

    const handleChangeTaskType = (event) => {
        setTaskVal(
            state => {
                return {
                    ...state,
                    type: event.target.value
                }
            }
        )
    };

    const handleChangeRepeatOn = (digit: number) => {
        setTaskVal(state => {
            let newRepeatOn = state.repeatOn
            newRepeatOn[digit] = !newRepeatOn[digit]
            return {
                ...state,
                repeatOn: newRepeatOn
            }
        })
    }

    const handleChangeTag = (tag: string) => {
        setTaskVal(state => {
            return {
                ...state,
                tag: tag
            }
        })
    }

    const handleChangeColor = (color: string) => {
        setColor(color)
    }

    const handleBlocks = (event) => {
        const input = event.target.value
        const filteredInput = input.replace(/\D/g, '')
        const numericalBlocks = parseInt(filteredInput)
        let blocksToSend: number;
        if (taskVal.type === 'block') {
            !!numericalBlocks ? blocksToSend = numericalBlocks : blocksToSend = 1
        }
        else {
            blocksToSend = 0
        }
        setTaskVal(state => {
            return {
                ...state,
                blocks: blocksToSend
            }
        })
    }
    /*Does some last stop validation and saves (calls function from save hook).*/
    function handleSaveTask() {
        onClose()
        onSaveTask()
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container direction='column' gap={1.5} sx={{ padding: "15px", border: '1px', borderStyle: 'solid', borderColor: "#e2e2e2", borderRadius: '25px' }}>
                <TextField id="task-name"
                    value={taskVal.name}
                    onChange={(e) => handleSetTaskName(e.target.value)}
                    sx={{ flexGrow: 1, gridRow: '1', gridColumn: '2' }}
                    autoFocus={true}
                    label={<Typography variant='button'>Name</Typography>}
                    required
                    size='small'
                    inputProps={{ maxLength: 100 }}
                />
                <TextField id="task-description"
                    value={taskVal.description}
                    onChange={(e) => handleSetTaskDescription(e.target.value)}
                    label={<Typography variant='button'>Details</Typography>}
                    multiline
                    size='small'
                    inputProps={{ maxLength: 200 }}
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
                            value={taskVal.type}
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
                                {taskVal.type === 'normal' ? 'Number of expected pomodoros' : 'Number of blocks'}
                            </Typography>
                        </FormLabel>
                        <Input type="number" value={taskVal.blocks} onChange={handleBlocks}></Input>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <FormLabel>
                        <Typography variant='button'>Tag</Typography>
                    </FormLabel>
                    <Chip clickable onClick={handleOpenTagSelect} label={taskVal.tag} sx={{ backgroundColor: color }}></Chip>
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
                        <RepeatIcon color={taskVal.repeat ? 'primary' : 'disabled'}></RepeatIcon>
                    </Grid>
                    <Select labelId="select"
                        value={taskVal.repeat}
                        label="Repeat"
                        onChange={handleChangeRepeat}
                        size='small'
                    >
                        <MenuItem value="no-repeat">No repeat</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                </Stack>
                {taskVal.repeat === 'weekly' ?
                    <Stack direction="row" justifyContent={"space-between"}>
                        <Box></Box>
                        <WeekPicker handleChangeRepeatOn={handleChangeRepeatOn} repeatOn={taskVal.repeatOn}></WeekPicker>
                    </Stack>
                    : <></>
                }

            </Grid>
            <Grid container direction="row" justifyContent='flex-end' alignItems={'center'} sx={{ marginTop: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSaveTask}>Save</Button>
            </Grid>
            <TagDialog openTagSelect={openTagSelect}
                handleOpenTagSelect={handleOpenTagSelect}
                tagSelected={taskVal.tag}
                handleChangeTag={handleChangeTag}
                handleChangeColor={handleChangeColor}
            ></TagDialog>
        </Box>
    )
}
