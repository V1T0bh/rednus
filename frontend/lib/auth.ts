'use client';

import { useState, useEffect, useCallback } from 'react';

// TTL in milliseconds (30 minutes)
const SESSION_TTL = 30 * 60 * 1000;

export interface AuthUser {
  username: string;
  expiresAt: number | null; // null means "remember me" (no expiry)
}

const AUTH_STORAGE_KEY = 'rednus_auth_user';

// Get user from localStorage
export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const user: AuthUser = JSON.parse(stored);
    
    // Check if session has expired (only if expiresAt is set)
    if (user.expiresAt !== null && Date.now() > user.expiresAt) {
      clearUser();
      return null;
    }
    
    return user;
  } catch {
    return null;
  }
}

// Get just the username (convenience function)
export function getUsername(): string | null {
  const user = getUser();
  return user?.username || null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getUser() !== null;
}

// Set user in localStorage
export function setUser(username: string, rememberMe: boolean): void {
  if (typeof window === 'undefined') return;
  
  const user: AuthUser = {
    username: username.toLowerCase(),
    expiresAt: rememberMe ? null : Date.now() + SESSION_TTL,
  };
  
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

// Clear user from localStorage
export function clearUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

// React hook for auth state
export function useAuth() {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth state on mount and set up expiry check
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getUser();
      setUserState(currentUser);
      setIsLoading(false);
    };

    checkAuth();

    // Check for expiry every minute
    const interval = setInterval(checkAuth, 60 * 1000);
    
    // Listen for storage changes (e.g., logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) {
        checkAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = useCallback((username: string, rememberMe: boolean) => {
    setUser(username, rememberMe);
    setUserState(getUser());
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUserState(null);
  }, []);

  return {
    user,
    username: user?.username || null,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
  };
}
