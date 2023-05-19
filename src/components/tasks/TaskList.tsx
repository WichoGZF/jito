import { useEffect } from 'react';
import { Typography, Grid, Box, Divider, List } from '@mui/material';
import {
  currentTag, currentIndex, currentType
} from '../../features/appSlice'
import CompletedDialog from './CompletedDialog'
import OverdueTaskList from './OverdueTaskList';
import ListEntry from './ListEntry';
import NewTask from './NewTask';
import Task from '../../types/Task'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import useInitializeTasks from 'hooks/useInitializeTasks';

function taskToListEntry(task: Task, firstTask: boolean, index: number ) {
  return (
    <ListEntry
      key={task.tag + task.id}
      firstTask={firstTask}
      index={index}
      task={task}
    ></ListEntry>
  )
}
interface FirstTaskInfo {
  index: number,
  tag: string,
  type: 'normal' | 'block'
}
//Returns int representing the day of the week today.
function getDayOfTheWeek(date: string): number {
  const splitCalendarDate = date.split('/')
  const [month, calendarDay, year] = splitCalendarDate
  const realCalendarDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(calendarDay))
  return realCalendarDate.getDay();
}

/*Component in charge of task section rendering and functionality. */

export default function TaskList() {
  const dispatch = useAppDispatch()

  const tasks = useAppSelector(state => state.tasks.tasks)
  const tags = useAppSelector(state => state.tasks.tags)
  const calendarDate = useAppSelector(state => state.app.calendarDate)
  const initializedDate = useAppSelector(state => state.app.initialized)
  const todayDate = useAppSelector(state => state.app.todayDate)

  const initialized = initializedDate === todayDate

  const [overdueNormals] = useInitializeTasks(tasks, initialized)

  const dayOfTheWeek = getDayOfTheWeek(todayDate)
  
  let allTagTasks: any[] = [] //React array
  // For overDue normals dialog  //
  let firstTaskInfo: FirstTaskInfo

  //Loop for mapping tasks into components to show.
  tasks.forEach((task, index) => {
    if (task.repeat === 'no-repeat') {
      if (task.date === calendarDate) {
        if (!allTagTasks.length) {
          firstTaskInfo = { index: index, tag: task.tag, type: task.type }
        }
        allTagTasks.push(taskToListEntry(task, !allTagTasks.length, index))
      };
    }
    else {
      if (!task.completed || todayDate !== calendarDate) { //In order to filter completed yet not discard future tasks
        if (task.repeat === 'weekly') {
          if (task.repeatOn[dayOfTheWeek]) {
            if (!allTagTasks.length) {
              firstTaskInfo = { index: index, tag: task.tag, type: task.type }
            }
            allTagTasks.push(taskToListEntry(task, !allTagTasks.length, index))
          }
        }
        else if (task.repeat === 'daily') {
          if (!allTagTasks.length) {
            firstTaskInfo = { index: index, tag: task.tag, type: task.type }
          }
          allTagTasks.push(taskToListEntry(task, !allTagTasks.length, index));
        }
      }
    }
  })

  //Dispatches the information about the current tag to appSlice.
  useEffect(() => {
    if (allTagTasks.length) {
      dispatch(currentTag(firstTaskInfo.tag));
      dispatch(currentIndex(firstTaskInfo.index));
      dispatch(currentType(firstTaskInfo.type));
    }
  })

  return (
    <Box key={'tasklist-box'}>
      <Typography variant="overline" color="text.primary" sx={{ pl: 1 }}>Scheduled tasks</Typography>
      <Grid >
        <Divider key="divider"></Divider>
        <NewTask key="newTask"></NewTask>
        <List>
          {allTagTasks}
        </List>
        <OverdueTaskList key="overdues" open={!initialized && !!overdueNormals.length} tasks={overdueNormals}></OverdueTaskList>
        <CompletedDialog key="completed"></CompletedDialog>
      </Grid>
    </Box>
  )
}

