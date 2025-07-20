// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import Header from '@/components/Navigation/Header';
import Footer from '@/components/Navigation/Footer';
import { GSAPProvider } from "./providers";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";
import BackgroundAnimation from "@/components/Animations/BackgroundAnimation";
import {ThemeProvider} from 'next-themes'
type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const websiteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  title: "深圳市恒运昌真空技术有限公司",
  description: "深圳市恒运昌真空技术有限公司，2013年03月19日成立，经营范围包括真空设备、真空等离子电源、新能源材料、半导体设备、气体质量流量计、真空泵、阴极、靶材、机电产品的技术开发、技术咨询与销售等。",
};

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
    keywords: "真空技术,真空设备,等离子电源,半导体设备,气体质量流量计",
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

  const messages = await getMessages();

  return (
     <ThemeProvider
        attribute='class'
        defaultTheme="dark"
        enablesSystem={false}>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GSAPProvider>
        {/* 全局背景动画 */}
        <BackgroundAnimation />
        
        {/* 内容区域 */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </GSAPProvider>
    </NextIntlClientProvider>
        </ThemeProvider>
  );
}