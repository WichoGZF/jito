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
            state.tasks.append(
                {
                    ...task,
                    id: nextTodoId(state.tasks)
                })
        },
        editTask: (state, action) => {
            const { index, task } = action.payload
            state.tasks[index] = task
        },
        updateTime: (state, action) => {
            const { index, time } = action.payload
            state.tasks[index].time += time
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
            state.tasks.splice(index, 1)
        },
        completeTask: (state, action) => {
            const { finishedTask, index } = action.payload
            state.history.append(finishedTask)
            tasksSlice.caseReducers.deleteTask(state, { index: index })
        },
        reorderTask: (state, action) => {
            //index hover, index drag
            const { hoverIndex, dragIndex } = action.payload
            let taskHolder;
            taskHolder = state.tasks[hoverIndex]
            state.tasks[hoverIndex] = state.tasks[dragIndex]
            state.tasks[dragIndex] = taskHolder
        },
        addTag: (state, action) => {
            const newTagName = action.payload
            state.tags.unshift(newTagName)
        },
        deleteTag: (state, action) => {
            const tagToDelete = action.payload

            state.tags.splice(tagToDelete, 1)
        },

        changeTagName: {
            reducer(state, action) {
                const { tagToChange, newTagName } = action.payload

                const tagToChangeIndex = state.tags.findIndex((tag) => {
                    return (tag.name === tagToChange)
                })

                state.tags[tagToChangeIndex].name = newTagName

                state.tasks.forEach((task, index) => {
                    if (task.tag === tagToChange) {
                        state.tasks[index] = newTagName;
                    }
                })
            },
            prepare(tagToChange, newTagName) {
                return {
                    payload: {
                        tagToChange,
                        newTagName
                    }
                }
            }
        },
        changeTagColor: {
            reducer(state, action) {
                const [tagToChange, color] = action
                state.tasks.tags.forEach((tag, index) => {
                    if (tag.name === tagToChange) {
                        state.tasks.tags[index].color = color
                    }
                })
            },
            prepare(tagToChange, color) {
                return {
                    payload: {
                        tagToChange,
                        color
                    }
                }
            }
        }
    }
})

export const { addTask, editTask, deleteTask, completeTask, reorderTask,
    addTag, deleteTag, changeTagName, changeTagColor } = tasksSlice.actions
export default tasksSlice.reducer