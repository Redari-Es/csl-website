// src/app/components/LocaleLayout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from './ui/LoadingSpinner';
import { cn } from '@/lib/utils';

interface LocaleLayoutProps {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}

export default function LocaleLayout({ 
  locale, 
  messages, 
  children 
}: LocaleLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // 处理语言切换
  const changeLanguage = (newLocale: string) => {
    setIsLoading(true);
    
    // 移除当前语言前缀
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // 导航到新语言
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  // 验证语言是否有效
  const isValidLocale = ['en', 'zh-CN', 'de', 'ja'].includes(locale);
  if (!isValidLocale) {
    return <div>Invalid locale</div>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Header onChangeLanguage={changeLanguage} />
        
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <main className="flex-grow">
            {children}
          </main>
        )}
        
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}