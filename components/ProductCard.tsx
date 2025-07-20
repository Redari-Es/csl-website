'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('product.products');

  return (
    <Card className="bg-gradient-to-b from-black to-gray-800 text-white border-cyan-500">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <Badge className="bg-cyan-500">{product.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="space-y-2">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-cyan-400">•</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}