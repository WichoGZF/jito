import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, ListItem, IconButton, ListItemText, Input, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { changeTagColor, deleteTag, changeTagName } from 'features/tasksSlice';
import React, { useState, useRef, useEffect } from 'react';
import { TwitterPicker } from "react-color";
import { useAppDispatch } from 'hooks/useAppDispatch';
import useHandleDeleteTag from 'hooks/useHandleDeleteTag';
import useHandleUpdateTag from 'hooks/useHandleUpdateTag';

/*
  This component is used to display a tag in the list of tags. Alongside the editing and delete functionality.
*/

export default function TagEntry(props) {
  const dispatch = useAppDispatch()

  const [colorPick, setColorPick] = useState(false)
  const [color, setColor] = useState(props.color)
  const [editName, setEditName] = useState(false)
  const [tagName, setTagName] = useState(props.tag)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [colorPos, setColorPos] = useState([0, 0])

  const colorRef = useRef<HTMLElement>(null)!;

  const [deleteTagMut] = useHandleDeleteTag()
  const [updateTag] = useHandleUpdateTag()

  useEffect(() => {
    const colorBounding = colorRef.current!.getBoundingClientRect()

    const colorX = colorBounding.x - 260 + 16
    const colorY = colorBounding.y + 24 + 12

    setColorPos([colorX, colorY])

  }, [])


  const handleEditName = () => {
    setEditName(!editName)
  }
  //What type
  const handleChangeColor = (color) => {
    setColor(color.hex);
    if (color !== props.color) {
      updateTag(
        {
          id: props.id,
          name: props.tag,
          color: color.hex
        }
      )
    }
    setColorPick(!colorPick)
  }

  const handleDeleteDialog = () => {
    setDeleteDialog(!deleteDialog)
  }

  const dispatchDelete = () => {
    deleteTagMut(props.id)
    handleDeleteDialog()
  }

  const dispatchEdit = () => {
    if (tagName !== props.tag) {
      updateTag({
        id: props.id,
        name: props.tag,
        color: props.color
      })
    }
    handleEditName()
  }


  const colorSelector = <Box sx={{ position: 'absolute', zIndex: '2' }}>
    <Box sx={{ position: 'fixed', top: `${colorPos[1]}px`, right: '0px', bottom: '0px', left: `${colorPos[0]}px`, }}>
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
        <IconButton onClick={handleEditName} data-cy="tag-open-edit"><EditIcon></EditIcon></IconButton>
      </ListItem>
    )
  }
  else {
    return (
      <>
        <ListItem>
          <IconButton
            onClick={() => setColorPick(!colorPick)}
            sx={{ marginRight: '12px' }}
            data-cy="tag-open-color-picker"
            >
            <Box ref={colorRef} sx={{ height: '24px', width: '24px', backgroundColor: color, borderRadius: '50%' }}></Box>
          </IconButton>
          {colorPick ? colorSelector : null}
          <Input value={tagName} onChange={(event) => setTagName(event.target.value)} data-cy="tag-edit-name-input"></Input>
          <IconButton onClick={dispatchEdit} data-cy="tag-save-edit-button"><CheckIcon></CheckIcon></IconButton>
          <IconButton onClick={handleDeleteDialog} data-cy="tag-delete-open-button"><DeleteIcon></DeleteIcon></IconButton>
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
            <Button onClick={dispatchDelete} data-cy="tag-delete-button">Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}