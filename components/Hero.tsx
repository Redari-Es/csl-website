'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export default function Hero({ title, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  const t = useTranslations();
  
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8">
              {ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              {ctaSecondary}
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* 向下滚动指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-8 border-r-2 border-b-2 border-foreground transform rotate-45"></div>
        </motion.div>
      </div>
    </div>
  );
}