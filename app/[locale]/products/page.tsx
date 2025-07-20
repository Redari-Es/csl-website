'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('productsPage.common');
  const productsT = useTranslations('productsPage.product');
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, []);

  // 模拟产品数据
  const products = Array(9).fill(null).map((_, i) => ({
    id: i + 1,
    name: `${productsT('items.0.name')} ${i + 1}`,
    description: productsT('items.0.description'),
    category: Object.values(productsT.raw('categories'))[i % 4],
    features: [
      `${productsT('items.0.features.0')}`,
      `${productsT('items.0.features.1')}`,
      `${productsT('items.0.features.2')}`
    ]
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">{productsT('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-cyan-200">
          {productsT('subtitle')}
        </p>
      </div>

      {/* 过滤和搜索 */}
      <div className="mb-12 bg-gradient-to-r from-cyan-800 to-blue-900 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('searchPlaceholder')} 
                className="pl-10 bg-transparent border-cyan-300 text-white focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>
          </div>
          
          <Select>
            <SelectTrigger className="bg-transparent text-white border-cyan-300 focus:border-cyan-400 focus:ring-cyan-400">
              <SelectValue placeholder={t('categoryFilter')} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              {Object.values(productsT.raw('categories')).map((category, index) => (
                <SelectItem key={index} value={index.toString()} className="text-white">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Filter className="mr-2 h-4 w-4 text-white" />
            {t('applyFilters')}
          </Button>
        </div>
      </div>

      {/* 产品网格 */}
      <div 
        ref={productsRef} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 分页 */}
      <Pagination currentPage={1} totalPages={5} className="flex justify-center" />
    </div>
  );
}