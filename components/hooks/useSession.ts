// hooks/useSession.ts
import { useState, useEffect } from 'react';
import { parseCookies, setCookie } from 'cookies-next';
import { Session } from 'next-session';

const useSession = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const cookies = parseCookies();
			const sessionId = cookies.sessionId;

			if (!sessionId) {
				// 创建新的 session
				const newSessionId = Date.now().toString();
				setCookie('sessionId', newSessionId, { maxAge: 7 * 24 * 60 * 60 });

				const mockSession = {
					id: newSessionId,
					user: null,
					expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
				};

				setSession(mockSession);
				setLoading(false);
			} else {
				// 模拟从后端获取 session
				const mockSession = {
					id: sessionId,
					user: { name: 'John Doe', email: 'john@example.com' },
					expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
				};

				setSession(mockSession);
				setLoading(false);
			}
		};

		fetchSession();
	}, []);

	return { session, loading };
};

export default useSession;
