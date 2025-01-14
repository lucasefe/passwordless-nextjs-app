'use client';

import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  startPasswordlessAuth: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  const startPasswordlessAuth = async (email: string) => {
    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to start authentication');
      }

      setError(null);
    } catch (err) {
      setError('Failed to send verification code');
      throw err;
    }
  };

  const verifyCode = async (email: string, code: string) => {
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }

      setError(null);
    } catch (err) {
      setError('Invalid verification code');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ startPasswordlessAuth, verifyCode, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
