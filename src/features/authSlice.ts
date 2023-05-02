import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { registerUser, validateUser } from './authActions'

type User = number

type AuthState = {
    hasSession: boolean
    userid: number | null
    registerLoading: boolean
    registerError: boolean
    registerErrorMessage: string
    registerSuccess: boolean
    loginLoading: boolean
    loginError: boolean
    loginErrorMessage: string
    loginSuccess: boolean
}

const initialState: AuthState = {
    hasSession: false, userid: null, registerLoading: false, registerError: false, registerErrorMessage: '', registerSuccess: false
    , loginLoading: false, loginError: false, loginErrorMessage: '', loginSuccess: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logoutSession: (state) => {
            state.hasSession = false
            state.userid = null 
            state.registerLoading = false 
            state.registerError = false 
            state.registerErrorMessage = ''
            state.registerSuccess = false 
            state.loginLoading = false
            state.loginError = false 
            state.loginErrorMessage = ''
            state.loginSuccess = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.registerLoading = true
            state.loginSuccess = false
            state.loginError = false
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.registerLoading = false
            state.registerSuccess = true // registration successful
            state.hasSession = true
            state.userid = action.payload
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            const errorMessage = action.payload as string
            state.registerErrorMessage = errorMessage
            state.registerLoading = false
            state.registerError = true
        })
        builder.addCase(validateUser.pending, (state, action) => {
            state.loginLoading = true
            state.loginSuccess = false
            state.loginError = false
        })
        builder.addCase(validateUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loginSuccess = true
            state.loginLoading = false
            state.hasSession = true
            state.userid = action.payload
        })
        builder.addCase(validateUser.rejected, (state, action) => {
            const errorMessage = action.payload as string
            state.loginErrorMessage = errorMessage
            state.loginLoading = false
            state.loginError = true
        })
    }
})

export const { logoutSession } = authSlice.actions
export default authSlice.reducer