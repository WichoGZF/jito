import { Dialog, Stack, DialogTitle, IconButton, DialogContent, Grid, Chip, DialogActions, List } from "@mui/material"
import React, { useState } from "react"
import AddTag from "./AddTag"
import TagEntry from "./TagEntry"
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector } from "hooks/useAppSelector";

interface PropTypes{
  tagSelected: string,
  openTagSelect: boolean,
  handleChangeTag: Function, 
  handleChangeColor: Function, 
  handleOpenTagSelect: Function,
}

export default function TagDialog(props: PropTypes) {
    const tags = useAppSelector(state => state.tasks.tags)
  
    const [openTagEdit, setOpenTagEdit] = useState(false)
    const tagSelected = props.tagSelected
  
    const handleTagSelected = (tagName, tagColor) => {
      props.handleChangeTag(tagName)
      props.handleChangeColor(tagColor)
      props.handleOpenTagSelect()
    }
  
    const handleOpenTagEdit = () => {
      setOpenTagEdit(!openTagEdit)
    }
  
    const handleDialogBackDrop = () => {
      props.handleOpenTagSelect()
    }
  
    if (!openTagEdit) {
      return (<Dialog open={props.openTagSelect}
        onClose={handleDialogBackDrop}
      >
        <Stack direction="row" justifyContent="space-between">
          <DialogTitle>Select a tag</DialogTitle>
          <IconButton sx={{ mr: '12px' }} onClick={handleOpenTagEdit}><EditIcon></EditIcon></IconButton>
        </Stack>
        <DialogContent>
          <Grid container spacing={1}>
            {
              tags.map((tagObject, index) => {
                if (tagSelected === tagObject.name) {
                  return (
                    <Grid item xs='auto' key={tagObject.name}>
                      <Chip disabled label={tagObject.name} sx={{ backgroundColor: tagObject.color }}></Chip>
                    </Grid>
                  )
                }
                else {
                  return (
                    <Grid item xs='auto' key={tagObject.name}>
                      <Chip clickable onClick={() => { handleTagSelected(tagObject.name, tagObject.color) }}
                        label={tagObject.name} sx={{ backgroundColor: tagObject.color }}/>
                    </Grid>
                  )
                }
              })
            }
          </Grid>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
      )
    }
    else {
      return (<Dialog open={props.openTagSelect}
        onClose={() => {
          handleDialogBackDrop()
        }
        }
      >
        <DialogTitle><IconButton onClick={handleOpenTagEdit} sx={{ mr: '5px' }}><ArrowBackIcon></ArrowBackIcon></IconButton>Edit tags</DialogTitle>
        <DialogContent>
          <AddTag></AddTag>
          <List data-cy="tag-list">
            {
              tags.map((tagObject, index) => {
                return (
                  <TagEntry key={tagObject.name} tag={tagObject.name} color={tagObject.color} id={tagObject.id} index={index}></TagEntry>
                )
              })
            }
  
          </List>
        </DialogContent>
      </Dialog>
      )
    }
  }
  