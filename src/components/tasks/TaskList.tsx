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

import { useAppSelector } from 'hooks/useAppSelector'
import {useAppDispatch} from 'hooks/useAppDispatch'
import Tag from 'types/Tag';
import { isBefore } from 'date-fns';
import useInitializeTasks from 'hooks/useInitializeTasks';

export default function TaskList() {
  const dispatch = useAppDispatch()

  const tasks = useAppSelector(state => state.tasks.tasks)
  const tags = useAppSelector(state => state.tasks.tags)
  const calendarDate = useAppSelector(state => state.app.calendarDate)
  const initializedDate = useAppSelector(state => state.app.initialized)
  const todayDate = useAppSelector(state => state.app.todayDate)

  const initialized = initializedDate === todayDate

  const [overdueNormals] = useInitializeTasks(tasks, initialized)

  function taskToListEntry(task: Task, firstTask: boolean, index: number) {
    return (
      <ListEntry
        key={task.tag + task.id}
        id = {task.id}
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
        completed={task.completed}
      ></ListEntry>
    )
  }
  const splitCalendarDate = calendarDate.split('/')
  const [month, calendarDay, year] = splitCalendarDate
  const realCalendarDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(calendarDay))
  const dayOfTheWeek = realCalendarDate.getDay();

  let allTagTasks: any[] = [] //React array
  // For overDue normals dialog  //
  let firstTaskIndex: number
  let firstTaskTag: string
  let firstTaskType: 'normal' | 'block'
  //
  //Loop for mapping tasks into components to show.
  let firstTaskAdded = false
  tasks.forEach((task, index) => {

    if (task.repeat === 'no-repeat') {
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

  //Dispatches the information about the current tag to appSlice.
  useEffect(() => {
    if (allTagTasks.length) {
      dispatch(currentTag(firstTaskTag));
      dispatch(currentIndex(firstTaskIndex));
      dispatch(currentType(firstTaskType));
    }
  })

  return (
    <Box key={'tasklist-box'}>
      <Typography variant="overline" color="text.primary" sx={{ pl: 1 }}>Scheduled tasks</Typography>
      <Grid >
        <Divider key="divider"></Divider>
        <NewTask key="newTask"></NewTask>
        {allTagTasks}
        <OverdueTaskList key="overdues" open={!initialized && !!overdueNormals.length} tasks={overdueNormals}></OverdueTaskList>
        <CompletedDialog key="completed"></CompletedDialog>
      </Grid>
    </Box>
  )
}

