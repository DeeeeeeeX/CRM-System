import { AppDispatch } from '../store';
import { getProfile, sendRefreshToken } from '../../api/api';
import { authSlice } from './AuthSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { token } from '../../functions/workWithTokens';

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

export const refreshAuth = createAsyncThunk('auth/refreshAuth', async (_, { rejectWithValue }) => {
  const refreshTokenValue = localStorage.getItem('refreshToken');
  if (!refreshTokenValue) return rejectWithValue('Refresh workWithTokens missing');

  try {
    const { accessToken, refreshToken } = await sendRefreshToken();
    localStorage.setItem('refreshToken', refreshToken);
    token.setAccessToken(accessToken);
    return accessToken;
  } catch (e) {
    return rejectWithValue(e?.message || 'Error refreshing workWithTokens');
  }
});
