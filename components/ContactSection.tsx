// src/app/components/ContactSection.tsx
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface ContactSectionProps {
  title: string;
  description: string;
  ctaText: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function ContactSection({ 
  title, 
  description, 
  ctaText,
  className = "",
  variant = 'primary'
}: ContactSectionProps) {
  const bgColor = variant === 'primary' 
    ? 'bg-gradient-to-r from-primary to-secondary' 
    : 'bg-gradient-to-r from-primary/10 to-secondary/10';
  
  const textColor = variant === 'primary' ? 'text-white' : 'text-foreground';
  
  return (
    <div className={`rounded-2xl p-8 ${bgColor} ${textColor} ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className={`${variant === 'primary' ? 'opacity-90' : 'text-muted-foreground'}`}>
            {description}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant={variant === 'primary' ? 'outline' : 'default'}
            className={`px-8 py-4 text-lg flex items-center ${
              variant === 'primary' 
                ? 'bg-white text-primary hover:bg-gray-100' 
                : ''
            }`}
          >
            <Mail className="mr-2 h-5 w-5" />
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}