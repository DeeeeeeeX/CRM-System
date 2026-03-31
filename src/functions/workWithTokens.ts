import { store } from '../store/store';
import { authSlice } from '../store/reducers/AuthSlice';

export const removeRefreshToken = (): void => {
  localStorage.removeItem('refreshToken');
};

const createTokenStorage = () => {
  let accessToken: string | null = null;

  return {
    getAccessToken() {
      return accessToken;
    },
    setAccessToken(token: string | null) {
      accessToken = token;
    },
    clearAccessToken() {
      accessToken = null;
    },
  };
};

export const token = createTokenStorage();

export const logout = () => {
  localStorage.removeItem('refreshToken');
  token.clearAccessToken();
  store.dispatch(authSlice.actions.authorize(false));
};
