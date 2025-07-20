'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Button} from '@/components/ui/button'
import { useTranslations } from 'next-intl';

interface Solution {
  title: string;
  description: string;
  icon: string;
}

interface SolutionsSectionProps {
  title: string;
  subtitle: string;
  items: Solution[];
}

export default function SolutionsSection({ title, subtitle, items }: SolutionsSectionProps) {
  const t = useTranslations();

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">{title}</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((solution, index) => (
          <Card key={index} className="bg-gradient-to-b from-black to-gray-800 text-white border-cyan-500">
            <CardHeader className="border-b border-cyan-500 pb-4">
              <CardTitle>{solution.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{solution.description}</p>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white mt-4">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}