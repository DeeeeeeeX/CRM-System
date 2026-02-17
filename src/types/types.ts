export type ActiveTabs = 'all' | 'inWork' | 'completed' | null;

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
}

export type FetchFunc = (tabTask?: ActiveTabs) => Promise<void>;
export type FieldType = {
  taskInput?: string;
  title?: string;
  task?: string;
};

interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

interface AuthData {
  login: string;
  password: string;
}

interface RefreshToken {
  refreshToken: string;
}

interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

interface PasswordRequest {
  password: string;
}

interface Token {
  accessToken: string
  refreshToken: string
}

type Role = ADMIN | USER | MODERATOR
