import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';
import { addAsyncBuilderCases } from '../utils';
import { AuthConfig } from '../../types/types';
import { initialUsersState } from '../initialState';

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,

  reducers: {
    authorization(state: AuthConfig, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },

  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, fetchUsers, 'allUsers');
  },
});

export default usersSlice.reducer;
