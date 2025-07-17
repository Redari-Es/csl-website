import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  features: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <ul className="mb-6 space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="ml-2 text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          href={`/products/${product.id}`} 
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          {useTranslations()('products.viewDetails')}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}