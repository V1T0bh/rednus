import { apiRequest } from './config';

// Type definitions
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: any;
  // Add your auth response fields here
}

// Auth API functions
export async function signIn(data: SignInRequest): Promise<AuthResponse> {
  // TODO: Implement sign in API call
  // return apiRequest<AuthResponse>('/auth/signin', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
  throw new Error('Not implemented');
}

export async function signUp(data: SignUpRequest): Promise<AuthResponse> {
  // TODO: Implement sign up API call
  throw new Error('Not implemented');
}

export async function signOut(): Promise<void> {
  // TODO: Implement sign out API call
  throw new Error('Not implemented');
}

export async function getCurrentUser(): Promise<any> {
  // TODO: Implement get current user API call
  throw new Error('Not implemented');
}
