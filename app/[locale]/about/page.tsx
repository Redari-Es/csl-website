import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import TeamMemberCard from '@/components/TeamMemberCard';
import CompanyTimeline from '@/components/CompanyTimeline';
import { Globe, Award, Users, BarChart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations();
  const aboutT = useTranslations('about');
  
  // 团队成员数据
  const teamMembers = [
    { 
      name: t('teamMembers.ceo.name'), 
      position: t('teamMembers.ceo.position'),
      bio: t('teamMembers.ceo.bio')
    },
    { 
      name: t('teamMembers.cto.name'), 
      position: t('teamMembers.cto.position'),
      bio: t('teamMembers.cto.bio')
    },
    { 
      name: t('teamMembers.cfo.name'), 
      position: t('teamMembers.cfo.position'),
      bio: t('teamMembers.cfo.bio')
    },
    { 
      name: t('teamMembers.cmo.name'), 
      position: t('teamMembers.cmo.position'),
      bio: t('teamMembers.cmo.bio')
    }
  ];
  
  // 公司里程碑
  const milestones = [
    { year: "2010", event: t('milestones.founded') },
    { year: "2013", event: t('milestones.firstProduct') },
    { year: "2016", event: t('milestones.internationalExpansion') },
    { year: "2019", event: t('milestones.innovationAward') },
    { year: "2022", event: t('milestones.newHq') }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{aboutT('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('aboutSubtitle')}
        </p>
      </div>
      
      {/* 公司简介 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">{aboutT('mission.title')}</h2>
          <p className="text-muted-foreground mb-6">
            {aboutT('mission.content')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4">
              <Globe className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-bold">15+</h3>
              <p className="text-sm text-muted-foreground">{t('countries')}</p>
            </Card>
            
            <Card className="text-center p-4">
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-bold">250+</h3>
              <p className="text-sm text-muted-foreground">{t('employees')}</p>
            </Card>
            
            <Card className="text-center p-4">
              <BarChart className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-bold">5000+</h3>
              <p className="text-sm text-muted-foreground">{t('customers')}</p>
            </Card>
            
            <Card className="text-center p-4">
              <Award className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-bold">12</h3>
              <p className="text-sm text-muted-foreground">{t('industryAwards')}</p>
            </Card>
          </div>
        </div>
        
        <div className="bg-muted rounded-xl h-80 lg:h-full flex items-center justify-center">
          <p className="text-muted-foreground">{t('companyImage')}</p>
        </div>
      </div>
      
      {/* 核心价值观 */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle>{aboutT('values.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutT('values.items').map((value: string, index: number) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="bg-primary w-3 h-3 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">{value}</h3>
                <p className="text-muted-foreground text-sm">
                  {t(`valueDescription.${index}`)}
                </p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 时间线 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">{t('companyJourney')}</h2>
        <CompanyTimeline milestones={milestones} />
      </div>
      
      {/* 领导团队 */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{aboutT('team.title')}</h2>
          <Button variant="link" className="text-primary">
            {t('viewAllTeam')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}