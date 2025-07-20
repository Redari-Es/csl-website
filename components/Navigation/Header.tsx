'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import { NavItemType } from '../types/navigation';
import { themeColors } from './themeConfig';

export default function Header() {
	const globalT = useTranslations('global');
	const navT = useTranslations('navigation');
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [activeMenu, setActiveMenu] = useState<string | null>(null);
	const [hidden, setHidden] = useState(false);
	const [searchExpanded, setSearchExpanded] = useState(false);
	const lastScrollY = useRef(0);

	// 设置默认主题为dark
	useEffect(() => {
		if (!theme || (theme !== 'dark' && theme !== 'light')) {
			setTheme('dark');
		}
	}, [theme, setTheme]);

	// 获取当前主题样式
	const isDarkTheme = theme === 'dark';
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light'];

	// 导航项数据
	const navItems: NavItemType[] = [
		{
			key: 'home',
			name: navT('home'),
			href: '/',
			hasSubItems: false
		},
		{
			key: 'products',
			name: navT('products.title'),
			href: '/products',
			hasSubItems: true,
			subItems: [
				{
					name: navT('products.powerSupplies'),
					href: '/products/power-supplies',
					description: navT('products.powerSuppliesDesc')
				},
				{
					name: navT('products.rfAmplifiers'),
					href: '/products/rf-amplifiers',
					description: navT('products.rfAmplifiersDesc')
				},
				{
					name: navT('products.testEquipment'),
					href: '/products/test-equipment',
					description: navT('products.testEquipmentDesc')
				},
				{
					name: navT('products.components'),
					href: '/products/components',
					description: navT('products.componentsDesc')
				},
				{
					name: navT('products.customSolutions'),
					href: '/products/custom-solutions',
					description: navT('products.customSolutionsDesc')
				}
			]
		},
		{
			key: 'solutions',
			name: navT('solutions.title'),
			href: '/solutions',
			hasSubItems: true,
			subItems: [
				{
					name: navT('solutions.industrialAutomation'),
					href: '/solutions/industrial-automation',
					description: navT('solutions.industrialAutomationDesc')
				},
				{
					name: navT('solutions.telecomInfrastructure'),
					href: '/solutions/telecom-infrastructure',
					description: navT('solutions.telecomInfrastructureDesc')
				},
				{
					name: navT('solutions.medicalDevices'),
					href: '/solutions/medical-devices',
					description: navT('solutions.medicalDevicesDesc')
				},
				{
					name: navT('solutions.defenseSystems'),
					href: '/solutions/defense-systems',
					description: navT('solutions.defenseSystemsDesc')
				}
			]
		},
		{
			key: 'cases',
			name: navT('cases.title'),
			href: '/cases',
			hasSubItems: true,
			subItems: [
				{
					name: navT('cases.caseStudy1'),
					href: '/cases/5g-base-station',
					description: navT('cases.caseStudy1Desc')
				},
				{
					name: navT('cases.caseStudy2'),
					href: '/cases/military-radar',
					description: navT('cases.caseStudy2Desc')
				},
				{
					name: navT('cases.caseStudy3'),
					href: '/cases/medical-imaging',
					description: navT('cases.caseStudy3Desc')
				}
			]
		},
		{
			key: 'support',
			name: navT('support.title'),
			href: '/support',
			hasSubItems: true,
			subItems: [
				{ name: navT('support.faq'), href: '/support/faq' },
				{ name: navT('support.docs'), href: '/support/docs' },
				{ name: navT('support.contactSupport'), href: '/support/contact' }
			]
		},
		{
			key: 'about',
			name: navT('about'),
			href: '/about',
			hasSubItems: false
		},
		{
			key: 'contact',
			name: navT('contact'),
			href: '/contact',
			hasSubItems: false
		}
	];

	// 滚动隐藏效果
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > 100) {
				if (currentScrollY > lastScrollY.current && !searchOpen) {
					setHidden(true);
				} else {
					setHidden(false);
				}
			}

			if (currentScrollY <= 10) {
				setScrolled(false);
				setHidden(false);
			} else {
				setScrolled(true);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [searchOpen]);

	// 搜索区域展开效果
	useEffect(() => {
		if (searchOpen) {
			setSearchExpanded(true);
		} else {
			setSearchExpanded(false);
		}
	}, [searchOpen]);

	// 关闭移动菜单时重置搜索状态
	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
		setSearchOpen(false);
	};

	return (
		<header
			className={`sticky top-0 z-50 transition-transform duration-300 ${hidden ? 'transform -translate-y-full' : 'transform translate-y-0'
				} ${themeStyle.background} border-b ${themeStyle.border}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16 p-4">
					<div className="absolute left-0 w-full">
					{/* Logo 组件 - 在左侧 */}
					<div className="flex-shrink-0 p-4">
						<Logo
							companyName={globalT('companyName')}
							slogan={globalT('slogan')}
							isDarkTheme={isDarkTheme}
							onClick={closeMobileMenu}
							className="hover:scale-105 transition-all duration-300"
						/>
					</div>
					</div>

					{/* 桌面导航 - 居中显示 */}
					<div className="hidden md:flex flex-1 justify-center mx-auto">
						<DesktopNav
							navT={navT}
							pathname={pathname}
							isDarkTheme={isDarkTheme}
							activeMenu={activeMenu}
							setActiveMenu={setActiveMenu}
							navItems={navItems}
						/>
					</div>

					{/* 右侧功能区 - 桌面端 */}
					<div className="hidden md:flex items-center space-x-1 right-0 absolute">
						<div className="relative">
							<SearchBar
								placeholder={navT('searchPlaceholder')}
								searchOpen={searchOpen}
								setSearchOpen={setSearchOpen}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								isDarkTheme={isDarkTheme}
							/>
							<SearchResults
								searchValue={searchValue}
								navItems={navItems}
								navT={navT}
								isVisible={searchValue.length > 0}
								setSearchValue={setSearchValue}
								isDarkTheme={isDarkTheme}
							/>
						</div>
						<LanguageSwitcher isDarkTheme={isDarkTheme} />
						<ThemeToggle isDarkTheme={isDarkTheme} />
						<UserMenu isDarkTheme={isDarkTheme} />
					</div>

					{/* 移动端按钮 - 只在移动端显示 */}
					<div className="md:hidden flex absolute right-0 items-center space-x-1">
						<Button
							variant="ghost"
							size="icon"
							className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
							onClick={() => setSearchOpen(!searchOpen)}
						>
							<Search className="h-5 w-5" />
						</Button>
						<LanguageSwitcher isDarkTheme={isDarkTheme} />
						<ThemeToggle isDarkTheme={isDarkTheme} />
						<Button
							variant="ghost"
							size="icon"
							className={`${themeStyle.textSecondary} ${themeStyle.bgHover}`}
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{/* 移动端搜索框 - 在需要时展开 */}
				{searchOpen && (
					<div className="md:hidden py-3">
						<div className={`relative border-t ${themeStyle.border} pt-3`}>
							<Search className={`absolute left-4 top-7 transform -translate-y-1/2 h-4 w-4 ${themeStyle.textSecondary}`} />
							<input
								type="text"
								placeholder={navT('searchPlaceholder')}
								className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${themeStyle.searchBg} ${themeStyle.searchText} ${themeStyle.searchBorder} ${themeStyle.searchFocus}`}
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								autoFocus
							/>
							<button
								className={`absolute right-4 top-7 transform -translate-y-1/2 ${themeStyle.textSecondary}`}
								onClick={() => setSearchOpen(false)}
							>
								<X className="h-5 w-5" />
							</button>
							<SearchResults
								searchValue={searchValue}
								navItems={navItems}
								navT={navT}
								isVisible={searchValue.length > 0}
								setSearchValue={setSearchValue}
								isMobile={true}
								isDarkTheme={isDarkTheme}
							/>
						</div>
					</div>
				)}
			</div>

			{/* 移动端菜单 */}
			<MobileMenu
				companyName={globalT('companyName')}
				mobileMenuOpen={mobileMenuOpen}
				setMobileMenuOpen={setMobileMenuOpen}
				pathname={pathname}
				navT={navT}
				isDarkTheme={isDarkTheme}
				closeMenu={closeMobileMenu}
				navItems={navItems}
			/>
		</header>
	);
}