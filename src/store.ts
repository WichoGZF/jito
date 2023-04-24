import { configureStore, combineReducers } from '@reduxjs/toolkit'

import settingsReducer from './features/settingsSlice'
import tasksReducer from './features/tasksSlice'
import appReducer from './features/appSlice'

import { apiSlice } from 'features/api/apiSlice'


const rootReducer = combineReducers({
    settings: settingsReducer,
    tasks: tasksReducer,
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
})  

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch