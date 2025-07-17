import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

export default function Testimonials({ 
  title, 
  items 
}: { 
  title: string;
  items: Testimonial[];
}) {
  const t = useTranslations();
  
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              {/* 引用标记 */}
              <div className="absolute top-0 right-0 text-primary/10 text-9xl font-serif leading-none">
                "
              </div>
              
              <CardContent className="p-8 relative">
                <p className="text-lg italic mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/images/testimonials/${index + 1}.jpg`} />
                    <AvatarFallback>
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}