import { apiRequest, apiConfig } from './config';
import { setUser, clearUser, getToken } from '@/lib/auth';

// Type definitions
export interface User {
  id: number;
  name: string;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
  message: string;
  token: string;
  user: User;
}

// Auth API functions
export async function signIn(username: string, password: string, rememberMe: boolean): Promise<User> {
  const response = await apiRequest<any>('/signin', {
    method: 'POST',
    body: JSON.stringify({ User: username, Password: password }),
  });
  
  const user = response.user;
  const token = response.token;
  const userName = user.Name || user.name;
  const isAdmin = user.Admin || false;
  
  // Store user + token in localStorage
  setUser(userName, token, rememberMe, isAdmin);
  
  return {
    id: user.ID,
    name: userName,
    admin: isAdmin,
    createdAt: user.CreatedAt || '',
    updatedAt: user.UpdatedAt || '',
  };
}

export async function signUp(username: string, password: string, rememberMe: boolean): Promise<User> {
  const response = await apiRequest<any>('/signup', {
    method: 'POST',
    body: JSON.stringify({ User: username, Password: password }),
  });
  
  const user = response.user;
  const token = response.token;
  const userName = user.Name || user.name;
  const isAdmin = user.Admin || false;
  
  // Store user + token in localStorage
  setUser(userName, token, rememberMe, isAdmin);
  
  return {
    id: user.ID,
    name: userName,
    admin: isAdmin,
    createdAt: user.CreatedAt || '',
    updatedAt: user.UpdatedAt || '',
  };
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  await fetch(`${apiConfig.baseURL}/users/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      CurrentPassword: currentPassword, 
      NewPassword: newPassword 
    }),
  }).then(async (res) => {
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to change password');
    }
  });
}

export async function signOut(): Promise<void> {
  clearUser();
}

export async function getCurrentUser(): Promise<User | null> {
  return null;
}
