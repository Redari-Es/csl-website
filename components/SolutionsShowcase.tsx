'use client';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { themeColors } from '@/config/themeConfig';

interface Solution {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SolutionsSectionProps {
  title: string;
  subtitle: string;
  items: Solution[];
}

export default function SolutionsSection({ title, subtitle, items }: SolutionsSectionProps) {
  const t = useTranslations('');
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'dark' | 'light'];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className={`text-3xl md:text-4xl font-bold ${themeConfig.textPrimary} mb-4`}>{title}</h2>
        <p className={`max-w-2xl mx-auto ${themeConfig.textSecondary} text-opacity-80`}>{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <Card key={index} className={`h-full flex flex-col hover:shadow-lg transition-shadow bg-${themeConfig.background.split('#')[1]}`}>
            <CardHeader className={`border-b ${themeConfig.border} pb-4`}>
              <div className={`bg-${themeConfig.badge.split(' ')[0]}-10 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                {item.icon}
              </div>
              <CardTitle className={` ${themeConfig.textPrimary}`}>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className={`text-sm ${themeConfig.textSecondary} mb-6`}>{item.description}</p>
              
              <Button 
                variant="link" 
                className="pl-0 flex items-center justify-between w-full"
              >
                {t('solution.learnMore')}
                <ArrowRight className={`h-4 w-4 ml-1 ${themeConfig.textPrimary}`} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}