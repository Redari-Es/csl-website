'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { themeColors } from '@/config/themeConfig';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'zh', name: '中文', flag: '🇨🇳' },
	{ code: 'ja', name: '日本語', flag: '🇯🇵' },
	{ code: 'ko', name: '한국어', flag: '🇰🇷' },
	// { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSwitcherProps {
	mobile?: boolean;
	isDarkTheme?: boolean;
}

export default function LanguageSwitcher({
	mobile = false,
	isDarkTheme = false
}: LanguageSwitcherProps) {
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light'];
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const currentLanguage = languages.find(l => l.code === locale);

	const changeLanguage = (newLocale: string) => {
		const segments = pathname.split('/');
		// 如果路径没有语言前缀（即路径以'/'开头），则添加默认语言前缀（例如 'en'）
		if (segments.length < 2 || segments[1].length !== 2) {
			segments.splice(1, 0, newLocale);
		} else {
			// 替换现有的语言前缀
			segments[1] = newLocale;
		}
		const newPathname = segments.join('/');
		router.push(newPathname);
	};

	// 通用样式类
	const triggerClass = cn(
		"p-2 transition-colors",
		isDarkTheme
			? "text-cyan-400 hover:text-cyan-200 hover:bg-cyan-400/10"
			: "text-sky-600 hover:text-sky-700 hover:bg-sky-100"
	);

	const contentClass = cn(
		"min-w-[150px] rounded-md py-1 shadow-lg",
		isDarkTheme
			? "bg-[#0a0e17] border border-cyan-400/30"
			: "bg-white border border-sky-200"
	);

	const itemClass = (active: boolean) => cn(
		"px-4 py-2 text-sm flex items-center gap-3 cursor-pointer transition-colors",
		isDarkTheme
			? active
				? "bg-cyan-400/10 text-cyan-200"
				: "text-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200"
			: active
				? "bg-sky-50 text-sky-700"
				: "text-sky-600 hover:bg-sky-100 hover:text-sky-700"
	);

	if (mobile) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"p-2",
							isDarkTheme
								? "text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
								: "text-sky-600 hover:bg-sky-100 hover:text-sky-700"
						)}
					>
						<Globe className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className={contentClass}
					sideOffset={5}
				>
					{languages.map((lang) => (
						<DropdownMenuItem
							key={lang.code}
							onClick={() => changeLanguage(lang.code)}
							className={itemClass(locale === lang.code)}
						>
							<span className="text-lg">{lang.flag}</span>
							<span>{lang.name}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"p-2",
						isDarkTheme
							? "text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
							: "text-sky-600 hover:bg-sky-100 hover:text-sky-700"
					)}
				>
					<Globe className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className={contentClass}
				sideOffset={5}
			>
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => changeLanguage(lang.code)}
						className={itemClass(locale === lang.code)}
					>
						<span className="text-lg">{lang.flag}</span>
						<span>{lang.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
