// app/[locale]/about/page.tsx
'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Users, BarChart, Award, ArrowRight } from 'lucide-react';
import { themeColors } from '@/config/themeConfig';

export default function AboutPage() {
  const t = useTranslations('about');
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'dark' | 'light'];

  const stats = [
    { icon: Globe, value: '15+', label: t('stats.countries') },
    { icon: Users, value: '250+', label: t('stats.employees') },
    { icon: BarChart, value: '5000+', label: t('stats.customers') },
    { icon: Award, value: '12', label: t('stats.awards') },
  ];

  const milestones = [
    { year: '2010', title: t('milestones.2010.title'), desc: t('milestones.2010.desc') },
    { year: '2013', title: t('milestones.2013.title'), desc: t('milestones.2013.desc') },
    { year: '2016', title: t('milestones.2016.title'), desc: t('milestones.2016.desc') },
    { year: '2019', title: t('milestones.2019.title'), desc: t('milestones.2019.desc') },
    { year: '2022', title: t('milestones.2022.title'), desc: t('milestones.2022.desc') },
  ];

  const values = [
    { title: t('values.innovation'), desc: t('values.innovationDesc') },
    { title: t('values.quality'), desc: t('values.qualityDesc') },
    { title: t('values.integrity'), desc: t('values.integrityDesc') },
    { title: t('values.customer'), desc: t('values.customerDesc') },
  ];

  const teamMembers = [
    { 
      position: 'ceo', 
      name: t('team.ceo.name'), 
      title: t('team.ceo.title'), 
      image: '/images/team/ceo.jpg',
      bio: t('team.ceo.bio')
    },
    { 
      position: 'cto', 
      name: t('team.cto.name'), 
      title: t('team.cto.title'), 
      image: '/images/team/cto.jpg',
      bio: t('team.cto.bio')
    },
    { 
      position: 'cfo', 
      name: t('team.cfo.name'), 
      title: t('team.cfo.title'), 
      image: '/images/team/cfo.jpg',
      bio: t('team.cfo.bio')
    },
    { 
      position: 'cmo', 
      name: t('team.cmo.name'), 
      title: t('team.cmo.title'), 
      image: '/images/team/cmo.jpg',
      bio: t('team.cmo.bio')
    }
  ];

  const culture = [
    {
      title: t('culture.innovation.title'),
      description: t('culture.innovation.description')
    },
    {
      title: t('culture.quality.title'),
      description: t('culture.quality.description')
    },
    {
      title: t('culture.integrity.title'),
      description: t('culture.integrity.description')
    },
    {
      title: t('culture.responsibility.title'),
      description: t('culture.responsibility.description')
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${themeConfig.background}`}>
      {/* Hero Section */}
      <section className="flex-1 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold ${themeConfig.textPrimary} mb-6`}>
            {t('hero.title')}
          </h1>
          <p className={`text-lg ${themeConfig.textSecondary} max-w-2xl mx-auto`}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="flex-1 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h2 className={`text-2xl font-bold text-center mb-12 ${themeConfig.textPrimary}`}>
          {t('stats.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Card key={i} className={`bg-gradient-to-b ${themeConfig.testimonialCard}`}>
              <CardContent className="flex flex-col items-center py-10">
                <stat.icon className={`h-8 w-8 ${themeConfig.textPrimary} mb-4`} />
                <h3 className={`text-2xl font-bold ${themeConfig.textPrimary}`}>{stat.value}</h3>
                <p className={`text-lg ${themeConfig.textSecondary}`}>{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="flex-1 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h2 className={`text-2xl font-bold text-center mb-12 ${themeConfig.textPrimary}`}>
          {t('values.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <Card key={i} className={`bg-gradient-to-b ${themeConfig.cardBackground}`}>
              <CardHeader>
                <CardTitle className={themeConfig.textPrimary}>{value.title}</CardTitle>
              </CardHeader>
              <CardContent className={`${themeConfig.textSecondary} text-sm`}>
                {value.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="flex-1 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h2 className={`text-2xl font-bold text-center mb-12 ${themeConfig.textPrimary}`}>
          {t('milestones.title')}
        </h2>
        <ul className="relative max-w-xl mx-auto">
          {milestones.map((milestone, i) => (
            <li key={i} className="mb-12 last:mb-0 relative">
              <div className={`absolute left-6 top-0 h-full w-px ${themeConfig.borderColor}`} />
              <div className="relative flex items-center group">
                <div className={`z-10 w-6 h-6 rounded-full bg-${themeConfig.avatarBackground} border-2 border-${themeConfig.accent.replace('bg-', '').replace('text-', '')} flex items-center justify-center`}>
                  <span className={themeConfig.textPrimary}>{milestone.year}</span>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className={`text-lg font-semibold ${themeConfig.textPrimary} mb-2`}>{milestone.title}</h3>
                  <p className={themeConfig.textSecondary}>{milestone.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Company Culture Section */}
      <section className="flex-1 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h2 className={`text-2xl font-bold text-center mb-12 ${themeConfig.textPrimary}`}>
          {t('culture.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {culture.map((item, i) => (
            <Card key={i} className={`bg-gradient-to-b ${themeConfig.cardBackground}`}>
              <CardContent className="text-center p-6">
                <h3 className={`text-lg font-semibold ${themeConfig.textPrimary} mb-4`}>{item.title}</h3>
                <p className={`${themeConfig.textSecondary} text-sm`}>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="flex-1 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${themeConfig.textPrimary}`}>{t('team.title')}</h2>
          <Link href="/team" className="mt-4 md:mt-0">
            <Button variant="link" className={`${themeConfig.textPrimary} hover:text-${themeConfig.textPrimary.replace('text-', '')}-300`}>
              {t('team.viewAll')}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <Card key={member.position} className={`bg-gradient-to-b ${themeConfig.cardBackground}`}>
              <CardContent className="py-8 text-center">
                <div className={`mx-auto mb-6 h-24 w-24 rounded-full ${themeConfig.avatarBackground} overflow-hidden`}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className={`text-xl font-bold ${themeConfig.textPrimary} mb-1`}>{member.name}</h3>
                <p className={`text-${themeConfig.accent.replace('bg-', '')} mb-3`}>{member.title}</p>
                <p className={`${themeConfig.textSecondary} text-sm`}>{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}