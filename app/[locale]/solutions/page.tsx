import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

import IndustrySelector from '@/components/IndustrySelector';
import { Factory, BatteryCharging, Server, HeartPulse, ArrowRight } from 'lucide-react';
import SolutionCard from '@/components/SolutionCard';

export default function SolutionsPage() {
  const t = useTranslations();
  const solutionsT = useTranslations('solutions');
  
  // 模拟解决方案数据
  const solutions = solutionsT.raw('items').map((item: any, index: number) => ({
    ...item,
    icon: [Factory, BatteryCharging, Server, HeartPulse][index]
  }));

  // 行业列表
  const industries = [
    { id: 'automotive', name: t('industries.automotive') },
    { id: 'aerospace', name: t('industries.aerospace') },
    { id: 'healthcare', name: t('industries.healthcare') },
    { id: 'datacenter', name: t('industries.datacenter') },
    { id: 'renewable', name: t('industries.renewable') },
    { id: 'industrial', name: t('industries.industrial') }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{solutionsT('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {solutionsT('subtitle')}
        </p>
      </div>
      
      {/* 行业选择器 */}
      <div className="mb-12">
        <IndustrySelector industries={industries} />
      </div>
      
      {/* 解决方案网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {solutions.map((solution: any, index: number) => (
          <SolutionCard 
            key={index} 
            solution={solution} 
            icon={solution.icon}
          />
        ))}
      </div>
      
      {/* 定制解决方案 */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle>{t('customSolutions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                {t('customSolutionsDescription')}
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  t('customSolutionsBenefit1'),
                  t('customSolutionsBenefit2'),
                  t('customSolutionsBenefit3')
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="ml-2">{item}</span>
                  </li>
                ))}
              </ul>
              <Button>
                {t('requestConsultation')}
              </Button>
            </div>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <p className="text-muted-foreground">{t('customSolutionsImage')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 案例研究预览 */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('relatedCaseStudies')}</h2>
        <Button variant="link" className="text-primary">
          {t('viewAllCaseStudies')}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[0, 1].map((index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{t(`caseStudies.${index}.title`)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t(`caseStudies.${index}.description`)}
              </p>
              <Button variant="outline">
                {t('readCaseStudy')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}