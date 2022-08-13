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

//Optimization
/*
Complete time s

*/
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
                        completed: false,
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
        deleteTask: (state, action) => {
            const index = action.payload
            state.tasks.splice(index, 1)
        },
        addTimeEntry: {
            reducer(state, action) {
                const completedEntry = action.payload
                state.history.push(completedEntry)
            },
            prepare(date, time, tag) {
                return {
                    payload: {
                        completeDate: date,
                        time: time,
                        tag: tag,
                    }
                }
            }

        },
        reorderTask: {
            reducer(state, action) {
                const { targetIndex, sourceIndex, position } = action.payload

                //Add task to desired position
                if (position === 'above') {
                    state.tasks.splice(targetIndex, 0, state.tasks[sourceIndex])
                }
                else {//POSITION BELOW
                    state.tasks.splice(targetIndex + 1, 0, state.tasks[sourceIndex])
                }
                //Delete added task from original position
                if (sourceIndex > targetIndex) {
                    state.tasks.splice(sourceIndex + 1, 1)
                }
                else if (targetIndex > sourceIndex) {
                    state.tasks.splice(sourceIndex, 1)
                }

            },
            prepare(hoverIndex, dragIndex, position) {
                return {
                    payload: {
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
        updateBlocks: (state, action) => {
            const index = action.payload;
            const repeat = state.tasks[index].repeat
            if (state.tasks[index].type === 'block') {
                if (state.tasks[index].blocks === 1) {
                    if (repeat !== "false") {
                        state.tasks[index].completed = true
                        state.tasks[index].blocks = state.tasks[index].defaultBlocks
                    }
                    else {
                        tasksSlice.caseReducers.deleteTask(state, index)
                    }
                }
                else {
                    state.tasks[index].blocks -= 1
                }
            }
            else { //Is normal
                state.tasks[index].blocks += 1
            }
        },
        restartTask: (state, action) => {
            const indexes = action.payload;
            indexes.forEach((taskIndex)=> {
                state.tasks[taskIndex].completed = false;
                state.tasks[taskIndex].blocks = state.tasks[taskIndex].defaultBlocks
            })
        },
        completeTask: (state, action) => { //For normal task
            const  index = action.payload

            if (state.tasks[index].repeat === 'false') {
                tasksSlice.caseReducers.deleteTask(state, index)
            }
            else {
                state.tasks[index].completed = true
            }
        },
        updateDates: (state, action) => {
            //where action.payload is an array of tasks to be updated to today's date.
            console.log('updating dates:', action.payload)
            const tasksToUpdate = action.payload
            tasksToUpdate.forEach((taskIndex) => {
                state.tasks[taskIndex].date = format(new Date, 'MM/dd/yyyy')
            })
        },
        //Delete due receives an array containing the indexes, then it makes another array with
        //id values and uses it to find the indexes to delete. 
        deleteDue: (state, action) => {
            const tasksToDelete = action.payload

            const idArray = tasksToDelete.map( (index) => {
                return(state.tasks[index].id)
            })

            console.log(idArray)

            idArray.forEach((taskId) => {
                const taskIndex = state.tasks.findIndex( (task) => task.id === taskId)
                console.log(taskIndex)
                tasksSlice.caseReducers.deleteTask(state, taskIndex)
            })
        }
    }
})

export const { addTask, editTask, deleteTask, addTimeEntry, reorderTask,
    addTag, deleteTag, changeTagName, changeTagColor, updateBlocks,
    restartTask, completeTask, updateDates, deleteDue } = tasksSlice.actions
export default tasksSlice.reducer