import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Register from 'components/navbar/LogIn/Register'
import Task from 'types/Task'
import Tag from 'types/Tag'
import Setting from 'types/Setting'
import HistoricTask from 'types/HistoricTask'
import { batch } from 'react-redux'

//Types related to API calls.
type userID = number
interface LoginInfo {
  username: string,
  password: string,
}
interface RegisterInfo {
  email: string,
  username: string,
  password: string,
}

interface CompleteData {
  settings: Setting,
  tasks: Task[],
  tags: Tag[],
  history: HistoricTask[],
}
//Task query
interface TaskPostInfo {
  userId: number,
  task: Task
}

interface TaskDeleteInfo {
  userId: number,
  taskId: number,
}

interface TaskUpdateInfo {
  userId: number,
  task: Task,
}
//Tag queries
interface TagPostInfo {
  userId: number,
  tag: Tag,
}

interface TagUpdateInfo {
  userId: number,
  tag: Tag,
}

interface TagDeleteInfo {
  userId: number,
  tagId: number,
}

//Settings queries

interface HistoricTaskInfo {
  userId: number,
  historicTask: HistoricTask
}

interface SettingsUpdateInfo {
  userId: number,
  settings: Setting
}

interface BatchInitializeInfo {
  userId: number,
  date: string,
  deleteIds: number[],
  updateIds: number[]
}

interface BatchRestartInfo {
  userId: number,
  restartIds: number[]
}

const clientURL = 'http://localhost:8000'
// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'pomodoroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/', credentials: "include", headers: { 'Origin': clientURL } }),
  endpoints: (builder) => ({
    //USER ENDPOINTS
    authenticateUser: builder.query<void, LoginInfo>({
      query: (loginInfo) => ({
        url: 'users:authenticate',
        method: 'POST',
        body: loginInfo
      }),
    }),
    registerUser: builder.mutation<number, RegisterInfo>({
      query: (registerInfo) => ({
        url: `users`,
        method: 'POST',
        body: registerInfo
      })
    }),
    //Terminates session.
    disconnectUser: builder.mutation<void, void>({
      query: () => ({
        url: `users:terminate`,
        method: 'POST',
      })
    }),
    getUserData: builder.query<CompleteData, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
        credentials: "include"
      })
    }),
    //TASK ENDPOINTS
    postTask: builder.mutation<number, TaskPostInfo>({
      query: (taskPostInfo) => ({
        url: `users/${taskPostInfo.userId}/tasks`,
        method: 'POST',
        body: taskPostInfo.task
      })
    }),
    deleteTask: builder.mutation<void, TaskDeleteInfo>({
      query: (taskDeleteInfo) => ({
        url: `users/${taskDeleteInfo.userId}/tasks/${taskDeleteInfo.taskId}`,
        method: 'DELETE',
      })
    }),
    updateTask: builder.mutation<void, TaskUpdateInfo>({
      query: (taskUpdateInfo) => ({
        url: `users/${taskUpdateInfo.userId}/tasks/${taskUpdateInfo.task.id}`,
        method: 'PUT',
        body: taskUpdateInfo.task
      }),
    }),
    //TAGS ENDPOINTS
    updateTag: builder.mutation<void, TagUpdateInfo>({
      query: (tagUpdateInfo) => ({
        url: `users/${tagUpdateInfo.userId}/tags/${tagUpdateInfo.tag.id}`,
        method: 'PUT',
        body: tagUpdateInfo.tag
      }),
    }),
    deleteTag: builder.mutation<void, TagDeleteInfo>({
      query: (tagDeleteInfo) => ({
        url: `users/${tagDeleteInfo.userId}/tags/${tagDeleteInfo.tagId}`,
        method: 'DELETE',
      }),
    }),
    postTag: builder.mutation<number, TagPostInfo>({
      query: (tagPostInfo) => ({
        url: `users/${tagPostInfo.userId}/tags`,
        method: 'POST',
        body: tagPostInfo.tag
      }),
    }),
    //SETTINGS ENDPOINTS
    updateSettings: builder.mutation<void, SettingsUpdateInfo>({
      query: (settingsUpdateInfo) => ({
        url: `users/${settingsUpdateInfo.userId}/settings`,
        method: 'PUT',
        body: settingsUpdateInfo.settings
      }),
    }),
    //HISTORIC TASK ENDPOINTS 
    postHistoricTask: builder.mutation<number, HistoricTaskInfo>({
      query: (historicTaskInfo) => ({
        url: `users/${historicTaskInfo.userId}/histasks`,
        method: 'POST',
        body: historicTaskInfo.historicTask
      }),
    }),
    postBatchInitialize: builder.mutation<void, BatchInitializeInfo>({
      query: (batchInitializeInfo) => ({
        url: `users/${batchInitializeInfo.userId}/tasks:batchInitialize`,
        method: 'POST',
        body: batchInitializeInfo
      }),
    }),
    postBatchRestart: builder.mutation<void, BatchRestartInfo>({
      query: (batchRestartInfo) => ({
        url: `users/${batchRestartInfo.userId}/tasks:batchRestart`,
        method: 'POST',
        body: batchRestartInfo
      }),
    }),
  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetUserDataQuery,
  usePostTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useUpdateTagMutation, useDeleteTagMutation, usePostTagMutation,
  useUpdateSettingsMutation, usePostHistoricTaskMutation, usePostBatchInitializeMutation, usePostBatchRestartMutation, useDisconnectUserMutation,
} = apiSlice 
