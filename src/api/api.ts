import {
  ActiveTabs,
  AuthData,
  MetaResponse,
  Profile,
  Todo,
  TodoInfo,
  Token,
  User,
  UserFilters,
  UserMetaResponse,
  UserRegistration,
  UserRequest,
} from '../types/types';
import axios from 'axios';
import { logout, token } from '../functions/functions';

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

export async function getUsers(params?: UserFilters): Promise<UserMetaResponse<User>> {
  return await axiosInstance.get('/admin/users', {
    params: {
      search: params?.search,
      sortBy: params?.sortBy,
      sortOrder: params?.sortOrder,
      isBlocked: params?.isBlocked,
      limit: params?.limit,
      page: params?.page,
    },
  });
}

export async function blockUserById(id: number): Promise<UserMetaResponse<User>> {
  return await axiosInstance.post(`/admin/users/${id}/block`);
}

export async function unblockUserById(id: number): Promise<UserMetaResponse<User>> {
  return await axiosInstance.post(`/admin/users/${id}/unblock`);
}

export async function getUserById(id: number): Promise<UserMetaResponse<User>> {
  return await axiosInstance.get(`/admin/users/${id}`);
}

export async function deleteUserById(id: number): Promise<UserMetaResponse<User>> {
  return await axiosInstance.delete(`/admin/users/${id}`);
}

export async function changeRightsUserById(id: number, userData): Promise<UserMetaResponse<User>> {
  return await axiosInstance.post(`/admin/users/${id}/rights`, userData);
}

export async function editUser(
  id: string,
  userState: UserRequest,
): Promise<UserMetaResponse<User>> {
  return await axiosInstance.put(`/admin/users/${id}`, userState);
}

export async function sendRefreshToken(): Promise<Token> {
  const response = await axiosRefresh.post('auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  return response.data;
}

axiosInstance.interceptors.request.use((config) => {
  const accessToken = token.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosRefresh.interceptors.request.use((config) => {
  const accessToken = token.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: null | Promise<Token> = null;

const refreshInterceptor = async (error) => {
  const originalRequest = error.config;
  if (error.response?.status !== 401) return Promise.reject(error);

  if (originalRequest._retry) return Promise.reject(error);
  originalRequest._retry = true;

  if (!refreshPromise) {
    refreshPromise = sendRefreshToken().finally(() => {
      refreshPromise = null;
    });
  }

  try {
    const { accessToken, refreshToken } = await refreshPromise;
    token.setAccessToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

    return axiosInstance(originalRequest);
  } catch (e) {
    logout();
    return Promise.reject(e);
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return await refreshInterceptor(error);
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

export async function loginUser(authData: AuthData): Promise<Token> {
  const response = await axiosInstance.post('auth/signin', authData);
  return response.data;
}

export async function getProfile(): Promise<Profile> {
  const response = await axiosInstance.get('user/profile');
  return response.data;
}
