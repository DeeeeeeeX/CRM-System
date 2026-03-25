import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUsers = (state: RootState) => state.usersReducer;

export const selectUsersData = createSelector(selectUsers, (state) => state.allUsers.data);
export const selectUsersStatus = createSelector(selectUsers, (state) => state.allUsers);
