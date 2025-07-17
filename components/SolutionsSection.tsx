// src/app/[locale]/solutions/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';


import { Factory, BatteryCharging, Server, HeartPulse } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import IndustrySelector from './IndustrySelector';
import SolutionCard from './SolutionCard';
import ContactSection from './ContactSection';

// 生成元数据
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      images: [
        {
          url: '/images/solutions-og.jpg',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
  };
}

// 行业解决方案接口
interface SolutionItem {
  title: string;
  description: string;
  icon: string;
}

// 行业接口
interface Industry {
  id: string;
  name: string;
}

export default function SolutionsPage() {
  const t = useTranslations();
  const solutionsT = useTranslations('solutions');
  
  // 获取解决方案数据
  const solutions: SolutionItem[] = solutionsT.raw('items');

  // 图标映射
  const iconMap: Record<string, React.ComponentType<any>> = {
    Factory,
    BatteryCharging,
    Server,
    HeartPulse
  };

  // 行业列表
  const industries: Industry[] = [
    { id: 'automotive', name: t('industries.automotive') },
    { id: 'aerospace', name: t('industries.aerospace') },
    { id: 'healthcare', name: t('industries.healthcare') },
    { id: 'datacenter', name: t('industries.datacenter') },
    { id: 'renewable', name: t('industries.renewable') },
    { id: 'industrial', name: t('industries.industrial') }
  ];

  // 案例研究数据
  const caseStudies = solutionsT.raw('caseStudies');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题区域 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{solutionsT('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {solutionsT('subtitle')}
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
      </div>
      
      {/* 行业选择器 */}
      <div className="mb-12">
        <IndustrySelector industries={industries} />
      </div>
      
      {/* 解决方案网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {solutions.map((solution, index) => {
          const Icon = iconMap[solution.icon] || Factory;
          return (
            <SolutionCard 
              key={index} 
              solution={solution} 
              Icon={Icon}
            />
          );
        })}
      </div>
      
      {/* 定制解决方案部分 */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('customSolutions')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('customSolutionsDescription')}
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                t('customSolutionsBenefit1'),
                t('customSolutionsBenefit2'),
                t('customSolutionsBenefit3'),
                t('customSolutionsBenefit4')
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1.5 mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg" className="px-8">
              {t('requestConsultation')}
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold mb-4">{t('customSolutionProcess')}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    t('step1'),
                    t('step2'),
                    t('step3')
                  ].map((step, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <span className="font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 案例研究部分 */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{solutionsT('caseStudies.title')}</h2>
            <p className="text-muted-foreground">
              {solutionsT('caseStudies.subtitle')}
            </p>
          </div>
          <Button variant="link" className="text-primary">
            {t('viewAllCaseStudies')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">{caseStudy.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {caseStudy.description}
                </p>
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-primary mb-1">{t('result')}</h4>
                  <p>{caseStudy.result}</p>
                </div>
                <Button variant="outline">
                  {t('readCaseStudy')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* 联系咨询部分 */}
      <ContactSection 
        title={t('contactSection.title')}
        description={t('contactSection.description')}
        ctaText={t('contactSection.ctaText')}
      />
    </div>
  );
}

// // SolutionCard 组件
// function SolutionCard({ solution, Icon }: { solution: SolutionItem; Icon: React.ComponentType<any> }) {
//   const t = useTranslations();
  
//   return (
//     <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
//       <CardHeader>
//         <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//           <Icon className="h-6 w-6 text-primary" />
//         </div>
//         <CardTitle>{solution.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         <p className="text-muted-foreground mb-6">{solution.description}</p>
        
//         <Button variant="link" className="pl-0">
//           {t('learnMore')}
//           <ArrowRight className="h-4 w-4 ml-1" />
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// // IndustrySelector 组件
// function IndustrySelector({ industries }: { industries: Industry[] }) {
//   const t = useTranslations();
  
//   return (
//     <div>
//       <h3 className="text-lg font-medium mb-4">{t('filterByIndustry')}</h3>
//       <div className="flex flex-wrap gap-2">
//         <Button variant="default">
//           {t('allIndustries')}
//         </Button>
        
//         {industries.map((industry) => (
//           <Button key={industry.id} variant="outline">
//             {industry.name}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ContactSection 组件
// function ContactSection({ title, description, ctaText }: { title: string; description: string; ctaText: string }) {
//   return (
//     <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
//           <p className="opacity-90">{description}</p>
//         </div>
        
//         <div className="flex justify-center">
//           <Button 
//             variant="outline" 
//             className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg"
//           >
//             {ctaText}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }