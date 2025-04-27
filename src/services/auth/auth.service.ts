// src/services/AuthService.ts
import { apiService } from './../api.service'; // Import the generic apiService

type AuthData = {
  isAuthenticated: boolean;
  userId: number;
  userRole: string;
};

const AUTH_KEY = 'auth';

export const AuthService = {
  // Save auth data to localStorage
  setAuth(data: AuthData) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  },

  // Get auth data from localStorage
  getAuth(): AuthData | null {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Check if user is authenticated
  isLoggedIn(): boolean {
    const data = this.getAuth();
    return data?.isAuthenticated ?? false;
  },

  // Get user ID
  getUserId(): number | null {
    const data = this.getAuth();
    return data?.userId ?? null;
  },

  // Get user role
  getUserRole(): string | null {
    const data = this.getAuth();
    return data?.userRole ?? null;
  },

  // Clear auth data
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  // Login method that calls apiService with request and response types
  async login(username: string, password: string): Promise<boolean> {
    const requestData = { username, password };  // Request body for login

    try {
      const response = await apiService.request<{ username: string; password: string }, AuthData>(
        'api/Login',
        'POST',
        requestData
      );

      if (response.isAuthenticated) {
        this.setAuth(response);  // Save auth data to localStorage
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
};
