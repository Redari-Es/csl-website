// providers/SessionProvider.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { parseCookies, setCookie } from 'cookies-next';
import { Session } from 'next-session';

interface SessionProviderProps {
	children: React.ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
	const [session, setSession] = useState<Session | null>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 模拟获取 session 的函数
	const fetchSession = async () => {
		const cookies = parseCookies();
		const sessionId = cookies.sessionId;

		// 模拟从后端获取 session
		const mockSession = {
			id: sessionId || Date.now().toString(),
			user: {
				name: 'John Doe',
				email: 'john@example.com'
			},
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
		};

		setCookie('sessionId', mockSession.id, { maxAge: 7 * 24 * 60 * 60 });
		setSession(mockSession);
	};

	useEffect(() => {
		fetchSession();
	}, [pathname]);

	return (
		<div>{children}</div>
	);
}
