'use client';

import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import SolutionsShowcase from '@/components/SolutionsShowcase';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import {useTheme} from "next-themes"
import {themeColors} from '@/config/themeConfig'

export default function Home() {
	const t = useTranslations();
	const heroT = useTranslations('homeHero');
	const productsT = useTranslations('homeProduct');
	const commonT = useTranslations('commonPage');
const { theme, setTheme } = useTheme();
const themeConfig=themeColors[theme as 'dark' |'ligth']

	return (
		<div className="space-y-20 pb-20 ${themeConfig.background">
			<Hero
				title={heroT('title')}
				subtitle={heroT('subtitle')}
				ctaPrimary={heroT('ctaPrimary')}
				ctaSecondary={heroT('ctaSecondary')}
			/>

			{/* 产品展示区域 */}
			<ProductShowcase
				title={productsT('title')}
				subtitle={productsT('subtitle')}
				categories={Object.values(productsT.raw('categories'))}
				products={productsT.raw('items')}
			/>

			{/* 解决方案区域 */}
			<SolutionsShowcase
				title={commonT('solutions.title')}
				subtitle={commonT('solutions.subtitle')}
				items={[
					{
						title: commonT('solutions.items.0.title'),
						description: commonT('solutions.items.0.description'),
						icon: 'LightningBolt'
					},
					{
						title: commonT('solutions.items.1.title'),
						description: commonT('solutions.items.1.description'),
						icon: 'Cog'
					},
					{
						title: commonT('solutions.items.2.title'),
						description: commonT('solutions.items.2.description'),
						icon: 'Shield'
					}
				]}
			/>

			{/* 客户评价区域 */}
			<Testimonials
				title={commonT('testimonials.title')}
				items={[
					{
						quote: commonT('testimonials.items.0.quote'),
						author: commonT('testimonials.items.0.author'),
						position: commonT('testimonials.items.0.position')
					},
					{
						quote: commonT('testimonials.items.1.quote'),
						author: commonT('testimonials.items.1.author'),
						position: commonT('testimonials.items.1.position')
					}
				]}
			/>

			{/* 联系表单区域 */}
			<ContactForm
				title={commonT('homeContact.title')}
				subtitle={commonT('homeContact.subtitle')}
			/>
		</div>
	);
}
