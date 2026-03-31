import { store } from '../store/store';
import { authSlice } from '../store/reducers/AuthSlice';

export const removeRefreshToken = (): void => {
  localStorage.removeItem('refreshToken');
};

class TokenStorage {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }
}

export const token = new TokenStorage();

export const logout = () => {
  localStorage.removeItem('refreshToken');
  token.clearAccessToken();
  store.dispatch(authSlice.actions.authorize(false));
};
