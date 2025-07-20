'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { themeColors } from '@/config/themeConfig';
import { cn } from '@/lib/utils';
import { Heart, Star } from 'lucide-react';

interface Testimonial {
  company: string;
  quote: string;
  name: string;
  position: string;
  avatar: string;
  rating: number;
  likes: number;
}

interface TestimonialsProps {
  title: string;
  items: Testimonial[];
}

export default function Testimonials({ title, items }: TestimonialsProps) {
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'dark' | 'light'];
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className={`text-3xl md:text-4xl font-bold ${themeConfig.textPrimary} mb-4`}>
          {title}
        </h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Navigation buttons */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => {
              // Implement left swipe logic
            }}
            className="p-2 bg-transparent text-white hover:text-cyan-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => {
              // Implement right swipe logic
            }}
            className="p-2 bg-transparent text-white hover:text-cyan-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonial cards */}
        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {items.map((testimonial, index) => (
            <div key={index} className="snap-center flex-shrink-0 px-4">
              <Card className={cn(
                'shadow-lg', 
                themeConfig.testimonialCard, 
                'w-full min-w-[300px] max-w-[350px] h-full'
              )}>
                <CardContent className="p-6 relative h-full">
                  {/* Avatar and name */}
                  <div className="absolute left-4 top-4 flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={`${testimonial.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className={`${themeConfig.textSecondary} text-sm opacity-80`}>
                        {testimonial.position}
                      </p>
                    </div>
                  </div>

                  {/* Like button */}
                  <div className="absolute right-4 top-4">
                    <button
                      onClick={() => {
                        if (liked.includes(index)) {
                          setLiked(liked.filter((i) => i !== index));
                        } else {
                          setLiked([...liked, index]);
                        }
                      }}
                      className="flex items-center"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          liked.includes(index)
                            ? themeConfig.accent.replace('text-', '') + ' animate-pulse'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                        fill={liked.includes(index) ? themeConfig.accent.replace('text-', '') : 'none'}
                      />
                      <span className="ml-1 text-sm">{testimonial.likes + (liked.includes(index) ? 1 : 0)}</span>
                    </button>
                  </div>

                  {/* Company name */}
                  <div className="absolute right-4 top-12">
                    <p className={`${themeConfig.textSecondary} text-sm opacity-80`}>
                      {testimonial.company}
                    </p>
                  </div>

                  {/* Testimonial content */}
                  <p className={`${themeConfig.textSecondary} italic mb-8 mt-16`}>
                    {testimonial.quote}
                  </p>

                  {/* Rating stars */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? themeConfig.accent + ' fill-current'
                            : 'text-gray-300 dark:text-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}