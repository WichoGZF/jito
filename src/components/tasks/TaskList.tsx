import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import {
  restartTask,
} from '../../features/tasksSlice'
import {
  currentTag, currentIndex, currentType, initialize
} from '../../features/appSlice'
import CompletedDialog from './CompletedDialog'
import OverdueTaskList from './OverdueTaskList';
import ListEntry from './ListEntry';
import NewTask from './NewTask';

import Task from '../../types/Task'

import { useAppSelector, useAppDispatch } from '../../hooks'
import Tag from 'types/Tag';

export default function TaskList() {
  //Restarts all repeatables task  and returns array with non repeatables in past
  //We don't need to check for nothing so the tasks just get repeated
  function initializeTasks() {
    const nonInitialized: number[] = [] //Repeatable tasks with past history
    const pastTasks: Task[] = [] //Normal tasks in the past
    tasks.forEach((task: Task, index: number) => {
      if (task.repeat !== 'false') {
        if (task.completed || task.defaultBlocks > task.blocks!) { //Since is repeatable task.blocks isnt empty
          nonInitialized.push(index)
        }
      }
      else {
        pastTasks.push(task)
      }
    })
    dispatch(restartTask(nonInitialized))
    return (pastTasks)
  }

  const [deletedTask, setDeletedTask] = useState(null) //saves deleted task, controls redo pop up. after 5s changes are
  //stored in tasks.history via use effect and state turned into null thus disappearing the pop up

  const dispatch = useAppDispatch()

  const tasks = useAppSelector(state => state.tasks.tasks)
  const tags = useAppSelector(state => state.tasks.tags)
  const calendarDate = useAppSelector(state => state.app.calendarDate)
  const initializedDate = useAppSelector(state => state.app.initialized)
  const todayDate = useAppSelector(state => state.app.todayDate)

  const initialized = initializedDate === todayDate

  function taskToListEntry(task: Task, firstTask: boolean, index: number) {
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
  const realCalendarDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(calendarDay))
  const dayOfTheWeek = realCalendarDate.getDay();

  let allTagTasks: any[] = [] //React array
  // For overDue normals dialog
  let overdueNormals: Task[] = []
  //
  let firstTaskIndex: number
  let firstTaskTag: string
  let firstTaskType: 'normal' | 'block'
  //
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

  //Current tag useEffect 
  //Dispatches the information about the current tag

  useEffect(() => {
    if (allTagTasks.length) {
      dispatch(currentTag(firstTaskTag));
      dispatch(currentIndex(firstTaskIndex));
      dispatch(currentType(firstTaskType));
    }
  })

  //Initialization useEffect 
  //Initializes overdue tasks, and pushes past dates into array 
  useEffect(() => {
    if (!initialized) {
      overdueNormals = initializeTasks()
      //If there are no overdue normals initialize the app
      if(overdueNormals.length === 0){
        dispatch(initialize())
      }
    }
  }, [initialized])

  return (
    <Box key={'tasklist-box'}>
      <Typography variant="overline" color="text.primary" sx={{ pl: 1 }}>Scheduled tasks</Typography>
      <Grid >
        <Divider key="divider"></Divider>
        <NewTask key="newTask"></NewTask>
        {allTagTasks}
        <OverdueTaskList key="overdues" open={!initialized} tasks={overdueNormals}></OverdueTaskList>
        <CompletedDialog key="completed"></CompletedDialog>
      </Grid>
    </Box>
  )
}

