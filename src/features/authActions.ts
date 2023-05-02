import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://127.0.0.1:3000'
const clientURL = 'http://127.0.0.1:8000'

interface RegisterParams {
    username: string
    password: string
    email: string
}

interface LoginParams {
    username: string
    password: string
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, password, email }: RegisterParams, { rejectWithValue }) => {
        try {
            const data: RequestInit = {
                method: "POST",
                credentials: 'include',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': clientURL
                },
                body: JSON.stringify(
                    {
                        username: username,
                        password: password,
                        email: email
                    }
                )
            }
            const response = await fetch(`${backendURL}/users`, data)
            if (response.ok) {
                const userId = await response.text()
                const parsedUserid = userId.replace('"', '');
                return parseInt(parsedUserid)
            }
            else {
                const data = await response.text()
                throw new Error(data)
            }

        } catch (error: any) {
            let newErrorMessage = error.message.trim()
            let clientError = ""
            if (newErrorMessage === "models: duplicate email") {
                clientError = "Email already in use"
            }
            else if (newErrorMessage === "models: duplicate username") {
                clientError = "Username already in use"
            }
            else{ 
                clientError = "Error registering"
            }
            return rejectWithValue(clientError)
        }
    }
)

export const validateUser = createAsyncThunk(
    'auth/validate',
    async ({ username, password }: LoginParams, { rejectWithValue }) => {
        try {
            const data: RequestInit = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': clientURL
                },
                body: JSON.stringify(
                    {
                        username: username,
                        password: password,
                    }
                )
            }
            const response = await fetch(`${backendURL}/users:validate`, data)
            if (response.ok) {
                const userId = await response.text()
                const parsedUserid = userId.replace('"', '');
                return parseInt(parsedUserid)
            }
            else {
                const data = await response.text()
                throw new Error(data)
            }
        } catch (error: any) {
            let errorMessage:string = "Incorrect username or password"
            return rejectWithValue(errorMessage)
        }
    }
)