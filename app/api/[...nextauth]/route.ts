// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { handlers } from '@/config/auth';

export const { GET, POST } = handlers;
export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				// 这里应该是你的用户验证逻辑
				// 例如，查询数据库或调用API验证用户
				// 这里只是一个示例
				if (credentials?.email === 'user@example.com' && credentials?.password === 'password') {
					return { id: '1', name: 'John Doe', email: credentials.email };
				}
				return null;
			}
		})
	],
	pages: {
		signIn: '/[locale]/login',
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
