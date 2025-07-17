// src/app/components/SolutionCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SolutionItem {
  title: string;
  description: string;
}

interface SolutionCardProps {
  solution: SolutionItem;
  icon: React.ReactNode;
  className?: string;
}

export default function SolutionCard({ 
  solution, 
  icon,
  className = ""
}: SolutionCardProps) {
  const t = useTranslations();
  
  return (
    <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{solution.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-6">{solution.description}</p>
        
        <Button variant="link" className="pl-0">
          {t('learnMore')}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}