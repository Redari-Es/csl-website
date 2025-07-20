'use client';

import {
	NavigationMenu,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavItemType } from '../types/navigation';
import NavItem from './NavItem';

interface DesktopNavProps {
	navT: any;
	pathname: string;
	isDarkTheme: boolean;
	setMobileMenuOpen: (open: boolean) => void;
	activeMenu: string | null;
	setActiveMenu: (key: string | null) => void;
}

export default function DesktopNav({
	navT,
	pathname,
	isDarkTheme,
	setMobileMenuOpen,
	activeMenu,
	setActiveMenu
}: DesktopNavProps) {
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
		<NavigationMenu>
			<NavigationMenuList className="flex space-x-4">
				{navItems.map((item) => (
					<NavItem
						key={item.key}
						item={item}
						pathname={pathname}
						isDarkTheme={isDarkTheme}
						setMobileMenuOpen={setMobileMenuOpen}
						activeMenu={activeMenu}
						navT={navT}
					/>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
