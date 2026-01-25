import { getUsername } from '@/lib/auth';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function for API requests
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  
  // Get username from auth storage and add to headers (client-side only)
  const authHeaders: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    const username = getUsername();
    if (username) {
      authHeaders['X-Username'] = username;
    }
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...authHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${response.statusText}`);
  }

  return response.json();
}
