import { useState } from "react";
import CurrentTaskBox from './CurrentTaskBox';
import TaskList from './TaskList';
import TagSelect from './TagSelect';
import Box from '@mui/material/Box';
import TaskAppBar from './TaskAppBar';
import TaskSelect from './TaskSelect';
export default function TaskSection(props){
  const [openTagSelect, setTagSelect] = useState(false); //
  const [openTaskSelect, setTaskSelect] = useState(false); //

  const handleTagSelectOpen = () => {
    setTagSelect(true);
  };

  const handleTagSelectClose = () => {
    setTagSelect(false);
  };

  const handleTaskSelectOpen = () => {
    setTaskSelect(true);
  };

  const handleTaskSelectClose = () => {
    setTaskSelect(false);
  }

  return(
    <Box>
    <CurrentTaskBox openTagSelect={handleTagSelectOpen}></CurrentTaskBox>
    <TaskAppBar openTaskSelect={handleTaskSelectOpen}></TaskAppBar>
    <TaskList></TaskList>
    <TagSelect openTagSelect={openTagSelect} closeTagSelect={handleTagSelectClose}></TagSelect>
    <TaskSelect openTaskSelect={openTaskSelect} close={handleTaskSelectClose} openTagSelect={handleTagSelectOpen}></TaskSelect>
    </Box>
    )
}