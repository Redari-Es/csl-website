'use client';

import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { themeColors } from '@/config/themeConfig'


export default function ThemeToggle({ isDarkTheme }: { isDarkTheme: boolean }) {
	const { theme, setTheme } = useTheme();
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light']

	return (
		<Button
			variant="ghost"
			size="icon"
			className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{theme === 'dark' ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
			<span className="sr-only">切换主题</span>
		</Button>
	);
}
