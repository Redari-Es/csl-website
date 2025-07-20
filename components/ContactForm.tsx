'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { themeColors } from '@/config/themeConfig';

interface ContactFormProps {
  title: string;
  subtitle: string;
}

export default function ContactForm({ title, subtitle }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'dark' | 'light'];

  return (
    <section className={`container mx-auto px-4 py-12 ${themeConfig.background}`}>
      <div className="text-center mb-10">
        <h2 className={`text-3xl md:text-4xl font-bold ${themeConfig.textPrimary} mb-4`}>{title}</h2>
        <p className={`max-w-2xl mx-auto ${themeConfig.textSecondary} text-opacity-80`}>{subtitle}</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <form className="space-y-6">
          <input
            type="text"
            placeholder={t('name')}
            className={`w-full bg-transparent border-${themeConfig.border.split('/')[0]}-200 ${themeConfig.textPrimary} focus:border-${themeConfig.accent.split(' ')[0]} focus:ring-${themeConfig.accent.split(' ')[0]} py-3 px-4 rounded-lg`}
          />
          <input
            type="email"
            placeholder={t('email')}
            className={`w-full bg-transparent border-${themeConfig.border.split('/')[0]}-200 ${themeConfig.textPrimary} focus:border-${themeConfig.accent.split(' ')[0]} focus:ring-${themeConfig.accent.split(' ')[0]} py-3 px-4 rounded-lg`}
          />
          <textarea
            placeholder={t('message')}
            className={`w-full bg-transparent border-${themeConfig.border.split('/')[0]}-200 ${themeConfig.textPrimary} focus:border-${themeConfig.accent.split(' ')[0]} focus:ring-${themeConfig.accent.split(' ')[0]} py-3 px-4 rounded-lg h-40`}
          />
          <Button className={`bg-${themeConfig.accent.split(' ')[0]} hover:bg-${themeConfig.accent.split(' ')[0]}-700 ${themeConfig.textPrimary} w-full`}>
            {t('submit')}
          </Button>
        </form>
      </div>
    </section>
  );
}