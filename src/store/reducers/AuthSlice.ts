import { AuthConfig } from '../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile, refreshAuth } from './ActionCreators';
import { initialAuthState } from '../initialState';
import { addAsyncBuilderCases } from '../utils';

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,

  reducers: {
    authorize(state: AuthConfig, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },

  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, fetchProfile, 'profile');

    builder
      .addCase(refreshAuth.fulfilled, (state: AuthConfig) => {
        state.isLogin = true;
        state.isLoginChecked = true;
      })

      .addCase(refreshAuth.rejected, (state: AuthConfig) => {
        state.isLogin = false;
        state.isLoginChecked = true;
      });
  },
});

export default authSlice.reducer;
