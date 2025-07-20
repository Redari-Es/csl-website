'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  features: string[];
  applications: string[];
}

interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  categories: string[];
  products: Product[];
}

export default function ProductShowcase({ title, subtitle, categories, products }: ProductShowcaseProps) {
  const t = useTranslations('productShowcase');

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">{title}</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* 过滤和搜索 */}
      <div className="mb-8 bg-gradient-to-r from-cyan-800 to-blue-900 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="pl-10 bg-transparent border-cyan-300 text-white focus:border-cyan-400 focus:ring-cyan-400 w-full py-3 px-4 rounded-lg"
              />
            </div>
          </div>
          
          <select className="bg-transparent text-white border-cyan-300 focus:border-cyan-400 focus:ring-cyan-400 w-full py-3 px-4 rounded-lg">
            <option value="">{t('categoryFilter')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            {t('applyFilters')}
          </Button>
        </div>
      </div>

      {/* 产品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="bg-gradient-to-b from-black to-gray-800 text-white border-cyan-500">
            <CardHeader className="border-b border-cyan-500 pb-4">
              <CardTitle>{product.name}</CardTitle>
              <Badge className="bg-cyan-500">{product.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">{product.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-cyan-400 font-medium">Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-cyan-400 font-medium">Applications:</h4>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {product.applications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </div>
              
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-4">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}