// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/api.service'; 
import { AuthService } from '../services/auth/auth.service';

type AuthContextType = {
  isAuthenticated: boolean;
  userId: number | null;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isLoggedIn());
  const [userId, setUserId] = useState<number | null>(AuthService.getUserId());
  const [userRole, setUserRole] = useState<string | null>(AuthService.getUserRole());

  // Handle login via API using the apiService
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiService.request<{ email: string; password: string }, { isAuthenticated: boolean; userId: number; userRole: string }>(
        'api/Login', // Your login endpoint
        'POST',
        { email, password }
      );

      if (data.isAuthenticated) {
        AuthService.setAuth(data); // Store the user data in local storage or session
        setIsAuthenticated(true);
        setUserId(data.userId);
        setUserRole(data.userRole);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  // Handle logout by clearing local storage/session
  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUserId(null);
    setUserRole(null);
  };

  const isAdmin = userRole === 'admin'; // Check if the user is an admin

  useEffect(() => {
    // Optional: handle session restore
    const auth = AuthService.getAuth();
    if (auth?.isAuthenticated) {
      setIsAuthenticated(true);
      setUserId(auth.userId);
      setUserRole(auth.userRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userRole, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
