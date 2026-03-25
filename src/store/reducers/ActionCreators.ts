import { AppDispatch } from '../store';
import { editUser, getProfile, getUserById, getUsers, sendRefreshToken } from '../../api/api';
import { authSlice } from './AuthSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from '../../functions/functions';
import { UserFilters, UserRequest } from '../../types/types';

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await getProfile();
      return profile;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const isLogin = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.authorization(true));
};
export const isLogOut = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.authorization(false));
};

export const refreshAuth = createAsyncThunk('auth/refreshAuth', async (_, { rejectWithValue }) => {
  const refreshTokenValue = localStorage.getItem('refreshToken');
  if (!refreshTokenValue) return rejectWithValue('Refresh token missing');

  try {
    const { accessToken, refreshToken } = await sendRefreshToken();
    localStorage.setItem('refreshToken', refreshToken);
    token.setAccessToken(accessToken);
    return accessToken;
  } catch (e) {
    return rejectWithValue(e?.message || 'Error refreshing token');
  }
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: UserFilters = {}, { rejectWithValue }) => {
    try {
      const response = await getUsers(params);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUsers',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getUserById(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

interface editUserByIdArgs {
  id: string;
  userState: UserRequest;
}

export const editUserById = createAsyncThunk(
  'users/fetchUsers',
  async ({ id, userState }: editUserByIdArgs, { rejectWithValue }) => {
    try {
      const response = await editUser(id, userState);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
