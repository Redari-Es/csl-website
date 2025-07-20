'use client';

import { useTranslation } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const t = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = '/[locale]/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
      <div className="bg-gradient-to-br from-cyan-800 to-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">{t('login.title')}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white block mb-2">
              {t('login.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-transparent focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white block mb-2">
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-transparent focus:border-cyan-400"
            />
          </div>
          {error && (
            <div className="bg-red-700 text-white p-3 rounded text-center">
              {error}
            </div>
          )}
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium p-2 rounded">
            {t('login.signIn')}
          </button>
        </form>
      </div>
    </div>
  );
}