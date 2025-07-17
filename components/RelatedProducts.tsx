import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const t = useTranslations();
  const productsT = useTranslations('products');
  
  // 模拟相关产品数据
  const relatedProducts = [
    {
      id: '1',
      name: `${productsT('items.0.name')} Pro`,
      category: productsT('categories.powerSupplies')
    },
    {
      id: '2',
      name: `${productsT('items.1.name')} Plus`,
      category: productsT('categories.inverters')
    },
    {
      id: '3',
      name: `${productsT('items.0.name')} Mini`,
      category: productsT('categories.powerSupplies')
    }
  ].filter(product => product.id !== currentProductId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('relatedProducts')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
              <div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                asChild
              >
                <Link href={`/products/${product.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        
        <Button variant="link" className="mt-4 pl-0">
          {t('viewAllProducts')}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}