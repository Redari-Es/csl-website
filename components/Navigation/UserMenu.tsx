import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { themeColors } from '@/config/themeConfig'

export default function UserMenu({ isDarkTheme }: { isDarkTheme: boolean }) {
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light'];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setUserMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={userMenuRef}>
			<Button
				variant="ghost"
				size="icon"
				className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
				onClick={() => setUserMenuOpen(!userMenuOpen)}
			>
				<User className="h-5 w-5" />
			</Button>

			{userMenuOpen && (
				<div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden ${isDarkTheme
					? 'bg-[#0a0e17] border border-cyan-400/30'
					: 'bg-white border border-sky-200'
					}`}>
					{loggedIn ? (
						<>
							<div className={`px-4 py-3 border-b ${isDarkTheme ? 'border-cyan-400/20' : 'border-sky-100'
								}`}>
								<p className={`text-sm font-medium ${isDarkTheme ? 'text-cyan-300' : 'text-sky-700'
									}`}>john.doe@example.com</p>
								<p className={`text-xs mt-1 ${isDarkTheme ? 'text-cyan-400' : 'text-sky-500'
									}`}>Premium Account</p>
							</div>
							<Link
								href="/profile"
								className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
								onClick={() => setUserMenuOpen(false)}
							>
								My Profile
							</Link>
							<Link
								href="/orders"
								className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
								onClick={() => setUserMenuOpen(false)}
							>
								My Orders
							</Link>
							<Link
								href="/settings"
								className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
								onClick={() => setUserMenuOpen(false)}
							>
								Settings
							</Link>
							<div className={`border-t ${isDarkTheme ? 'border-cyan-400/20' : 'border-sky-100'
								}`}>
								<button
									className={`w-full text-left px-4 py-2 text-sm ${isDarkTheme
										? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300'
										: 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
										}`}
									onClick={() => {
										setLoggedIn(false);
										setUserMenuOpen(false);
									}}
								>
									Sign Out
								</button>
							</div>
						</>
					) : (
						<>
							<Link
								href="/login"
								className={`block px-4 py-3 text-sm font-medium ${isDarkTheme
									? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 border-b border-cyan-400/20'
									: 'text-sky-600 hover:bg-sky-50 hover:text-sky-700 border-b border-sky-100'
									}`}
								onClick={() => setUserMenuOpen(false)}
							>
								Sign In
							</Link>
							<Link
								href="/register"
								className={`block px-4 py-3 text-sm ${isDarkTheme
									? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300'
									: 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
									}`}
								onClick={() => setUserMenuOpen(false)}
							>
								Create Account
							</Link>
						</>
					)}
				</div>
			)}
		</div>
	);
}
