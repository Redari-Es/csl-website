import type { Metadata, Viewport } from "next";
import MainLayout from "@/components/layout/MainLayout";
import { ReactNode } from "react";

import { notFound } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GSAPProvider } from "../providers";

type Props = {
	children: ReactNode
	params: { locale: string }
}

const websiteConfig = {
	url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
	title: "深圳市恒运昌真空技术有限公司",
	description:
		"深圳市恒运昌真空技术有限公司，2013年03月19日成立，经营范围包括真空设备、真空等离子电源、新能源材料、半导体设备、气体质量流量计、真空泵、阴极、靶材、机电产品的技术开发、技术咨询与销售等。",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
};

const geistSans = localFont({
	src: "../../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "../../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

// 生成静态参数
export function generateStaticParams() {
	return [
		{ locale: 'en' },
		{ locale: 'zh' },
		{ locale: 'ja' },
		{ locale: 'de' }
	];
}


export function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Metadata {
	return {
		//TODO Update these SEO Defaults
		metadataBase: new URL(websiteConfig.url),
		title: {
			default: websiteConfig.title,
			template: `%s | ${websiteConfig.title}`,
		},
		description: websiteConfig.description,
		keywords: "Next.js, React, App dir, Template, Starter, RSC",
		robots: { index: true, follow: true },
		// TODO: Defaults favicons, generate your own from https://realfavicongenerator.net/. See the /public/favicons folder.
		icons: {
			icon: [
				{ url: "/favicons/favicon-32x32.png", sizes: "32x32" },
				{ url: "/favicons/favicon-16x16.png", sizes: "16x16" },
				{ url: "/favicons/favicon.ico" },
				// { url: "/favicons/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
			],
			shortcut: "/favicons/favicon-16x16.png",
			apple: "/favicons/apple-touch-icon.png",
		},
		manifest: "/favicons/site.webmanifest",
		openGraph: {
			url: websiteConfig.url,
			title: websiteConfig.title,
			description: websiteConfig.description,
			siteName: websiteConfig.title,
			type: "website",
			locale: locale,
			// images: [`${websiteConfig.url}/images/opengraph.jpg`],
		},
		twitter: {
			card: "summary_large_image",
			title: websiteConfig.title,
			description: websiteConfig.description,
			// images: [`${websiteConfig.url}/images/twitter.jpg`],
			// creator: '@user',
		},
	};
}




export default function LocaleLayout({ children, params: { locale } }: Props) {

	// 验证语言是否支持
	const isValidLocale = ['en', 'zh', 'ja', 'de'].includes(locale);
	if (!isValidLocale) notFound();
	// 加载语言文件
	const messages = useMessages();

	return (
		<html lang={locale}>
			<body className="min-h-screen flex flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<GSAPProvider>
						<NextIntlClientProvider locale={locale} messages={messages}>
							<Header />
							<main className="flex-grow">
								{children}
							</main>
							<Footer />
						</NextIntlClientProvider>
					</GSAPProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

