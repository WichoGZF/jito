import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, ListItem, IconButton, ListItemText, Input, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { changeTagColor, deleteTag, changeTagName } from 'features/tasksSlice';
import React, { useState, useRef } from 'react';
import { TwitterPicker } from 'react-color';
import { useDispatch } from 'react-redux';

export default function TagEntry(props) {
    const dispatch = useDispatch()
  
    const [colorPick, setColorPick] = useState(false)
    const [color, setColor] = useState(props.color)
    const [editName, setEditName] = useState(false)
    const [tagName, setTagName] = useState(props.tag)
    const [deleteDialog, setDeleteDialog] = useState(false)
  
    const colorRef = useRef(null)
    const colorBounding = colorRef.current?.getBoundingClientRect()
  
    const colorX = colorRef.current ? colorBounding.x - 260 + 16 : 0
    const colorY = colorRef.current ? colorBounding.y + 24 + 12 : 0
  
    const handleEditName = () => {
      setEditName(!editName)
    }
    const handleChangeColor = (color) => {
      setColor(color.hex);
      if (color !== props.color) {
        dispatch(changeTagColor(props.tag, color.hex))
      }
      setColorPick(!colorPick)
    }
  
    const handleDeleteDialog = () => {
      setDeleteDialog(!deleteDialog)
    }
  
    const dispatchDelete = () => {
      dispatch(deleteTag(props.tag))
      handleDeleteDialog()
    }
  
    const dispatchEdit = () => {
      if (tagName !== props.tag) {
        dispatch(changeTagName(props.tag, tagName))
      }
      handleEditName()
    }
  
  
    const colorSelector = <Box sx={{ position: 'absolute', zIndex: '2' }}>
      <Box sx={{ position: 'fixed', top: `${colorY}px`, right: '0px', bottom: '0px', left: `${colorX}px`, }}>
        <TwitterPicker color={color} onChange={handleChangeColor} triangle="top-right"></TwitterPicker>
      </Box>
    </Box>
  
    if (!editName) {
      return (
        <ListItem>
          <IconButton
            onClick={() => setColorPick(!colorPick)}
            sx={{ marginRight: '12px' }}>
            <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
          </IconButton>
          {colorPick ? colorSelector : null}
          <ListItemText>{tagName}</ListItemText>
          <IconButton onClick={handleEditName}><EditIcon></EditIcon></IconButton>
        </ListItem>
      )
    }
    else {
      return (
        <>
          <ListItem>
            <IconButton
              onClick={() => setColorPick(!colorPick)}
              sx={{ marginRight: '12px' }}>
              <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
            </IconButton>
            {colorPick ? colorSelector : null}
            <Input value={tagName} onChange={(event) => setTagName(event.target.value)}></Input>
            <IconButton onClick={dispatchEdit}><CheckIcon></CheckIcon></IconButton>
            <IconButton onClick={handleDeleteDialog}><DeleteIcon></DeleteIcon></IconButton>
          </ListItem>
          <Dialog open={deleteDialog}>
            <DialogTitle>
              Delete tag?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleting the tag will delete all the existing tasks with it. It won't delete completed tasks from the history.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialog}>Cancel</Button>
              <Button onClick={dispatchDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
        </>
      )
    }
  }