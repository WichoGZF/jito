import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  restartTask,
} from '../../features/tasksSlice.js'
import {
  currentTag, currentIndex, currentType
} from '../../features/appSlice.js'
import CompletedDialog from './CompletedDialog'
import OverdueTaskList from './OverdueTaskList.js';
import ListEntry from './ListEntry.js';
import NewTask from './NewTask.js';

export default function TaskList(props) {
  const [deletedTask, setDeletedTask] = useState(null) //saves deleted task, controls redo pop up. after 5s changes are
  //stored in tasks.history via use effect and state turned into null thus disappearing the pop up

  const dispatch = useDispatch()

  const tasks = useSelector(state => state.tasks.tasks)
  const tags = useSelector(state => state.tasks.tags)
  const calendarDate = useSelector(state => state.app.calendarDate)
  const initializedDate = useSelector(state => state.app.initialized)
  const todayDate = useSelector(state => state.app.todayDate)

  const initialized = initializedDate === todayDate

  function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
  }

  function taskToListEntry(task, firstTask, index) {
    return (
      <ListEntry
        key={task.tag + task.id}
        text={task.name}
        description={task.description}
        index={index}
        date={task.date}
        type={task.type}
        blocks={task.blocks}
        repeat={task.repeat}
        repeatOn={task.repeatOn}
        tag={task.tag}
        tags={tags}
        firstTask={firstTask}
      ></ListEntry>
    )
  }
  const splitCalendarDate = calendarDate.split('/')
  const [month, calendarDay, year] = splitCalendarDate
  const realCalendarDate = new Date(year, month - 1, calendarDay)
  const dayOfTheWeek = realCalendarDate.getDay();

  let allTagTasks = []

  let firstTaskIndex
  let firstTaskTag
  let firstTaskType
  //irrelevant you could have used one of the abovce but w/e
  let firstTaskAdded = false
  tasks.forEach((task, index) => {

    if (task.repeat === 'false') {
      if (task.date === calendarDate) {
        if (!allTagTasks.length) {
          firstTaskAdded = true
        }
        allTagTasks.push(taskToListEntry(task, firstTaskAdded, index))
      };
    }
    else {
      if (!task.completed || todayDate !== calendarDate) { //In order to filter completed yet not discard future tasks
        switch (task.repeat) {
          case 'weekly':
            if (task.repeatOn[dayOfTheWeek]) {
              if (!allTagTasks.length) {
                firstTaskAdded = true
              }
              allTagTasks.push(taskToListEntry(task, firstTaskAdded, index))
            }
            break;
          case 'daily':
            if (!allTagTasks.length) {
              firstTaskAdded = true
            }
            allTagTasks.push(taskToListEntry(task, firstTaskAdded, index));
            break;
        }
      }
    }

    if (firstTaskAdded) {//if this is the first task added
      firstTaskIndex = index
      firstTaskTag = task.tag
      firstTaskType = task.type
      //No longer the first task added
      firstTaskAdded = false

    }
  })

  //Debugging
  //Does this only run once?
  useEffect(() => {
    console.log('Re-render tasklist');

    if (allTagTasks.length) {
      dispatch(currentTag(firstTaskTag));
      dispatch(currentIndex(firstTaskIndex));
      dispatch(currentType(firstTaskType));
    }
    /*Task initiliazing */
    console.log('Initialized: ', initialized)
    if (!initialized) {
      const nonInitialized = []
      tasks.forEach((task, index) => {
        if (task.repeat !== 'false') {
          if (task.completed || task.defaultBlocks > task.blocks){
            nonInitialized.push(index)
          }
        }
      })
      dispatch(restartTask(nonInitialized))
    }

  })


  return (
    <Box key={'tasklist-box'}>
      <Typography variant="overline" color="text.primary" sx={{ pl: 1 }}>Scheduled tasks</Typography>
      <Grid >
        <Divider key="divider"></Divider>
        <NewTask key="newTask"></NewTask>
        {allTagTasks}
        <OverdueTaskList key="overdues" open={!initialized}></OverdueTaskList>
        <CompletedDialog key="completed"></CompletedDialog>
      </Grid>
    </Box>
  )
}

