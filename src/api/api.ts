import {
  ActiveTabs,
  AuthData,
  MetaResponse,
  Profile,
  Todo,
  TodoInfo,
  UserRegistration,
} from '../types/types';
import axios from 'axios';
import { store } from '../store/store';
import { setToken } from '../store/reducers/ActionCreators';
import { logout } from '../functions/functions';

const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosRefresh = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().authReducer.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: null | Promise<string> = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    try {
      if (!refreshPromise) {
        refreshPromise = refreshToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newAccessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (e) {
      logout();
      return Promise.reject(e);
    }
  },
);

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

export async function editToDo(
  id: number,
  taskState: Partial<Pick<Todo, 'title' | 'isDone'>>,
): Promise<void> {
  await axiosInstance.put(`todos/${id}`, taskState);
}

export async function createToDo(title: string): Promise<void> {
  await axiosInstance.post('todos', { isDone: false, title });
}

export async function registerUser(regData: UserRegistration): Promise<void> {
  await axiosInstance.post('auth/signup', regData);
}

export async function loginUser(authData: AuthData): Promise<void> {
  const response = await axiosInstance.post('auth/signin', authData);
  store.dispatch(setToken(response.data.accessToken));
  localStorage.setItem('refreshToken', response.data.refreshToken);
}

export async function refreshToken(): Promise<string> {
  const response = await axiosRefresh.post('auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem('refreshToken', refreshToken);
  store.dispatch(setToken(accessToken));
  return accessToken;
}

export async function getProfile(): Promise<Profile> {
  return await axiosInstance.get('user/profile');
}
