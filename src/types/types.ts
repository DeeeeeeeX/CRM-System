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

export type FieldType = {
  taskInput?: string;
  title?: string;
  task?: string;
};

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

export interface RefreshToken {
  refreshToken: string;
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

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  page?: number; // страницу
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

// Интерфейс метаинформации

export interface UserMetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

export interface UserRolesRequest {
  roles: Roles[];
}

export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}
