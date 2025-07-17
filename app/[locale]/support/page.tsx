import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import SupportResourceCard from '@/app/components/SupportResourceCard';
import { Download, BookOpen, HelpCircle, Calendar, Headphones } from 'lucide-react';

export default function SupportPage() {
  const t = useTranslations();
  const supportT = useTranslations('support');
  
  // 资源数据
  const resources = [
    { 
      title: supportT('resources.downloads'), 
      description: t('downloadsDescription'),
      icon: Download 
    },
    { 
      title: supportT('resources.documentation'), 
      description: t('documentationDescription'),
      icon: BookOpen 
    },
    { 
      title: supportT('resources.faq'), 
      description: t('faqDescription'),
      icon: HelpCircle 
    }
  ];
  
  // 服务数据
  const services = [
    { 
      title: supportT('services.training'), 
      description: t('trainingDescription'),
      icon: Calendar 
    },
    { 
      title: supportT('services.consulting'), 
      description: t('consultingDescription'),
      icon: Headphones 
    },
    { 
      title: supportT('services.maintenance'), 
      description: t('maintenanceDescription'),
      icon: Settings 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{supportT('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {supportT('subtitle')}
        </p>
      </div>
      
      {/* 资源部分 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">{supportT('resources.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <SupportResourceCard 
              key={index} 
              title={resource.title}
              description={resource.description}
              Icon={resource.icon}
            />
          ))}
        </div>
      </div>
      
      {/* 服务部分 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">{supportT('services.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <SupportResourceCard 
              key={index} 
              title={service.title}
              description={service.description}
              Icon={service.icon}
            />
          ))}
        </div>
      </div>
      
      {/* 联系支持 */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle>{supportT('contact.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-6">
                {supportT('contact.description')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">{t('supportHours')}</h3>
                    <p className="text-muted-foreground">24/7 {t('criticalSupport')}, {t('businessHours')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">{t('responseTime')}</h3>
                    <p className="text-muted-foreground">{t('criticalResponse')} <span className="font-medium">2 {t('hours')}</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <div className="space-y-4">
                <Button className="w-full">
                  <Headphones className="mr-2 h-4 w-4" />
                  {t('liveChat')}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('callSupport')}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('emailSupport')}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('scheduleCall')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}