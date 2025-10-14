const ACCESS_TOKEN_KEY = "accessToken";

export const AuthStorage = {
  setToken(token: string) {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {}
  },

  getToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  clear() {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch {}
  },
};
