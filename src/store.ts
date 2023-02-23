import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './features/authSlice'
import settingsReducer from './features/settingsSlice'
import tasksReducer from './features/tasksSlice'
import appReducer from './features/appSlice'

import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth']
}   

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

const persistedReducer = (persistReducer(rootPersistConfig, rootReducer))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})  

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)