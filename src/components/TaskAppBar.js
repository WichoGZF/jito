import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function TaskAppBar(props) {
    const [sortBy, setSortBy] = React.useState('Addition');
    const [filterBy, setFilterBy] = React.useState('None');
    const [sortOrder, setSortOrder] = React.useState(1) //1 is up-down 2 is down-top
    const handleChangeSort = (event) => {
        setSortBy(event.target.value);
    };
    const handleChangeFilter = (event) => {
        setFilterBy(event.target.value)
    }

    let filterPart
    if (filterBy === "Tag") {
        filterPart =
            <Stack direction="row" spacing={1}>
                <Chip label="Primary" />
                <Chip label="Secondary" variant="outlined" />
            </Stack>;

    }
    else if (filterBy === "Date") {
        filterPart =
            <IconButton>
                <CalendarMonthIcon></CalendarMonthIcon>
            </IconButton>
    }

    const returnIcon = () => {
        if (sortOrder) {
            return (<ArrowDownwardIcon></ArrowDownwardIcon>)
        }
        else {
            return (<ArrowUpwardIcon></ArrowUpwardIcon>)
        }
    }

    const changeIcon = () => {
        setSortOrder(!sortOrder);
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ gap: "10px" }}>
                    <IconButton onClick={()=> props.handleTaskSelectAddOpen(true)} size="small" >
                        <AddCircleOutlineIcon />
                    </IconButton>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>

                        <InputLabel id="sort-by-input-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-by-select-label"
                            id="sort-by-select"
                            value={sortBy}
                            onChange={handleChangeSort}
                            label="sort-by"
                            autoWidth
                        >
                            <MenuItem value={"Personal order"}>None</MenuItem>
                            <MenuItem value={"Addition"}>Addition</MenuItem>
                            <MenuItem value={"Date"}>Date</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={changeIcon} >
                        {returnIcon()}
                    </IconButton>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>


                        <InputLabel id="filter-by-input-label">Filter by</InputLabel>
                        <Select
                            labelId="filter-by-select-label"
                            id="filter-by-select"
                            value={filterBy}
                            onChange={handleChangeFilter}
                            label="filter-by"
                            autoWidth
                        >
                            <MenuItem value={"None"}>None</MenuItem>
                            <MenuItem value={"Tag"}>Tag</MenuItem>
                            <MenuItem value={"Date"}>Date</MenuItem>
                        </Select>
                    </FormControl>
                    {filterPart}


                </Toolbar>
            </AppBar>
        </Box>
    );
}
