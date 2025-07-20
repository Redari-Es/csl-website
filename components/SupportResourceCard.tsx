'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface SupportResourceCardProps {
  title: string;
  description: string;
  Icon: (props: React.ComponentProps<typeof LucideIcon>) => React.ReactNode;
}

export default function SupportResourceCard({ title, description, Icon }: SupportResourceCardProps) {
  return (
    <Card className="bg-gradient-to-b from-gray-800 to-black text-white border-cyan-500">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-cyan-400" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{description}</p>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}