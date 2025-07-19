"use client"
import { useTranslations } from 'next-intl'
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import SolutionsSection from '@/components/SolutionsSection';


export default function Home() {

  const t = useTranslations();
  const heroT = useTranslations('hero');
  const productsT = useTranslations('products');

  return (
    <div className="space-y-20 pb-20">
      <Hero 
        title={heroT('title')}
        subtitle={heroT('subtitle')}
        ctaPrimary={heroT('ctaPrimary')}
        ctaSecondary={heroT('ctaSecondary')}
      />
      
      {/* 产品展示区域 */}
      <ProductShowcase 
        title={productsT('title')}
        subtitle={productsT('subtitle')}
        categories={Object.values(productsT.raw('categories'))}
      products={productsT.raw('items')}
      />
      
      {/* 解决方案区域 */}
      {/* <SolutionsSection 
        title={t('solutions.title')}
        subtitle={t('solutions.subtitle')}
        items={[
          {
            title: t('solutions.items.0.title'),
            description: t('solutions.items.0.description'),
            icon: 'LightningBolt'
          },
          {
            title: t('solutions.items.1.title'),
            description: t('solutions.items.1.description'),
            icon: 'Cog'
          },
          {
            title: t('solutions.items.2.title'),
            description: t('solutions.items.2.description'),
            icon: 'Shield'
          }
        ]}
      /> */}
      
      {/* 客户评价区域 */}
      {/* <Testimonials 
        title={t('testimonials.title')}
        items={[
          { 
            quote: t('testimonials.items.0.quote'), 
            author: t('testimonials.items.0.author'),
            position: t('testimonials.items.0.position')
          },
          { 
            quote: t('testimonials.items.1.quote'), 
            author: t('testimonials.items.1.author'),
            position: t('testimonials.items.1.position')
          }
        ]}
      /> */}
      
      {/* 联系表单区域 */}
      {/* <ContactForm 
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      /> */}
    </div>
  );
}