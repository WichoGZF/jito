import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'history',
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null 
            state.token = null 
        }
    }
})

export default authSlice.reducer 

