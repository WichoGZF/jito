import {configureStore} from '@reduxjs/toolkit'

import authReducer from './features/authSlice.js'
import settingsReducer from './features/settingsSlice.js'
import tasksReducer from './features/tasksSlice.js'

export default configureStore({
    reducer: {
        auth: authReducer,
        settings: settingsReducer,
        tasks: tasksReducer
    },
}) 