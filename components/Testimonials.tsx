'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
}

export default function Testimonials({ title, items }: TestimonialsProps) {
  const t = useTranslations();

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((testimonial, index) => (
          <Card key={index} className="bg-gradient-to-b from-black to-gray-800 text-white border-cyan-500">
            <CardContent>
              <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500 mr-4"></div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}