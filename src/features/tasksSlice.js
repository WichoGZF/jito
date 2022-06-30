import { mockTasks } from '../mock.js'

import { createSlice } from '@reduxjs/toolkit'
import { NestCamWiredStandTwoTone, Splitscreen } from '@mui/icons-material';
import { sliderClasses } from '@mui/material';
import { format } from 'date-fns'

const initialState = mockTasks;

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: {
            reducer(state, action) {
                const task = action.payload
                state.tasks.push(
                    {
                        ...task,
                        id: nextTodoId(state.tasks)
                    })
            },
            prepare(task) {
                return {
                    payload: task
                }
            }
        },
        editTask: {
            reducer(state, action) {
                const { task, index } = action.payload
                state.tasks[index] = task
            },
            prepare(task, index) {
                return {
                    payload: {
                        task: task,
                        index: index,
                    }
                }
            }
        },
        deleteTask: {
            reducer(state, action) {
                const { index } = action.payload
                state.tasks.splice(index, 1)
            },
            prepare(index) {
                return {
                    payload: {
                        index: index
                    }
                }
            }
        },
        addTimeEntry: {
            reducer(state, action) {
                const completedEntry = action.payload
                state.history.push(completedEntry)
            },
            prepare(time, tag) {
                return {
                    payload: {
                        completeDate: format(new Date(), 'MM/dd/yyyy'),
                        time: time,
                        tag: tag,
                    }
                }
            }

        },
        reorderTask: {
            reducer(state, action) { 
                const {targetIndex, sourceIndex, position} = action.payload

                //Add task to desired position
                if(position === 'above'){
                    state.tasks.splice(targetIndex, 0, state.tasks[sourceIndex])
                }
                else{//POSITION BELOW
                    state.tasks.splice(targetIndex+1, 0, state.tasks[sourceIndex])
                }
                //Delete added task from original position
                if(sourceIndex > targetIndex){
                    state.tasks.splice(sourceIndex+1, 1)
                }
                else if (targetIndex > sourceIndex){
                    state.tasks.splice(sourceIndex, 1)
                }

            },
            prepare(hoverIndex, dragIndex, position){
                return{
                    payload:{
                        targetIndex: hoverIndex, 
                        sourceIndex: dragIndex,
                        position: position
                    }
                }
            }
        },
        addTag: (state, action) => {
            const newTagName = action.payload
            state.tags.unshift(newTagName)
        },
        deleteTag: (state, action) => {
            const tagToDelete = action.payload
            
            const tagToChangeIndex = state.tags.findIndex((tag) => {
                return (tag.name === tagToDelete)
            })

            state.tags.splice(tagToChangeIndex, 1)

            state.tasks.forEach((task, index) => {
                if (task.tag === tagToDelete) {
                    state.tasks.splice(index, 1)
                }
            })

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
                const { tagToChange, color } = action.payload

                const tagToChangeIndex = state.tags.findIndex((tag) => {
                    return (tag.name === tagToChange)
                })
                state.tags[tagToChangeIndex].color = color
            },
            prepare(tagToChange, color) {
                return {
                    payload: {
                        tagToChange,
                        color
                    }
                }
            },

        },
        updateBlocks:(state, action) => {
            const index = action.payload;
            if(state.tasks[index].type === 'block'){
                if(state.tasks[index].blocks === 1){
                    tasksSlice.caseReducers.deleteTask(index)
                }
                else{
                    state.tasks[index].blocks-=1
                }
            }
            else{ //Is normal
                state.tasks[index].blocks+= 1
            }
        },
        completeTask: (state, action) => {
            const {index, time} = action.payload

            const tag = state.tasks[index].tag;

            tasksSlice.caseReducers.addTimeEntry(time, tag)

            tasksSlice.caseReducers.deleteTask(index)
        }
    }
})

export const { addTask, editTask, deleteTask, addTimeEntry, reorderTask,
    addTag, deleteTag, changeTagName, changeTagColor, updateBlocks, completeTask } = tasksSlice.actions
export default tasksSlice.reducer