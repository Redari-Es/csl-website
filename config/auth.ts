// @/config/auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// 创建 NextAuth 实例
const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

// 导出 NextAuth 实例的处理函数、signIn、signOut 和 auth 函数
export { handlers, signIn, signOut, auth };