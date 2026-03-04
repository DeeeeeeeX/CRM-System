import { AppDispatch } from '../store';
import { getProfile } from '../../api/api';
import { authSlice } from './AuthSlice';

export const fetchProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.profileFetching());
    const response = await getProfile();
    dispatch(authSlice.actions.profileFetchingSuccess(response.data));
  } catch (e) {
    dispatch(authSlice.actions.profileFetchingError(e.message));
  }
};

export const setToken = (accessToken: string) => (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.setAccessToken(accessToken));
};
