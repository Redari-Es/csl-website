'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import IndustrySelector from '@/components/IndustrySelector';
import { 
  Factory, 
  BatteryCharging, 
  Server, 
  HeartPulse, 
  ArrowRight, 
  CircuitBoard,
  Satellite,
  ShieldCheck,
  Settings,
  Rocket,
  Lightbulb,
  BarChart2,
  Check
} from 'lucide-react';
import SolutionCard from '@/components/SolutionCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsPage() {
  const t = useTranslations('solution');
  
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  // 行业列表
  const industries = t.raw('industries');
  
  // 解决方案数据
  const solutions = t.raw('items').map((item: any, index: number) => ({
    ...item,
    icon: [Factory, BatteryCharging, Server, HeartPulse, CircuitBoard, Satellite, ShieldCheck, Settings][index],
    industries: [
      'all', 
      ...(item.industries || ['industrial', 'automotive', 'healthcare', 'datacenter'])
    ]
  }));

  // 过滤解决方案
  const filteredSolutions = solutions.filter(solution => 
    solution.industries.includes(selectedIndustry)
  );

  // 案例研究
  const caseStudies = t.raw('caseStudies');

  // 参考引用
  const testimonials = t.raw('testimonials');

  // 动画效果
  const sectionRef = useRef(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
        }
      });
    }

    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
          }
        });
      }
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* 英雄区域 */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium mb-6"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {t('heroTag')}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              {t('title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-16">
        {/* 行业选择器 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('selectIndustry')}</h2>
          <IndustrySelector 
            industries={industries} 
            selected={selectedIndustry}
            onChange={setSelectedIndustry}
          />
        </div>
        
        {/* 解决方案网格 */}
        <div ref={sectionRef}>
          <h2 className="text-2xl font-bold mb-8 text-center">
            {selectedIndustry === 'all' 
              ? t('allSolutions') 
              : `${t('solutionsFor')} ${industries.find((i: any) => i.id === selectedIndustry)?.name}`
            }
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredSolutions.map((solution: any, index: number) => (
              <div 
                key={index}
                ref={el => cardRefs.current[index] = el}
              >
                <SolutionCard 
                  solution={solution} 
                  icon={solution.icon}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 定制解决方案 */}
        <div className="mb-20">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-3xl">{t('customSolutions')}</CardTitle>
                  <CardDescription className="text-lg">
                    {t('customSolutionsDescription')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {t
                      .raw('customBenefits')
                      .map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-4">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button size="lg" className="mt-4">
                    {t('requestConsultation')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
              
              <div className="md:w-1/3 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Rocket className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('customSolutionTitle')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('customSolutionSubtitle')}
                  </p>
                  <div className="bg-primary/10 inline-block px-4 py-2 rounded-full text-sm font-medium">
                    {t('customSolutionCta')}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* 案例研究预览 */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">{t('relatedCaseStudies')}</h2>
              <p className="text-muted-foreground">{t('caseStudiesSubtitle')}</p>
            </div>
            <Button variant="link" className="text-primary mt-4 md:mt-0">
              {t('viewAllCaseStudies')}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies
              .slice(0, 2)
              .map((caseStudy: any, index: number) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow overflow-hidden border-0 shadow-md"
              >
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 h-2 w-full"></div>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <BarChart2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{caseStudy.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {caseStudy.description}
                  </p>
                  <div className="bg-secondary/10 p-4 rounded-lg mb-6">
                    <p className="font-medium">{caseStudy.stats}</p>
                  </div>
                  <Button variant="outline">
                    {t('readCaseStudy')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* 客户评价 */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('testimonialsTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial: any, index: number) => (
              <Card 
                key={index} 
                className="border-0 shadow-md overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="text-primary text-5xl font-serif mb-4">"</div>
                  <p className="text-lg italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* 联系区域 */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                {t('contactSales')}
              </Button>
              <Button variant="secondary" size="lg" className="px-8">
                {t('requestDemo')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}