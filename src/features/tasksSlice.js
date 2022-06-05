import mockTasks from './mock.js'

import {createSlice} from '@reduxjs/toolkit'

const initialState = mockTasks;

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        
    }
})