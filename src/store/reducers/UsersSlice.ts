import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';
import { addAsyncBuilderCases } from '../utils';
import { UserFilters } from '../../types/types';
import { initialUsersState } from '../initialState';

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,

  reducers: {
    setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    addAsyncBuilderCases(builder, fetchUsers, 'allUsers');
  },
});

export default usersSlice.reducer;
