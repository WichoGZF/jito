import { ListItem, Button } from "@mui/material";
import React, { useState } from "react";
import TaskInput from "./TaskInput";
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function NewTask(props) {
    const [addNewTask, setAddNewTask] = useState(false);
    const [openTagSelect, setOpenTagSelect] = useState(false)
  
    const handleClickNewTask = () => {
      setAddNewTask(!addNewTask)
    }
  
    return (
      <>
        <ListItem>
          <Button icon={<AddTaskIcon></AddTaskIcon>} variant="outlined" onClick={handleClickNewTask} sx={{ width: "100%" }}>Add new task</Button>
        </ListItem>
        {addNewTask ? <TaskInput
          edit={false} handleTaskSelectClose={handleClickNewTask}></TaskInput> : <></>}
      </>
    )
  }