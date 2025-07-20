import './globals.css';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import ErrorBoundary from '@/components/ErrorBoundary'

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
 
 
  return (
    <html lang='en'>
      <body>
       

        <NextIntlClientProvider>
      
            <ErrorBoundary>
            {children}
            </ErrorBoundary>
            </NextIntlClientProvider>
    
      </body>
    </html>
  );
}