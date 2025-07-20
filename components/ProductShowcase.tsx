'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { themeColors } from '@/config/themeConfig';
import {Link} from '@/i18n/navigation'
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // 使用useTheme获取当前主题
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'light' | 'dark'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-10">
        <h2 className={`text-3xl md:text-4xl ${themeConfig.textPrimary} mb-4`}>{title}</h2>
        <p className={`max-w-2xl mx-auto ${themeConfig.textSecondary} text-opacity-80`}>{subtitle}</p>
      </div>

      {/* 过滤和搜索区域 */}
      <div className={`mb-8 rounded-lg p-6 ${themeConfig.filterBg}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 w-full py-3 px-4 rounded-lg ${themeConfig.searchBorder} ${themeConfig.searchFocus} ${themeConfig.searchText} bg-transparent focus:outline-none`}
              />
              <svg 
                className="absolute left-4 top-3.5 h-5 w-5 opacity-50" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full py-3 px-4 rounded-lg ${themeConfig.searchBorder} ${themeConfig.searchFocus} ${themeConfig.searchText} focus:outline-none appearance-none relative`}
            >
              <option value="">{t('categoryFilter')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {/* 添加自定义下拉箭头 */}
            <svg 
              className={`absolute right-4 top-3.5 h-5 w-5 opacity-50 pointer-events-none`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
          
          <div className="md:col-span-1">
            <Button 
              className={`w-full py-3 rounded-lg ${themeConfig.button} font-medium`}
            >
              {t('applyFilters')}
            </Button>
          </div>
        </div>
      </div>

      {/* 产品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className={`border rounded-lg overflow-hidden ${themeConfig.border}`}
          >
            <CardHeader className={`border-b ${themeConfig.border} pb-4 px-4`}>
              <CardTitle className={`text-xl font-semibold ${themeConfig.textPrimary}`}>{product.name}</CardTitle>
              <Badge className={`py-1 px-3 rounded ${themeConfig.badge}`}>{product.category}</Badge>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4">
                <p className={`text-sm ${themeConfig.textSecondary} opacity-80`}>{product.description}</p>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className={`text-sm font-medium ${themeConfig.textPrimary}`}>{t('feature')}</h4>
                <ul className="space-y-1 text-sm">
                  {product.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className={`flex items-start ${themeConfig.textSecondary} opacity-90`}
                    >
                      <svg 
                        className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className={`text-sm font-medium ${themeConfig.textPrimary}`}>{t('application')}</h4>
                <ul className="space-y-1 text-sm">
                  {product.applications.map((app, index) => (
                    <li 
                      key={index} 
                      className={`flex items-start ${themeConfig.textSecondary} opacity-90`}
                    >
                      <svg 
                        className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/products" className='block'>
              <Button 
                className={`mb-6 w-full ${themeConfig.button} text-sm font-medium`}
              >
                {t('learnMore')}
              </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-8">
            <svg 
              className={`mx-auto h-12 w-12 opacity-20 ${themeConfig.textPrimary}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className={`mt-4 text-base ${themeConfig.textSecondary}`}>
              {t('noProductsFound')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}