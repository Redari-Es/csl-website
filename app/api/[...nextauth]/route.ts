// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				try {
					// 实际验证逻辑应该替换这里
					// 示例：调用你的API或数据库验证
					const user = await authenticateUser(
						credentials?.email,
						credentials?.password
					);

					return user ? {
						id: user.id,
						name: user.name,
						email: user.email,
						// 可以添加更多需要存储在session中的字段
					} : null;

				} catch (error) {
					console.error('Authentication error:', error);
					return null;
				}
			}
		})
	],
	pages: {
		signIn: '/login', // 注意：移除了[locale]，需配合国际化调整
		error: '/login/error'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				// 可以添加其他需要传递到session的字段
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			// 可以添加其他session字段
			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
// app/api/auth/[...nextauth]/route.ts
export async function GET() {
	return new Response('Auth disabled', { status: 200 });
}

export async function POST() {
	return new Response('Auth disabled', { status: 200 });
}

