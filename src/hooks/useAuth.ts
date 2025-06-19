'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored token on component mount
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setAuthState(prev => ({
        ...prev,
        accessToken: storedToken,
        user: JSON.parse(storedUser),
        isLoading: false,
        isAuthenticated: true,
      }));
    } else {
      setAuthState(prev => ({
        ...prev,
        accessToken: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      setAuthState({
        user: data.user,
        accessToken: data.accessToken,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true, data };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false,
        isAuthenticated: false 
      }));
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setAuthState({
      user: null,
      accessToken: null,
      isLoading: false,
      isAuthenticated: false,
    });

    // Redirect to login page
    router.push('/login');
  }, [router]);

  // Check if token is expired
  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed');
      }

      localStorage.setItem('accessToken', data.accessToken);
      
      setAuthState(prev => ({
        ...prev,
        accessToken: data.accessToken,
      }));

      return data.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  }, [logout]);

  // Get valid token (refresh if needed)
  const getValidToken = useCallback(async (): Promise<string | null> => {
    const { accessToken } = authState;
    
    if (!accessToken) {
      return null;
    }

    if (isTokenExpired(accessToken)) {
      return await refreshToken();
    }

    return accessToken;
  }, [authState, isTokenExpired, refreshToken]);

  // Protected API call function
  const apiCall = useCallback(async (url: string, options: RequestInit = {}) => {
    const token = await getValidToken();
    
    if (!token) {
      throw new Error('No valid token available');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }, [getValidToken]);

  return {
    ...authState,
    login,
    logout,
    refreshToken,
    getValidToken,
    apiCall,
  };
}; 