import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { registerUser, validateUser } from './authActions'

type User = number

type AuthState = {
    hasSession: boolean
    registerLoading: boolean
    registerError: boolean
    registerSuccess: boolean
    loginLoading: boolean
    loginError: boolean
    loginSuccess: boolean
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        hasSession: false, registerLoading: false, registerError: false, registerSuccess: false
        , loginLoading: false, loginError: false, loginSuccess: false
    } as AuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.registerLoading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.registerLoading = false
            state.registerSuccess = true // registration successful
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.registerLoading = false
            state.registerError = true
        })
        builder.addCase(validateUser.pending, (state, action) => {
            state.loginLoading = false
            state.loginError = true
        })
        builder.addCase(validateUser.fulfilled, (state, action) => {
            state.loginLoading = false
            state.loginError = true
        })
        builder.addCase(validateUser.rejected, (state, action) => {
            state.loginLoading = false
            state.loginError = true
        })
    }
})

export default authSlice.reducer