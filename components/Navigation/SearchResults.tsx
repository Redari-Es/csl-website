'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { themeColors } from '@/config/themeConfig'

interface SearchResultsProps {
	searchValue: string;
	navItems: any[];
	navT: any;
	isVisible: boolean;
	setSearchValue: (value: string) => void;
	isMobile?: boolean;
	isDarkTheme: boolean;
}

export default function SearchResults({
	searchValue,
	navItems,
	navT,
	isVisible,
	setSearchValue,
	isMobile = false,
	isDarkTheme
}: SearchResultsProps) {
	const themeStyle = themeColors[isDarkTheme ? 'dark' : 'light']
	const [isHovered, setIsHovered] = useState(false);

	if (!isVisible && !isHovered) return null;

	const getPopularCategories = () => {
		const categories: string[] = [];

		navItems.forEach(item => {
			if (item.key === 'products' && item.subItems) {
				item.subItems.forEach((subItem: any) => {
					categories.push(subItem.name);
				});
			}
		});

		return [...new Set(categories)].slice(0, 4);
	};

	const popularCategories = getPopularCategories();

	const handleResultClick = (value: string) => {
		setSearchValue(value);
	};

	return (
		<div
			className={`absolute top-full left-0 w-full md:w-[480px] shadow-lg z-50 border rounded-lg mt-1 transition-all duration-300 ease-in-out ${isVisible || isHovered
				? 'opacity-100 translate-y-0'
				: 'opacity-0 -translate-y-2 pointer-events-none'
				} ${themeStyle.menuBg} ${themeStyle.menuBorder}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className={`font-medium text-sm mb-2 ${isDarkTheme ? 'text-cyan-300' : 'text-sky-700'
							}`}>{navT('searchResults')}</h3>
						<ul className="space-y-2">
							{navItems.slice(1, 4).map((item) => {
								if (!item.subItems) return null;

								return item.subItems.slice(0, 2).map((subItem: any, idx: any) => (
									<li
										key={`result-${idx} `}
										className={`p-2 rounded cursor-ointer transition-colors duration-200 border ${isDarkTheme
											? 'border-cyan-400/20 hover:border-cyan-400'
											: 'border-sky-100 hover:bg-sky-50'
											} `}
										onClick={() => handleResultClick(subItem.name)}
									>
										<div className={`font-medium text-sm ${isDarkTheme ? 'text-cyan-200' : 'text-sky-800'
											} `}>{subItem.name}</div>
										<div className={`text-xs mt-1 ${isDarkTheme ? 'text-cyan-400' : 'text-sky-500'
											} `}>
											{subItem.description}
										</div>
									</li>
								));
							})}
						</ul>
					</div>

					<div className={`border-t md: border-t-0 md: border-l pt-4 md: pt-0 md: pl-4 ${isDarkTheme ? 'border-cyan-400/30' : 'border-sky-200'
						} `}>
						<h3 className={`font-medium text-sm mb-2 ${isDarkTheme ? 'text-cyan-300' : 'text-sky-700'
							} `}>{navT('popularCategories')}</h3>
						<div className="flex flex-wrap gap-2">
							{popularCategories.map((cat) => (
								<span
									key={cat}
									className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${isDarkTheme
										? 'bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
										: 'bg-sky-100 text-sky-700 hover:bg-sky-200'
										} `}
									onClick={() => handleResultClick(cat)}
								>
									{cat}
								</span>
							))}
						</div>

						<h3 className={`font-medium text-sm mt-4 mb-2 ${isDarkTheme ? 'text-cyan-300' : 'text-sky-700'
							} `}>{navT('recentSearches')}</h3>
						<div className="space-y-1">
							{[
								navT('products.powerSupplies'),
								navT('solutions.industrialAutomation'),
								navT('cases.caseStudy1')
							].map((term) => (
								<div
									key={term}
									className={`flex items-center p-2 rounded cursor-pointer transition-colors duration-200 ${isDarkTheme
										? 'hover:bg-cyan-400/10'
										: 'hover:bg-sky-50'
										} `}
									onClick={() => handleResultClick(term)}
								>
									<Search className={`h-3.5 w-3.5 mr-2 ${isDarkTheme ? 'text-cyan-400' : 'text-sky-400'
										} `} />
									<span className={`text-sm ${isDarkTheme ? 'text-cyan-300' : 'text-sky-700'
										} `}>{term}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
