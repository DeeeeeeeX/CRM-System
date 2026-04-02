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

export const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  token.clearAccessToken();
};
