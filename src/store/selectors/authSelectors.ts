import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectAuth = (state: RootState) => state.authReducer;

export const selectProfile = createSelector(selectAuth, (state) => state.profile);