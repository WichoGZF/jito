import { mockTasks } from '../mock'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import Task from '../types/Task'
import Tag from '../types/Tag'
import HistoricTask from '../types/HistoricTask'

type StateType = {
    tasks: Task[],
    tags: Tag[],
    history: HistoricTask[]
};


const initialState: StateType = mockTasks;

function nextTodoId(todos: any) {
    const maxId = todos.reduce((maxId: any, todo: any) => Math.max(todo.id, maxId), -1)
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
            reducer(state, action: PayloadAction<Task>) {
                const task = action.payload
                state.tasks.push(
                    {
                        ...task,
                        completed: false,
                        id: nextTodoId(state.tasks)
                    })
            },
            prepare(task: Task) {
                return {
                    payload: task
                }
            }
        },
        //Edit given task that matches ID

        editTask: {
            reducer(state, action: PayloadAction<{ task: Task, index: number }>) {
                const { task, index } = action.payload
                state.tasks[index] = task
            },
            prepare(task: Task, index: number) {
                return {
                    payload: {
                        task: task,
                        index: index,
                    }
                }
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const index = action.payload
            console.log('Deleting tag number: ', index, action.payload, action)
            state.tasks.splice(index, 1)
        },
        addTimeEntry: {
            reducer(state, action: PayloadAction<HistoricTask>) {
                const completedEntry = action.payload
                state.history.push(completedEntry)
            },
            prepare(date:string, time:number, tag:string) {
                return {
                    payload: {
                        id: 0,
                        completeDate: date,
                        time: time,
                        tag: tag,
                    }
                }
            }

        },
        reorderTask: {
            reducer(state, action: PayloadAction<{ targetIndex: number, sourceIndex: number, position: string }>) {
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
            prepare(hoverIndex: number, dragIndex: number, position: string) {
                return {
                    payload: {
                        targetIndex: hoverIndex,
                        sourceIndex: dragIndex,
                        position: position
                    }
                }
            }
        },
        addTag: (state, action: PayloadAction<Tag>) => {
            const newTagName = action.payload
            state.tags.unshift(newTagName)
        },
        deleteTag: (state, action: PayloadAction<string>) => {
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
            reducer(state, action: PayloadAction<{ tagToChange: string, newTagName: string }>) {
                const { tagToChange, newTagName } = action.payload

                const tagToChangeIndex = state.tags.findIndex((tag) => {
                    return (tag.name === tagToChange)
                })

                state.tags[tagToChangeIndex].name = newTagName

                state.tasks.forEach((task, index) => {
                    if (task.tag === tagToChange) {
                        state.tasks[index].tag = newTagName;
                    }
                })
            },
            prepare(tagToChange: string, newTagName: string) {
                return {
                    payload: {
                        tagToChange,
                        newTagName
                    }
                }
            }
        },
        changeTagColor: {
            reducer(state, action: PayloadAction<{ tagToChange: string, color: string }>) {
                const { tagToChange, color } = action.payload

                const tagToChangeIndex = state.tags.findIndex((tag) => {
                    return (tag.name === tagToChange)
                })
                state.tags[tagToChangeIndex].color = color
            },
            prepare(tagToChange: string, color: string) {
                return {
                    payload: {
                        tagToChange,
                        color
                    }
                }
            },

        },
        updateBlocks: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const repeat = state.tasks[index].repeat
            if (state.tasks[index].type === 'block') {
                if (state.tasks[index].blocks === 1) {
                    if (repeat !== "no-repeat") {
                        state.tasks[index].completed = true
                        state.tasks[index].blocks = state.tasks[index].defaultBlocks
                    }
                    else {
                        state.tasks.splice(index, 1)
                    }
                }
                else {
                    state.tasks[index].blocks! -= 1
                }
            }
            else { //Is normal
                state.tasks[index].blocks! += 1
            }
        },
        restartTask: (state, action: PayloadAction<number[]>) => {
            const indexes = action.payload;
            indexes.forEach((taskIndex) => {
                state.tasks[taskIndex].completed = false;
                state.tasks[taskIndex].blocks = state.tasks[taskIndex].defaultBlocks
            })
        },
        completeTask: (state, action: PayloadAction<number>) => { //For normal task
            const index = action.payload

            if (state.tasks[index].repeat === 'no-repeat') {
                state.tasks.splice(index, 1)
            }
            else {
                state.tasks[index].completed = true
            }
        },
        updateDates: (state, action: PayloadAction<number[]>) => {
            //where action.payload is an array of task's ids to be updated to today's date.
            console.log('updating dates:', action.payload)
            const tasksToUpdate = action.payload

            tasksToUpdate.forEach((taskId) => {
                const taskIndex = state.tasks.findIndex((task) => task.id === taskId)
                console.log(taskIndex)
                state.tasks[taskIndex].date = format(new Date, 'MM/dd/yyyy')
                console.log('updating dates TaskId: ', taskId, 'TaskIndex', taskIndex);
            })
        },
        //Delete due receives an array containing the indexes, then it makes another array with
        //id values and uses it to find the indexes to delete. 
        deleteDue: (state, action: PayloadAction<number[]>) => {
            const tasksToDelete = action.payload
            console.log('deleting dates', tasksToDelete)
            tasksToDelete.forEach((taskId) => {
                const taskIndex = state.tasks.findIndex((task) => task.id === taskId)
                console.log('deleting dates TaskId: ', taskId, 'TaskIndex', taskIndex);
                state.tasks.splice(taskIndex, 1)
            })
        },
        updateTaskSlice: (state, action: PayloadAction<StateType>) => {
            state.history = action.payload.history
            state.tasks = action.payload.tasks
            state.tags = action.payload.tags
        }
    }
})

export const { addTask, editTask, deleteTask, addTimeEntry, reorderTask,
    addTag, deleteTag, changeTagName, changeTagColor, updateBlocks,
    restartTask, completeTask, updateDates, deleteDue, updateTaskSlice } = tasksSlice.actions
export default tasksSlice.reducer