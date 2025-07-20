'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import BreathingIndicator from './BreathingIndicator';
import { NavItemType } from '../types/navigation';
import { themeColors } from '@/config/themeConfig'

interface MobileMenuProps {
	companyName: string;
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (open: boolean) => void;
	pathname: string;
	navT: any;
	isDarkTheme: boolean;
}

export default function MobileMenu({
	companyName,
	setMobileMenuOpen,
	mobileMenuOpen,
	pathname,
	navT,
	isDarkTheme
}: MobileMenuProps) {
	const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light'];

	const toggleSubMenu = (key: string) => {
		if (openSubMenu === key) {
			setOpenSubMenu(null);
		} else {
			setOpenSubMenu(key);
		}
	};

	// 添加点击外部关闭菜单的功能
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMobileMenuOpen(false);
				setOpenSubMenu(null);
			}
		};

		if (mobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [mobileMenuOpen, setMobileMenuOpen]);

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
	return (
		mobileMenuOpen && (
			<div
				ref={menuRef}
				className={`md:hidden ${isDarkTheme ? 'bg-[#0e1523] border-t border-cyan-400/20' : 'bg-white border-t border-sky-200 z-20'
					}`}
			>
				{/* 添加关闭按钮
				<div className="flex justify-end px-4 py-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setMobileMenuOpen(false)}
						className={isDarkTheme ? "text-cyan-400" : "text-sky-600"}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</Button>
				</div> */}

				<div className="container mx-auto px-4 py-2">
					<ul className="space-y-2">
						{navItems.map((item) => {
							const isActiveItem = pathname === item.href ||
								(item.hasSubItems && pathname.startsWith(item.href));

							return (
								<li key={item.key}>
									{item.hasSubItems ? (
										<div>
											<button
												className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-medium ${isActiveItem
													? isDarkTheme
														? 'text-cyan-300 border-l-2 border-cyan-400 pl-3'
														: 'text-sky-700 border-l-2 border-sky-500 pl-3'
													: isDarkTheme
														? 'text-cyan-400'
														: 'text-sky-600'
													}`}
												onClick={() => toggleSubMenu(item.key)}
											>
												<span className="flex items-center">
													{item.name}
													{isActiveItem && <BreathingIndicator isDarkTheme={isDarkTheme} />}
												</span>
												<div className="flex items-center">
													<span className={`text-xs mr-2 ${isDarkTheme ? 'text-cyan-500' : 'text-sky-500'
														}`}>
														<ChevronDown
															className={`h-4 w-4 transition-transform ${openSubMenu === item.key ? 'rotate-180' : ''
																}`}
														/>
													</span>
												</div>
											</button>

											{openSubMenu === item.key && (
												<div className={`ml-4 mt-1 space-y-2 pl-4 py-2 ${themeStyle
													? 'border-l border-cyan-400/20'
													: 'border-l border-sky-200'
													}`}>
													{item.subItems?.map((subItem, index) => {
														const isActiveSubItem = pathname === subItem.href;

														return (
															<Link
																key={index}
																href={subItem.href}
																className={`block px-4 py-2 text-sm rounded-lg flex items-center ${isActiveSubItem
																	? isDarkTheme
																		? 'text-cyan-300 border-l-2 border-cyan-400 pl-3'
																		: 'text-sky-700 border-l-2 border-sky-500 pl-3'
																	: isDarkTheme
																		? 'text-cyan-400 hover:text-cyan-300'
																		: 'text-sky-600 hover:text-sky-700'
																	}`}

																onClick={() => setMobileMenuOpen(false)}
															>
																{subItem.name}
																{isActiveSubItem && <BreathingIndicator isDarkTheme={isDarkTheme} />}
															</Link>
														);
													})}
												</div>
											)}
										</div>
									) : (
										<Link
											href={item.href}
											className={`block px-4 py-3 rounded-lg text-sm font-medium flex items-center ${isActiveItem
												? isDarkTheme
													? 'text-cyan-300 border-l-2 border-cyan-400 pl-3'
													: 'text-sky-700 border-l-2 border-sky-500 pl-3'
												: isDarkTheme
													? 'text-cyan-400 hover:text-cyan-300'
													: 'text-sky-600 hover:text-sky-700'
												}`}
											onClick={() => setMobileMenuOpen(false)}
										>
											{item.name}
											{isActiveItem && <BreathingIndicator isDarkTheme={isDarkTheme} />}
										</Link>
									)}
								</li>
							);
						})}

						<li className={`pt-3 mt-3 ${isDarkTheme ? 'border-t border-cyan-400/20' : 'border-t border-sky-200'
							}`}>
							<Link
								href="/login"
								className={`block px-4 py-3 text-sm font-medium ${isDarkTheme ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-600 hover:text-sky-700'
									}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								Sign In
							</Link>
							<Link
								href="/register"
								className={`block px-4 py-3 text-sm ${themeStyle.textSecondary} 									}`}
								onClick={() => setMobileMenuOpen(false)}
							>
								Create Account
							</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	);
}
