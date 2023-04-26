import { Box, Stack, Collapse, Alert, IconButton, Button, ListItem, Input } from "@mui/material"
import { addTag } from "features/tasksSlice"
import React, { useState, useRef } from "react"
import { TwitterPicker } from "react-color"
import { useAppDispatch, useAppSelector } from "hooks"
import CloseIcon from '@mui/icons-material/Close'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';

export default function AddTag() {
    const [colorPick, setColorPick] = useState(false)
    const [color, setColor] = useState('gray')
    const [tagName, setTagName] = useState('')
    const [addNewTag, setAddNewTag] = useState(false)
    const [alert, setAlert] = useState(false)
  
    const tags = useAppSelector((state) => state.tasks.tags)
    const dispatch = useAppDispatch()
  
    const colorRef = useRef<HTMLElement>(null)
    const colorBounding = colorRef.current?.getBoundingClientRect()!
  
    const colorX = colorRef.current ? colorBounding.x - 260 + 16 : 0
    const colorY = colorRef.current ? colorBounding.y + 24 + 12 : 0
  
    //Color most likely a string, idk
    const handleChangeColor = (color) => {
      setColor(color.hex);
      setColorPick(!colorPick)
    }
  
  
    const handleAddNewTag = () => {
      setAddNewTag(!addNewTag)
    }
  
    const handleAlert = () => {
      setAlert(!alert)
    }
  
    const saveTag = () => {
      let uniqueName = true;
      for (const tagObject of tags) {
        if (tagObject.name === tagName) {
          uniqueName = false;
        }
      }
      if (uniqueName) {
        dispatch(addTag({ name: tagName, color: color }))
        handleAddNewTag()
      }
      else {
        handleAlert()
      }
  
    }
  
  
    const colorSelector = <Box sx={{ position: 'absolute', zIndex: '2' }}>
      <Box sx={{ position: 'fixed', top: `${colorY}px`, right: '0px', bottom: '0px', left: `${colorX}px`, }}>
        <TwitterPicker color={color} onChange={handleChangeColor} triangle="top-right"></TwitterPicker>
      </Box>
    </Box>
  
  
  
    return (
      <Box>
        <Stack spacing={1}>
          <Collapse in={alert}>
            <Alert
              action={
                <IconButton color="inherit" size="small" onClick={handleAlert}>
                  <CloseIcon fontSize="inherit"></CloseIcon>
                </IconButton>}
              severity='error'>
              Please use a unique name for the tag
            </Alert>
          </Collapse>
          <Button onClick={handleAddNewTag} variant="outlined" startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>} sx={{ width: '100%' }}>
            Add new tag
          </Button>
        </Stack>
  
        {addNewTag
          ? <ListItem>
            <IconButton
              onClick={() => setColorPick(!colorPick)}
              sx={{ marginRight: '12px' }}>
              <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
            </IconButton>
            {colorPick ? colorSelector : null}
            <Input placeholder='New tag' inputProps={{ maxLength: 20 }} value={tagName} onChange={(event) => setTagName(event.target.value)}></Input>
            <IconButton onClick={saveTag}><CheckIcon></CheckIcon></IconButton>
            <IconButton onClick={handleAddNewTag}><CloseIcon></CloseIcon></IconButton>
          </ListItem>
          : <></>
        }
  
      </Box>
    )
  }