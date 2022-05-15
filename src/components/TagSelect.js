import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useState } from "react";
import { Box, color } from "@mui/system";

import { Grid, Icon, IconButton, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Popper } from "@mui/material";

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//For primary tags
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HouseIcon from '@mui/icons-material/House';
import CountertopsIcon from '@mui/icons-material/Countertops';
import BuildIcon from '@mui/icons-material/Build';
import CreateIcon from '@mui/icons-material/Create';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//for secondary
import CircleIcon from '@mui/icons-material/Circle';
import { blue } from "@mui/material/colors";

import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Circle from "@mui/icons-material/Circle";

import { ListItem } from "@mui/material";
import TaskSection from "./TaskSection";

import { Collapse } from "@mui/material";
//Color

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { createTheme } from '@mui/material/styles'

import { usePopper } from 'react-popper'
import styled from "styled-components";


function PrimaryPopper(props) {
    const iconArray = [
        <SchoolIcon></SchoolIcon>,
        <WorkIcon></WorkIcon>,
        <HouseIcon></HouseIcon>,
        <CountertopsIcon></CountertopsIcon>,
        <BuildIcon></BuildIcon>,
        <CreateIcon></CreateIcon>,
        <HistoryEduIcon></HistoryEduIcon>,
        <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>,
        <DirectionsRunIcon></DirectionsRunIcon>
    ]

    const popperContent = (iconArray.map(
        (icon, index) => {
            return (<Grid item key={index} xs={4}><IconButton>{icon}</IconButton></Grid>)
        }
    )
    )
    return (
        <Grid container>
            {popperContent}
        </Grid>


    )
}

function SecondaryPopper(props) {
    const colorArray = [
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success"
    ]
    const popperContent = colorArray.map(
        (color, index) => {
            return (
                <Grid item key={index} xs={4}> <IconButton><CircleIcon color={color}></CircleIcon></IconButton></Grid>
            )
        }
    )
    return (
        <Grid container>
            {popperContent}
        </Grid>
    )
}

const PopperContainer = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
border-radius: 5px;
background-color: white;
padding: 20px;
position: absolute;


.arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: " ";
      position: absolute;
      top: -25px; // we account for the PopperContainer padding
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    }
  }

`

const mockTags = [
    {
        name: "tag1",
        icon: <SchoolIcon></SchoolIcon>,
        children: [{ name: "tag1-1", color: "primary" }, { name: "tag1-2", color: "secondary" }]
    },
    {
        name: "tag2",
        icon: <WorkIcon></WorkIcon>,
        children: [{ name: "tag2-1", color: "error" }, { name: "tag2-2", color: "warning" }]
    }
]

//Primary tag for displaying (chip form)
function PrimaryChipTag(props) {
    return (
        <Chip
            onClick={props.onClick} //On chip pressing (selects)
            label={props.name}
            icon={props.icon}
        >
        </Chip>

    )
}
//Secondary tag for displaying (chip form)
function SecondaryChipTag(props) {
    return (
        <Chip
            onClick={props.onClick} //
            color={props.color}
            icon={props.icon}
            label={props.name}
        >
        </Chip>
    )
}

/*
Returns the tags formatted into components depending on the parameter.
*/
function ReturnSecondaryTags(props) {
    const chipTags = props.tags[props.primaryTag].children.map((tag, index) => {
        return (
            <SecondaryChipTag
                key={tag.name}
                name={tag.name}
                icon={props.tags[props.primaryTag].icon}
                onClick={
                    () => {
                        props.onClick(index)
                    }
                }
                color={tag.color}
                variant={(index === props.secondaryTag) ? "filled" : "outlined"}
            ></SecondaryChipTag>
        )
    })
    return (
        <>
            {chipTags}
        </>
    )
}

function ReturnPrimaryTags(props) {
    const chipTags = props.tags.map((tag, index) => {
        return (
            <PrimaryChipTag
                key={tag.name}
                icon={tag.icon}
                onClick={
                    () => {
                        props.onClick(index)
                    }
                }
                name={tag.name}
                variant={(index === props.primaryTag) ? "filled" : "outlined"}></PrimaryChipTag>
        )
    })
    return (
        <>
            {chipTags}
        </>
    )
}

//List tag for editing. Contains input, icon with hover selection, and saves to tags upon finishing to edit input.
function ListTag(props) {
    const [input, setInput] = useState(props.name)
    const [iconSelect, setIconSelect] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    const handleIconSelect = () => {
        setIconSelect(!iconSelect)
    }


    return (
        <ListItem
            secondaryAction={
                <IconButton onClick={props.expandSecondary} edge="end" aria-label="open secondary">
                    {props.endIcon}
                </IconButton>
            }
        >
            <ListItemIcon>
                <IconButton ref={setReferenceElement} onClick={handleIconSelect}>
                    {props.icon}
                </IconButton>
            </ListItemIcon>
            <ListItemText>
                <Input
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    onBlur={
                        () => {
                            props.setTags(props.tags.map((tag, index) => {
                                if (index === props.index) {
                                    tag.name = input
                                }
                                return tag;
                            }))
                        }
                    }
                    onKeyPress={(e) => {
                        if (e.key === "enter") {
                            props.tags.map((tag, index) => {
                                if (index === props.index) {
                                    tag.name = input
                                }
                                return tag;
                            }
                            )
                        }
                    }
                    }
                ></Input>
            </ListItemText>

            {iconSelect ? (<PopperContainer ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                <PrimaryPopper></PrimaryPopper>
                <div ref={setArrowElement} style={styles.arrow} />
            </PopperContainer>) : (<></>)}
        </ListItem>
    )

}

//Collapsible containig children (secondary tags)
function CollapseListTag(props) {

    return (
        <Collapse in={props.collapse} unmountOnExit>
            <List>
                <SecondaryAddTagListItemLogic
                    tags={props.tags} index={props.index} setTags={props.setTags}
                ></SecondaryAddTagListItemLogic>
                {props.children}
            </List>
        </Collapse>
    )
}

//Primary edition list component. Returns a list entry (editable) and a collapsible containing all the secondary
//tags.

function PrimaryListTag(props) {
    const [collapse, setCollapse] = useState(false)

    const handleCollapse = () => {
        setCollapse(!collapse)
    }

    return (
        <>
            <ListTag name={props.name} icon={props.icon} expandSecondary={handleCollapse}
                endIcon={collapse ? <ExpandLess /> : <ExpandMore />}
                tags={props.tags}
                setTags={props.setTags}></ListTag>
            <CollapseListTag children={props.children} collapse={collapse} tags={props.tags} index={props.index} setTags={props.setTags}></CollapseListTag>
        </>
    )
}

//Formats and retrns the array containing the editable list components 
function ReturnEditableTags(props) {
    const tagArray = props.tags.map((tag, index) => {
        return (
            <PrimaryListTag
                key={tag.name}
                name={tag.name}
                icon={tag.icon}
                children={props.tags[index].children.map((child, index) => {
                    console.log("Rendering secondary tag...", index, child)
                    return (
                        <ChildListTag
                            key={child.name + color}
                            name={child.name}
                            color={child.color}
                        >
                        </ChildListTag>
                    )
                }
                )}
                tags={props.tags}
                setTags={props.setTags}
                index={index}
            >

            </PrimaryListTag>
        )
    }
    )
    return (
        <>
            <PrimaryAddTagListItemLogic tags={props.tags} setTags={props.setTags}></PrimaryAddTagListItemLogic>
            {tagArray}
        </>
    )
}


//Secondary list item tags
function ChildListTag(props) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="child-edit">
                    <EditIcon></EditIcon>
                </IconButton>
            }
            sx={{ pl: 4 }}
        >
            <ListItemIcon>
                <CircleIcon color={props.color}></CircleIcon>
            </ListItemIcon>
            <ListItemText>
                {props.name}
            </ListItemText>
        </ListItem>
    )
}



//Handles tag adding

function PrimaryAddTagListItemLogic(props) {
    const [selectedTagName, setSelectedTagName] = useState("");
    const [addTag, setAddTag] = useState(false);

    const handleAddTag = () => {
        setAddTag(!addTag)
    }

    if (addTag) {
        return (
            <>
                <AddTagListItem key="add-button" onClick={() => setAddTag(true)} addLabel="primary task"></AddTagListItem>
                <ListItem key="add-input">
                    <Input
                        value={selectedTagName}
                        onChange={(e) => {
                            setSelectedTagName(e.target.value)
                        }}
                        onBlur={(e) => {
                            props.setTags(props.tags.concat([
                                {
                                    name: selectedTagName,
                                    icon: <CircleIcon></CircleIcon>,
                                    children: []
                                }
                            ]
                            ))
                            setAddTag(false);
                            setSelectedTagName("")
                        }
                        }
                        autoFocus={true}
                    ></Input>
                </ListItem>
            </>
        )
    }
    return (
        <AddTagListItem key="add-button" onClick={handleAddTag} addLabel="primary task"></AddTagListItem>
    )
}



function SecondaryAddTagListItemLogic(props) {
    const [selectedTagName, setSelectedTagName] = useState("")
    const [addTag, setAddTag] = useState(false);

    const handleAddTag = () => {
        setAddTag(!addTag)
    }

    if (addTag) {
        return (
            <>
                <AddTagListItem key="add-button" onClick={handleAddTag} addLabel="secondary task"></AddTagListItem>
                <ListItem key="add-input" sx={{ pl: 4 }}>
                    <Input
                        value={selectedTagName}
                        onChange={(e) => {
                            setSelectedTagName(e.target.value)
                        }}
                        onBlur={(e) => {
                            let newTags = props.tags;
                            newTags[props.index].children.concat({
                                name: selectedTagName,
                                color: "gray"
                            })
                            props.setTags(newTags);
                            setAddTag(false);
                            setSelectedTagName("")
                        }}
                        autoFocus={true}
                    ></Input>
                </ListItem>
            </>

        )
    }
    return (
        <AddTagListItem key="add-button" onClick={handleAddTag} addLabel="secondary task"></AddTagListItem>

    )
}

//Tag adding button
function AddTagListItem(props) {
    return (
        <ListItemButton onClick={props.onClick}>
            <ListItemIcon>
                <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </ListItemIcon>
            <ListItemText primary={"Add new " + props.addLabel}></ListItemText>
        </ListItemButton>
    )
}

export default function TagSelect(props) {
    const [primaryTag, setPrimaryTag] = useState(null)
    const [secondaryTag, setSecondaryTag] = useState(null)
    const [tags, setTags] = useState(mockTags);
    const [editMenu, setEditMenu] = useState(false);

    console.log(tags)


    const handleTags = (newTags) => {
        setTags(newTags);
    }

    const handleEditMenu = () => {
        setEditMenu(!editMenu)
    }

    const handleSetPrimaryTag = (tagIndex) => {
        setPrimaryTag(tagIndex)
    }

    const handleSetSecondaryTag = (tagIndex) => {
        setSecondaryTag(tagIndex)
    }

    if (editMenu) {
        console.log("Rendering editing tag manu....")
        return (
            <Dialog open={props.openTagSelect}>
                <DialogTitle><IconButton onClick={handleEditMenu}><ArrowBackIcon></ArrowBackIcon></IconButton>Edit tags</DialogTitle>
                <DialogContent dividers>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ReturnEditableTags tags={tags} setTags={handleTags}></ReturnEditableTags>
                    </List>
                </DialogContent>
            </Dialog>
        )
    }

    else {
        console.log("Rendering select tag menu...")
        if (primaryTag === 0 || primaryTag > 0) {
            console.log(primaryTag)
            console.log(primaryTag === 0, primaryTag > 0)
            return (
                <Dialog open={props.openTagSelect} onClose={props.closeTagSelect}>
                    <DialogTitle>Select the tags
                        <IconButton onClick={() => setEditMenu(true)}><EditIcon></EditIcon></IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <ReturnPrimaryTags tags={tags} primaryTag={primaryTag} onClick={handleSetPrimaryTag}></ReturnPrimaryTags>
                    </DialogContent>
                    <DialogContent dividers>
                        <ReturnSecondaryTags tags={tags} primaryTag={primaryTag} secondaryTag={secondaryTag} onClick={handleSetSecondaryTag}></ReturnSecondaryTags>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.closeTagSelect}>Cancel</Button>
                        <Button onClick={() => { }}>Done</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        return (
            <Dialog open={props.openTagSelect} onClose={props.closeTagSelect}>
                <DialogTitle>Select the tags
                    <IconButton onClick={handleEditMenu}><EditIcon></EditIcon></IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <ReturnPrimaryTags tags={tags} primaryTag={primaryTag} onClick={handleSetPrimaryTag}></ReturnPrimaryTags>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeTagSelect}>Cancel</Button>
                    <Button onClick={() => { }}>Done</Button>
                </DialogActions>
            </Dialog>
        )

    }
}
