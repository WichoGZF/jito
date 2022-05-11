import { useState } from "react";
import TaskList from './TaskList';
import TagSelect from './TagSelect';
import Box from '@mui/material/Box';
import TaskAppBar from './TaskAppBar';
import TaskSelect from './TaskSelect';
export default function TaskSection(props) {
  const [openTagSelect, setTagSelect] = useState(false); //
  const [openTaskSelect, setTaskSelect] = useState(false); //
  const [taskSelectMode, setTaskSelectMode] = useState(""); 

  const handleTagSelectOpen = () => {
    setTagSelect(true);
    console.log(openTaskSelect)
  };

  const handleTagSelectClose = () => {
    setTagSelect(false);
  };

  //For oppening an "add" menu
  const handleTaskSelectAddOpen = () => {
    setTaskSelect(true);
    setTaskSelectMode("add");
  };

  const handleTaskSelectClose = () => {
    setTaskSelect(false);
  }
  //For opening an "edit" menu
  const handleTaskSelectEditOpen = () => {
    setTaskSelect(true);
    setTaskSelectMode("edit");
  };


  return (
    <Box>
      <TaskAppBar handleTaskSelectAddOpen={handleTaskSelectAddOpen}></TaskAppBar>
      <TaskList taskSelectEditOpen={handleTaskSelectEditOpen}></TaskList>
      <TagSelect 
      openTagSelect={openTagSelect}
      closeTagSelect={handleTagSelectClose}
      tagHandler={props.tagHandler}
      tags={props.tags}
      ></TagSelect>
      <TaskSelect
        handleTaskSelectClose={handleTaskSelectClose}
        openTaskSelect={openTaskSelect}
        handleTagSelectOpen={handleTagSelectOpen}
        taskHandler={props.taskHandler}
        tasks={props.tasks}
      >
      </TaskSelect>
    </Box>
  )
}