import { useAppSelector } from "./useAppSelector"
import { useAppDispatch } from "./useAppDispatch"
import { updateSettings } from "features/settingsSlice"
import { updateTaskSlice } from "features/tasksSlice"
import { useLazyGetUserDataQuery } from "features/api/apiSlice"
import {useEffect} from 'react'
import { useCookies } from "react-cookie"

/* 
Fetches the backend data if the session cookie exists (user is logged in). On reject or lack of cookie assumes user is NOT logged in. 
*/ 

export default function useGetUserData(){
    const dispatch = useAppDispatch();
    const hasSession = useAppSelector(state => state.auth.hasSession)
    const userid = useAppSelector(state => state.auth.userid)
    
    const [getUserData, result] = useLazyGetUserDataQuery()
    const [cookies, setCookie] = useCookies(['userId'])

    // If the user has a session cookie, fetch the data from the backend

    useEffect(() => {
      if (hasSession && (userid !== null)) {
        getUserData(userid)
      }else if (cookies.userId){
        if(typeof(cookies.userId) === "string" && cookies.userId !== undefined)
        getUserData(parseInt(cookies.userId))
      }
    
    }, [hasSession])
    
    useEffect(() => {
      if (result.data) {
        dispatch(updateSettings(result.data.settings))
        dispatch(updateTaskSlice({
          tasks: result.data.tasks,
          tags: result.data.tags,
          history: result.data.history
        }))
      }
    }, [result])
}


