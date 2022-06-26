import { mockTasks } from '../mock.js'

import { createSlice } from '@reduxjs/toolkit'
import { Splitscreen } from '@mui/icons-material';
import { sliderClasses } from '@mui/material';

const initialState = mockTasks;

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { task } = action.payload
            state.tasks.tasks.append(
                {
                    ...task,
                    id: nextTodoId(state.tasks.tasks)
                })
        },
        editTask: (state, action) => {
            const { index, task } = action.payload
            state.tasks.tasks[index] = task
        },
        updateTime: (state, action) => {
            const { index, time } = action.payload
            state.tasks.tasks[index].time += time
        },
        deleteTask: (state, action) => {
            /*state.tasks[action.payload.tag].forEach(
                (task, index)=>{
                    if(task.id === action.payload.id){
                        state.tasks[action.payload.tag].splice(index, 1)
                    }
                }
            )
            */
            const { index } = action.payload
            state.tasks.tasks.splice(index, 1)
        },
        completeTask: (state, action) => {
            const { finishedTask, index } = action.payload
            state.tasks.history.append(finishedTask)
            tasksSlice.caseReducers.deleteTask(state, { index: index })
        },
        reorderTask: (state, action) => {
            //index hover, index drag
            const { hoverIndex, dragIndex } = action.payload
            let taskHolder;
            taskHolder = state.tasks.tasks[hoverIndex]
            state.tasks.tasks[hoverIndex] = state.tasks.tasks[dragIndex]
            state.tasks.tasks[dragIndex] = taskHolder
        },
        changeTag: (state, action) => {
            const { index, newTag } = action.payload
            state.tasks.tasks[index].tag = newTag
        },
        deleteTag: (state, action) => {
            const tagToDelete = action.payload

            delete state.tasks.tags.splice(tagToDelete, 1)
        },

        addTag: (state, action) => {
            const newTagName = action.payload
            state.tasks.tags.push(newTagName)
        },
        changeTagName: (state, action) => {
            const { tagToChange, newTagName } = action.payload

            for(const [index, tag] of state.tasks.tags.entries()){
                if(tag === tagToChange) {
                    state.tasks.tags[index] = newTagName; 
                    break;
                }
            }

            state.tasks.tasks.forEach( (task, index) => {
                if(task.tag === tagToChange){
                    state.tasks.tasks[index] = newTagName;
                }
            })
        },
        addCompleted: (state, action) => {
            state.tasks.history.append(
                action.payload
            )
        },
        changeTagColor: (state, action) => {
            const [tagToChange, color] = action
            state.tasks.tags.forEach((tag, index) => {
                if(tag.name === tagToChange){
                    state.tasks.tags[index].color = color
                }
            })
        }
    }
})

export default tasksSlice.reducer