import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://127.0.0.1:3000'

interface RegisterParams{
    username: string
    password: string 
    email: string
}

interface LoginParams{ 
    username: string 
    password: string
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, password, email }: RegisterParams, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axios.post(
                `${backendURL}/users`,
                { username, password, email },
                config
            )
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const validateUser = createAsyncThunk(
    'auth/validate',
    async ({ username, password}: LoginParams, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }
            const response = await axios.post(
                `${backendURL}/users:validate`,
                { username, password },
                config
            )
            console.log(response)

        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)