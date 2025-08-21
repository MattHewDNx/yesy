// src/context/AuthContext.tsx
import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react'; // Import ReactNode as a type

// Define the shape of the context data
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider component that will wrap our entire app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, _setToken] = useState(localStorage.getItem('token'));

  // Create a function that both updates state AND localStorage
  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to make using the context easier
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};