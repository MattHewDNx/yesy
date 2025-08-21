// src/services/api.ts
const BASE_URL = 'http://localhost:5000/api';

// --- ADD INTERFACES FOR TYPE SAFETY ---
interface AuthFormData {
  name?: string;
  email: string;
  password?: string;
}
interface AuthResponse {
  token: string;
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const api = {
  login: async (formData: AuthFormData): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
  
  // --- ADD THIS FUNCTION ---
  register: async (formData: AuthFormData): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },
};