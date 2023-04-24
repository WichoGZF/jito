import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Register from 'components/navbar/LogIn/Register'
import Task from 'types/Task'
import Tag from 'types/Tag'
import Setting from 'types/Setting'
import HistoricTask from 'types/HistoricTask'

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
  historicTask: HistoricTask[],
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
  taskId: number,
  task: Task,
}
//Tag queries
interface TagPostInfo {
  userId: number,
  tag: Task,
}

interface TagUpdateInfo {
  userId: number,
  tagId: number,
  tag: Task,
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

// Define a service using a base URL and expected endpoints
export const pomodoroApi = createApi({
  reducerPath: 'pomodoroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
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
    getUserData: builder.query<CompleteData, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      })
    }),
    //TASK ENDPOINTS
    postTask: builder.mutation<void, TaskPostInfo>({
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
      query: (taskDeleteInfo) => ({
        url: `users/${taskDeleteInfo.userId}/tasks/${taskDeleteInfo.taskId}`,
        method: 'PUT',
        body: taskDeleteInfo.task
      }),
    }),
    //TAGS ENDPOINTS
    updateTag: builder.mutation<void, TagUpdateInfo>({
      query: (tagUpdateInfo) => ({
        url: `users/${tagUpdateInfo.userId}/tags/${tagUpdateInfo.tagId}`,
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
    postTag: builder.mutation<void, TagPostInfo>({
      query: (tagPostInfo) => ({
        url: `users/${tagPostInfo.userId}/tags/`,
        method: 'POST',
        body: tagPostInfo.tag
      }),
    }),
    //SETTINGS ENDPOINTS
    updateSettings: builder.mutation<void, SettingsUpdateInfo>({
      query: (settingsUpdateInfo) => ({
        url: `users/${settingsUpdateInfo.userId}/settings/`,
        method: 'PUT',
        body: settingsUpdateInfo.settings
      }),
    }),
    //HISTORIC TASK ENDPOINTS 
    postHistoricTask: builder.mutation<void, HistoricTaskInfo>({
      query: (historicTaskInfo) => ({
        url: `users/${historicTaskInfo.userId}/histasks/`,
        method: 'POST',
        body: historicTaskInfo.historicTask
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAuthenticateUserQuery, useRegisterUserMutation, useLazyGetUserDataQuery,
  usePostTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useUpdateTagMutation, useDeleteTagMutation, usePostTagMutation,
  useUpdateSettingsMutation, usePostHistoricTaskMutation } = pomodoroApi 