import type { Metadata, Viewport } from "next"
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import { NextIntlClientProvider,  hasLocale } from 'next-intl';
import { ThemeProvider } from "next-themes";
import Header from '@/components/Navigation/Header'
import Footer from '@/components/Navigation/Footer'
import { GSAPProvider } from "./providers";
import { routing } from "@/i18n/routing"
import { setRequestLocale,getMessages } from "next-intl/server";
type Props = {
    children: React.ReactNode
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

const geisSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geisMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    return {
        metadataBase: new URL(websiteConfig.url),
        title: {
            default: websiteConfig.title,
            template: `%s | ${websiteConfig.title}`,
        },
        description: websiteConfig.description,
        keywords: "Next.js, React, App dir, Template, Starter, RSC",
        robots: { index: true, follow: true },
        icons: {
            icon: [
                { url: "/favicons/favicon-32x32.png", sizes: "32x32" },
                { url: "/favicons/favicon-16x16.png", sizes: "16x16" },
                { url: "/favicons/favicon.ico" },
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
        },
        twitter: {
            card: "summary_large_image",
            title: websiteConfig.title,
            description: websiteConfig.description,
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = params;

    // 验证语言是否支持
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // 启用静态渲染
    setRequestLocale(locale);
	
	const messages=await getMessages()

    return (
        <html lang={locale} suppressHydrationWarning >
            <body className={`${geisSans.variable} ${geisMono.variable} min-h-screen flex flex-col`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <GSAPProvider>
                            <Header />
                            <main className="flex-grow">
                                {children}
                            </main>
                            <Footer />
                        </GSAPProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}