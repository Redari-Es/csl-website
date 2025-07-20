'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { themeColors } from '@/config/themeConfig'

interface SearchBarProps {
	placeholder: string;
	searchOpen: boolean;
	setSearchOpen: (open: boolean) => void;
	searchValue: string;
	setSearchValue: (value: string) => void;
	isDarkTheme: boolean;
}

export default function SearchBar({
	placeholder,
	searchOpen,
	setSearchOpen,
	searchValue,
	setSearchValue,
	isDarkTheme
}: SearchBarProps) {
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light']
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (searchOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [searchOpen]);

	return (
		<>
			{/* 桌面端搜索框 - 保持不变 */}
			<div className="hidden md:block ml-4 relative transition-all duration-300">
				{searchOpen ? (
					<div className={`flex items-center rounded-lg border overflow-hidden transition-all duration-300 w-48 md:w-56 shadow-sm ${isDarkTheme
						? 'bg-[#0e1523] border-cyan-400/30'
						: 'bg-sky-50 border-sky-200'
						}`}>
						<input
							ref={searchInputRef}
							type="text"
							placeholder={placeholder}
							className={`w-full pl-3 py-2 text-sm focus:outline-none bg-transparent ${isDarkTheme
								? 'text-cyan-300 placeholder:text-cyan-500'
								: 'text-sky-700 placeholder:text-sky-400'
								}`}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							autoFocus
						/>
						<Button
							variant="ghost"
							size="icon"
							className={isDarkTheme
								? 'text-cyan-500 hover:bg-cyan-400/10'
								: 'text-sky-500 hover:bg-sky-100'
							}
							onClick={() => setSearchOpen(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				) : (
					<Button
						variant="ghost"
						size="icon"
						className={isDarkTheme
							? 'text-cyan-400 hover:bg-cyan-400/10'
							: 'text-sky-600 hover:bg-sky-100'
						}
						onClick={() => setSearchOpen(true)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</Button>
				)}
			</div>

			{/* 移动端搜索按钮 - 只显示图标 */}
			<div className="md:hidden ml-2">
				<Button
					variant="ghost"
					size="icon"
					className={isDarkTheme
						? 'text-cyan-400 hover:bg-cyan-400/10'
						: 'text-sky-600 hover:bg-sky-100'
					}
					onClick={() => setSearchOpen(true)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</Button>
			</div>
		</>
	);
}
