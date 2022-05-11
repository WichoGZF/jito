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
import { Box } from "@mui/system";

import { Grid, Icon, IconButton } from "@mui/material";
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

export default function TagSelect(props) {
    const [primaryTag, setPrimaryTag] = useState(null)
    const [secondaryTag, setSecondaryTag] = useState(null)
    const [tags, setTags] = useState(props.tags);
    const [openPopper, setOpenPopper] = useState(false);
    const [editMenu, setEditMenu] = useState(false);

    console.log(tags)

    //Arrays containing standard icon and colors por primary and secondary tags
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

    const colorArray = [
        "Black",
        "Blue",
        "Brown",
        "Yellow",
        "Green",
        "Gray",
        "Purple",
        "Pink",
        "Orange"
    ]

    //Popper handling
    const handlePopper = () => {
        setOpenPopper(!openPopper)
    }

    //Formatter, maps the values of the pre-defined icon and collor arrays and shows them as icons and colors depending 
    //on the type parameter

    function PrimaryPopper(props) {
        const popperContent = iconArray.map((iconArray.map(
            (icon, index) => {
                return (<Grid item key={index} xs={4}> {icon} </Grid>)
            }
        )
        ))
        return (
            <>
                {popperContent}
            </>
        )
    }
    function SecondaryPopper(type) {
        const popperContent = colorArray.map(
            (color, index) => {
                return (
                    <Grid item key={index} xs={4}> <CircleIcon color={color}></CircleIcon></Grid>
                )
            }
        )
    }



    //Popper container, takes three props, conditional, reference and content.
    function PopperContainer(props) {
        return (
            <Popper
                placement="bottom"
                open={props.openPopper}
                modifiers={[
                    {
                        name: 'arrow',
                        enabled: props.openPopper,
                        options: {
                            element: props.arrowRef,
                        }
                    }
                ]}
                transition
            >
                <Grid container>
                    {props.content}
                </Grid>

            </Popper>
        )
    }


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
                sx={{ color: props.color }}
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
        const chipTags = tags[primaryTag].children.map((tag, index) => {
            return (
                <SecondaryChipTag
                    key={tag.name}
                    name={tag.name}
                    icon={tags[primaryTag].icon}
                    onClick={()=> setSecondaryTag(index)}
                    color={tag.color}
                    variant={(index === secondaryTag) ? "filled" : "outlined"}
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
        const chipTags = tags.map((tag, index) => {
            return (
                <PrimaryChipTag
                    key={tag.name}
                    icon={tag.icon}
                    onClick={()=> setPrimaryTag(index)}
                    name={tag.name}
                    variant={(index === primaryTag) ? "filled" : "outlined"}></PrimaryChipTag>
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
        const handleTagChange = () => {

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
                    <IconButton>
                        {props.icon}
                    </IconButton>
                </ListItemIcon>
                <ListItemText>
                    <Input onChange={(e) =>
                        setInput(e.target.value)
                    }
                        onBlur={
                            setTags(tags.map((tag, index) => {
                                if (index === props.index) {
                                    tag.name = input
                                }
                                return tag;
                            }))}
                        onKeyPress={(e) => {
                            if (e.key === "enter") {
                                setTags(tags.map((tag, index) => {
                                    if (index === props.index) {
                                        tag.name = input
                                    }
                                    return tag;
                                }))
                            }
                        }}
                    ></Input>
                </ListItemText>
            </ListItem>
        )
    }

    //Collapsible containig children (secondary tags)
    function CollapseListTag(props) {
        return (
            <Collapse in={props.collapse} unmountOnExit>
                <List>
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
                    endIcon={collapse ? <ExpandLess /> : <ExpandMore />} ></ListTag>
                <CollapseListTag collapse={collapse} children={props.children}></CollapseListTag>
            </>
        )
    }

    //Secondary list item tags
    function ChildListTag(props) {
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="child-edit">
                    <EditIcon></EditIcon>
                </IconButton>
            }
        >
            <ListItemIcon>
                <CircleIcon color={props.color}></CircleIcon>
            </ListItemIcon>
            <ListItemText>
                {props.name}
            </ListItemText>
        </ListItem>
    }


    //Formats and retrns the array containing the editable list components 
    function ReturnEditableTags(props) {
        const tagArray = tags.map((tag, index) => {
            return (
                <PrimaryListTag
                    key={tag.name}
                    name={tag.name}
                    icon={tag.icon}
                    children={tags[index].children.map((child, index) => {
                        console.log("Rendering secondary tag...", index)
                        return (
                            <ChildListTag
                                color={child.color}
                                key={child.name}
                                name={child.name} />
                        )
                    }
                    )}
                ></PrimaryListTag>
            )
        }
        )
        return (
            <>
                <PrimaryAddTagListItemLogic></PrimaryAddTagListItemLogic>
                {tagArray}
            </>
        )
    }

    //Handles tag adding

    function PrimaryAddTagListItemLogic(props) {
        const [selectedTagName, setSelectedTagName] = useState("");
        const [addTag, setAddTag] = useState(false);

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
                                setTags(tags.concat([
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
            <AddTagListItem key="add-button" onClick={() => setAddTag(true)} addLabel="primary task"></AddTagListItem>
        )
    }
    function SecondaryAddTagListItemLogic(props) {
        const [selectedTagName, setSelectedTagName] = useState("")
        const [addTag, setAddTag] = useState(false);

        if (addTag) {
            return (
                <>
                    <AddTagListItem key="add-button" onClick={() => setAddTag(true)} addLabel="secondary task"></AddTagListItem>
                    <ListItem key="add-input">
                        <Input
                            value={selectedTagName}
                            onChange={(e) => {
                                setSelectedTagName(e.target.value)
                            }}
                            onBlur={(e) => {
                                let newTags = tags;
                                newTags[props.index].children.concat({
                                    name: selectedTagName,
                                    color: "gray"
                                })
                                setTags(newTags);
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
            <AddTagListItem key="add-button" onClick={() => setAddTag(true)} addLabel="secondary task"></AddTagListItem>

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


    if (editMenu) {
        console.log("Rendering editing tag manu....")
        return (
            <Dialog open={props.openTagSelect}>
                <DialogTitle><IconButton onClick={() => setEditMenu(false)}><ArrowBackIcon></ArrowBackIcon></IconButton>Edit tags</DialogTitle>
                <DialogContent dividers>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ReturnEditableTags></ReturnEditableTags>
                    </List>
                </DialogContent>
            </Dialog>
        )
    }

    else {
        console.log("Rendering select tag menu...")
        if (primaryTag) {
            return (
                <Dialog open={props.openTagSelect} onClose={props.closeTagSelect}>
                    <DialogTitle>Select the tags
                        <IconButton onClick={() => setEditMenu(true)}><EditIcon></EditIcon></IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <ReturnPrimaryTags></ReturnPrimaryTags>
                    </DialogContent>
                    <DialogContent dividers>
                        <ReturnSecondaryTags></ReturnSecondaryTags>
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
                    <IconButton onClick={() => setEditMenu(true)}><EditIcon></EditIcon></IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <ReturnPrimaryTags></ReturnPrimaryTags>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeTagSelect}>Cancel</Button>
                    <Button onClick={() => { }}>Done</Button>
                </DialogActions>
            </Dialog>
        )

    }
}
