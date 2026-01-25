import { apiRequest } from './config';
import { setUser, clearUser } from '@/lib/auth';

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
  user: User;
}

// Auth API functions
export async function signIn(username: string, rememberMe: boolean): Promise<User> {
  const response = await apiRequest<any>('/signin', {
    method: 'POST',
    body: JSON.stringify({ User: username }),
  });
  
  // Backend returns capitalized field names (Go struct fields)
  const user = response.user;
  const userName = user.Name || user.name; // Support both cases
  
  // Store user in localStorage with TTL based on rememberMe
  setUser(userName, rememberMe);
  
  return {
    id: user.ID,
    name: userName,
    admin: user.Admin || false,
    createdAt: user.CreatedAt || '',
    updatedAt: user.UpdatedAt || '',
  };
}

export async function signOut(): Promise<void> {
  clearUser();
}

export async function getCurrentUser(): Promise<User | null> {
  // For this simple auth, we just check localStorage
  // The user data is stored client-side
  return null;
}
