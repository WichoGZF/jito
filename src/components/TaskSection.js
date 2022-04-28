import { useState } from "react";
import CurrentTaskBox from './CurrentTaskBox';
import TaskList from './TaskList';
import TagSelectPopUp from './TagSelectPopUp';
import Box from '@mui/material/Box';

export default function TaskSection(props){
  const [openPopUp, setOpenPopUp] = useState(false); //Takes values depending on which menu wants to open

  const handlePopUpOpen = (menu) => {
    setOpenPopUp(menu);
  };

  const handlePopUpClose = () => {
    setOpenPopUp(false);
    console.log(openPopUp)
  };

  return(
    <Box>
    <CurrentTaskBox handlePopUp={handlePopUpOpen}></CurrentTaskBox>
    <TaskList></TaskList>
    <TagSelectPopUp openPopUp={openPopUp} closePopUp={handlePopUpClose}></TagSelectPopUp>
    </Box>
    )
}