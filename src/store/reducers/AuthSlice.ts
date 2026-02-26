import {AuthConfig, Profile} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AuthConfig = {
  isAuth: {register: false, login: true},
  word: {register: 'register', login: 'login'},
  isLoading: false,
  error: '',
  profile: {
    id: 0,
    username: 'failed loading',
    email: 'failed loading...',
    date: 'failed loading',
    isBlocked: false,
    roles: ['USER', 'ADMIN', 'MODERATOR'],
    phoneNumber: 'failed loading...'
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    profileFetching(state: AuthConfig) {
      state.isLoading = true
    },
    profileFetchingSuccess(state: AuthConfig, action: PayloadAction<Profile>) {
      state.isLoading = false
      state.error = ''
      state.profile = action.payload
    },
    profileFetchingError(state: AuthConfig, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default authSlice.reducer