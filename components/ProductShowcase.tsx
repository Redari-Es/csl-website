import { useTranslations } from 'next-intl';
import ProductCard from './ProductCard';

export default function ProductShowcase({ 
  title, 
  subtitle, 
  categories 
}: {
  title: string;
  subtitle: string;
  categories: string[];
}) {
  const t = useTranslations();
  
  // 模拟产品数据
  const products = [
    {
      id: 1,
      name: t('products.items.0.name'),
      description: t('products.items.0.description'),
      category: categories[0],
      features: [
        t('products.items.0.features.0'),
        t('products.items.0.features.1'),
        t('products.items.0.features.2')
      ]
    },
    {
      id: 2,
      name: t('products.items.1.name'),
      description: t('products.items.1.description'),
      category: categories[1],
      features: [
        t('products.items.1.features.0'),
        t('products.items.1.features.1'),
        t('products.items.1.features.2')
      ]
    },
    {
      id: 3,
      name: t('products.items.2.name'),
      description: t('products.items.2.description'),
      category: categories[2],
      features: [
        t('products.items.2.features.0'),
        t('products.items.2.features.1'),
        t('products.items.2.features.2')
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}