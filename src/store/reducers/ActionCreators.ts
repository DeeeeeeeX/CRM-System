import { AppDispatch, RootState } from '../store';
import { editUser, getProfile, getUserById, getUsers, sendRefreshToken } from '../../api/api';
import { authSlice } from './AuthSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearTokens, token } from '../../functions/workWithTokens';
import { UserFilters, UserRequest } from '../../types/types';
import { usersSlice } from './UsersSlice';

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

export const authorize = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.authorize(true));
};
export const unauthorize = () => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.authorize(false));
};

export const refreshAuth = createAsyncThunk(
  'auth/refreshAuth',
  async (_, { rejectWithValue, dispatch }) => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) return rejectWithValue('Refresh token missing');

    try {
      const { accessToken, refreshToken } = await sendRefreshToken();
      localStorage.setItem('refreshToken', refreshToken);
      token.setAccessToken(accessToken);
      return accessToken;
    } catch (e) {
      clearTokens();
      dispatch(authSlice.actions.authorize(false));
      return rejectWithValue(e?.message || 'Error refreshing token');
    }
  },
);

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    {
      try {
        const state = getState() as RootState;
        const filters = state.usersReducer.filters;
        const response = await getUsers(filters);
        return response.data;
      } catch (e) {
        return rejectWithValue(e.message);
      }
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

export const setFiltersAndFetchUsers = (filters: UserFilters) => (dispatch: AppDispatch) => {
  dispatch(usersSlice.actions.setFilters(filters));
  dispatch(fetchUsers());
};
