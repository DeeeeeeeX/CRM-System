import {ActiveTabs, AuthData, MetaResponse, Profile, Todo, TodoInfo, Token, UserRegistration} from '../types/types';
import axios from 'axios';
import {logout} from "../functions/functions";

const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosRefresh = axios.create({
  baseURL: 'https://easydev.club/api/v1/'
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use((response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken()
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError)
        logout()
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error)
  }
)

export async function getToDos(activeTab?: ActiveTabs): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axiosInstance.get('todos', {
    params: {
      filter: activeTab,
    },
  });
  return response.data;
}

export async function deleteToDo(id: number): Promise<void> {
  await axiosInstance.delete(`todos/${id}`);
}

export async function editToDo(id: number, taskState: Partial<Pick<Todo, 'title' | 'isDone'>>)
  : Promise<void> {
  await axiosInstance.put(`todos/${id}`, taskState);
}

export async function createToDo(title: string): Promise<void> {
  await axiosInstance.post('todos', {isDone: false, title});
}

export async function registerUser(regData: UserRegistration): Promise<void> {
  await axiosInstance.post('auth/signup', regData);
}

export async function loginUser(authData: AuthData): Promise<void> {
  const response = await axiosInstance.post('auth/signin', authData);
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('refreshToken', response.data.refreshToken)
}

export async function refreshToken(): Promise<Token> {
  const response = await axiosRefresh.post('auth/refresh',
    {refreshToken: localStorage.getItem('refreshToken')});
  const {accessToken, refreshToken} = response.data;
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem("refreshToken", refreshToken)
  return accessToken
}

export async function getProfile(): Promise<Profile> {
  return await axiosInstance.get('user/profile')
}
