
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { themeColors } from '@/config/themeConfig';

interface SolutionItem {
  title: string;
  description: string;
}

interface SolutionCardProps {
  solution: SolutionItem;
  icon: React.ReactNode;
  className?: string;
}

export default function SolutionShowcase({ 
  solution, 
  icon,
  className = ""
}: SolutionCardProps) {
  const t = useTranslations('common');
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'dark' | 'light'];

  return (
    <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className={`border-b border-${themeConfig.border.split('/')[0]}-200 pb-4`}>
        <div className={`bg-${themeConfig.badge.split(' ')[0]}-10 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle className={`${themeConfig.textPrimary}`}>{solution.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className={`text-sm ${themeConfig.textSecondary} mb-6`}>{solution.description}</p>
        
        <Button 
          variant="link" 
          className="pl-0 flex items-center justify-between w-full"
        >
          {t('learnMore')}
          <ArrowRight className={`h-4 w-4 ml-1 ${themeConfig.textPrimary}`} />
        </Button>
      </CardContent>
    </Card>
  );
}