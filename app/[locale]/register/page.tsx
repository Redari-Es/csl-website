'use client';

import { useTranslation } from 'next-intl';
import { useState } from 'react';

export default function RegisterPage() {
  const t = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    // 在这里添加你的注册逻辑
    // 例如，发送请求到后端注册用户

    // 模拟注册成功
    setError(null);
    alert(t('registrationSuccess'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
      <div className="bg-gradient-to-br from-cyan-800 to-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">{t('register.title')}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white block mb-2">
              {t('email')}
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
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-transparent focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-white block mb-2">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded bg-transparent focus:border-cyan-400"
            />
          </div>
          {error && (
            <div className="bg-red-700 text-white p-3 rounded text-center">
              {error}
            </div>
          )}
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium p-2 rounded">
            {t('register')}
          </button>
        </form>
      </div>
    </div>
  );
}