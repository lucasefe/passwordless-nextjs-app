
'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const { verifyCode, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyCode(email, code);
      // Redirect to dashboard or home page after successful verification
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-center text-3xl font-bold">Verify Code</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}
