import { IAsyncParticle } from '../store/utils';

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

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber?: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

type AuthMode = 'register' | 'login';

export interface AuthConfig {
  isAuth: Record<AuthMode, boolean>;
  isLoginChecked: boolean;
  isLogin: boolean;
  error: string;
  profile: IAsyncParticle<Profile>;
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR';
