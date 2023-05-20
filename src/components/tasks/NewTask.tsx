import { ListItem, Button } from "@mui/material";
import { useState } from "react";
import TaskCreate from "./TaskCreate";
import AddTaskIcon from '@mui/icons-material/AddTask';

/*Add new task button with a state change for showing the add a new task component */

export default function NewTask() {
  const [addNewTask, setAddNewTask] = useState(false);

  const handleClickNewTask = () => {
    setAddNewTask(!addNewTask)
  }

  return (
    <>
      <ListItem>
        <Button
          startIcon={<AddTaskIcon></AddTaskIcon>}
          variant='contained'
          onClick={handleClickNewTask}
          sx={{ width: "100%" }}
          data-cy="add-new-task-button"
          >
            Add new task
        </Button>
      </ListItem>
      {addNewTask ? 
      <TaskCreate
        onClose={handleClickNewTask}/> : <></>}
    </>
  )
}