
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);
export const config = {
	// 支持的语言列表
	locales: ['en', 'zh', 'ja', 'de'],

	// 默认语言
	defaultLocale: 'en',

	// 禁用自动语言检测
	localeDetection: false,

	// 语言前缀策略: 'as-needed' 表示只在需要时显示语言前缀
	localePrefix: 'as-needed',

	// 自定义路径映射
	pathnames: {
		// 首页映射
		'/': '/',

		// 产品页面映射
		'/products': {
			en: '/products',
			zh: '/products',
			ja: '/seihin',
			de: '/produkte'
		},

		// 解决方案页面映射
		'/solutions': {
			en: '/solutions',
			zh: '/solutions',
			ja: '/kaisetsu',
			de: '/loesungen'
		},

		// 案例研究页面映射
		'/cases': {
			en: '/cases',
			zh: '/cases',
			ja: '/jirei',
			de: '/fallstudien'
		},

		// 支持页面映射
		'/support': {
			en: '/support',
			zh: '/support',
			ja: '/sapoto',
			de: '/unterstuetzung'
		},

		// 关于我们页面映射
		'/about': {
			en: '/about',
			zh: '/about',
			ja: '/ni-tsuite',
			de: '/ueber-uns'
		},

		// 联系我们页面映射
		'/contact': {
			en: '/contact',
			zh: '/contact',
			ja: '/renraku',
			de: '/kontakt'
		}
	},
	// 匹配所有路径，排除API路由、Next.js内部路径和静态文件
	matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']

};

