'use client';

import {
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import BreathingIndicator from './BreathingIndicator';
import { NavItemType } from '../types/navigation';
import { Link } from '@/i18n/navigation';
import { useEffect, useRef, useState } from 'react';
import { themeColors } from '@/config/themeConfig';

interface NavItemProps {
	item: NavItemType;
	pathname: string;
	isDarkTheme: boolean;
	setMobileMenuOpen: (open: boolean) => void;
	activeMenu: string | null;
	navT: any;
}

export default function NavItem({
	item,
	pathname,
	isDarkTheme,
	setMobileMenuOpen,
	activeMenu,
	navT
}: NavItemProps) {
	const isActiveItem = pathname === item.href ||
		(item.hasSubItems && pathname.startsWith(item.href));
	const [isOpen, setIsOpen] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light'];
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleOpenChange = (open: boolean) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (open) {
			setIsOpen(true);
		} else {
			timeoutRef.current = setTimeout(() => {
				setIsOpen(false);
			}, 300);
		}
	};

	return (
		<NavigationMenuItem
			onMouseEnter={() => item.hasSubItems && handleOpenChange(true)}
			onMouseLeave={() => item.hasSubItems && handleOpenChange(false)}
		>
			{item.hasSubItems ? (
				<>
					<NavigationMenuTrigger
						className={cn(
							"group text-sm font-medium px-3 py-2 h-10",
							"bg-transparent hover:bg-transparent",
							"data-[state=open]:bg-transparent",
							"relative",
							isActiveItem
								? themeStyle.textPrimary
								: `${themeStyle.textSecondary} hover:${themeStyle.textHover}`
						)}
						onPointerMove={() => handleOpenChange(true)}
						onPointerLeave={() => handleOpenChange(false)}
					>
						<span className="relative flex items-center">
							{item.name}
							{isActiveItem && <BreathingIndicator isDarkTheme={isDarkTheme} />}
						</span>
						{isActiveItem && (
							<div className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${themeStyle.accent}`}></div>
						)}
					</NavigationMenuTrigger>

					{/* 横向排列并居中显示 */}
					<NavigationMenuContent
						ref={contentRef}
						className={cn(
							"w-screen max-w-[100vw] rounded-none overflow-hidden transition-all duration-300", `${themeStyle.menuBg} backdrop-blur-lg border-t ${themeStyle.border} shadow-lg`
						)}
						style={{
							transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
							opacity: isOpen ? 1 : 0,
							pointerEvents: isOpen ? 'auto' : 'none'
						}}
						onMouseEnter={() => handleOpenChange(true)}
						onMouseLeave={() => handleOpenChange(false)}
					>
						<div className="w-full h-fit p-4">
							{/* 横向滚动容器 - 居中显示 */}
							<div className={cn(
								"flex justify-center", // 居中显示
								"overflow-x-auto pb-2 scrollbar-hide", // 横向滚动并隐藏滚动条
								"scrollbar-thin", // 添加自定义滚动条样式
								isDarkTheme
									? "scrollbar-thumb-cyan-400/50 scrollbar-track-cyan-400/10"
									: "scrollbar-thumb-sky-300 scrollbar-track-sky-100",
								"gap-4" // 卡片间距
							)}>
								{item.subItems?.map((subItem, index) => {
									const isActiveSubItem = pathname === subItem.href;

									return (
										<div
											key={index}
											className={cn(
												"flex-shrink-0 w-[240px] min-h-[180px]", // 更紧凑的尺寸
												"md:w-[260px] md:min-h-[200px]" // 桌面端稍大尺寸
											)}
										>
											<Link
												href={subItem.href}
												className={cn(
													"block p-4 rounded-lg transition-all w-full h-full flex flex-col group",
													isDarkTheme
														? "bg-[#0e1523]/70 hover:bg-[#0e1523]/90 backdrop-blur-sm"
														: "bg-white/90 hover:bg-white backdrop-blur-sm",
													isActiveSubItem
														? `ring-2 ${themeStyle.accent}`
														: `border ${isDarkTheme ? 'border-cyan-400/30' : 'border-sky-200'}`)}
												onClick={() => setMobileMenuOpen(false)}
											>
												<div className="flex items-start justify-between">
													<h3 className={cn(
														"font-medium text-sm flex items-center", // 字体变小
														isActiveSubItem
															? themeStyle.textPrimary
															: `${isDarkTheme ? 'text-cyan-300 group-hover:text-cyan-100' : 'text-sky-600 group-hover:text-sky-800'}`)}>
														{/* 添加下划线效果 */}
														<span className="relative pb-1">
															{subItem.name}
															<span className={cn(
																"absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300",
																isDarkTheme
																	? "bg-cyan-400 group-hover:w-full"
																	: "bg-sky-500 group-hover:w-full"
															)}></span>
														</span>
														{isActiveSubItem && <BreathingIndicator isDarkTheme={isDarkTheme} />}
													</h3>

													<div className={cn(
														"text-xs px-2 py-1 rounded flex-shrink-0 ml-2",
														isDarkTheme
															? "bg-cyan-400/20 text-cyan-300"
															: "bg-sky-100 text-sky-600"
													)}>
														{index + 1}/{item.subItems?.length}
													</div>
												</div>

												{subItem.description && (
													<p className={cn(
														"text-xs mt-2 line-clamp-3 flex-grow", // 字体变小
														isActiveSubItem
															? themeStyle.textPrimary
															: isDarkTheme ? "text-cyan-400/80" : "text-sky-500"
													)}>
														{subItem.description}
													</p>
												)}

												<div className={cn(
													"mt-3 flex items-center text-xs", // 字体变小
													isDarkTheme ? "text-cyan-400" : "text-sky-500"
												)}>
													<span>
														{navT?.('learnMore') || 'Learn more'}
													</span>
													<svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
													</svg>
												</div>
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</NavigationMenuContent>
				</>
			) : (
				<NavigationMenuLink
					href={item.href}
					className={cn(
						"group text-sm font-medium px-3 py-2 h-10 relative",
						"bg-transparent hover:bg-transparent",
						isActiveItem
							? themeStyle.textPrimary
							: `${themeStyle.textSecondary} hover:${themeStyle.textHover}`)}
					onClick={() => setMobileMenuOpen(false)}
				>
					<span className="relative flex items-center">
						{item.name}
						{isActiveItem && <BreathingIndicator isDarkTheme={isDarkTheme} />}
					</span>
					{isActiveItem && (
						<div className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${themeStyle.accent}`}></div>
					)}
				</NavigationMenuLink>

			)}
		</NavigationMenuItem>
	);
}
