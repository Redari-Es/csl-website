// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
// 使用 next-intl 插件
const withNextIntl = createNextIntlPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	// 禁用 Next.js 内置的 i18n 系统
	i18n: null,

	// 图片优化
	images: {
		domains: ['images.unsplash.com'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
	},
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	}
}


// 导出配置
export default withNextIntl(nextConfig);
