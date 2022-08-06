import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './features/authSlice.js'
import settingsReducer from './features/settingsSlice.js'
import tasksReducer from './features/tasksSlice.js'
import appReducer from './features/appSlice.js'

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

const appPersistConfig = {
    key: 'app', 
    storage: storageSession,
}

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    tasks: tasksReducer,
    app: persistReducer(appPersistConfig, appReducer)
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

export const persistor = persistStore(store)