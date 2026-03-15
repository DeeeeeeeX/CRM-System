import { AppDispatch } from '../store';
import { getProfile, sendRefreshToken } from '../../api/api';
import { authSlice } from './AuthSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from '../../functions/functions';

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
