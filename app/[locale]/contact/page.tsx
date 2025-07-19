// app/contact/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import ContactInfo from '@/components/ContactInfo';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="container mx-auto px-4 py-12 bg-slate-950 text-slate-200">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4">{t('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 联系表单 */}
        <Card className="shadow-sm border border-cyan-400/40 bg-slate-900/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-cyan-300">{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">{t('form.name')}</Label>
                  <Input id="name" placeholder={t('form.yourName')} />
                </div>
                <div>
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <Input id="email" type="email" placeholder={t('form.yourEmail')} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">{t('form.company')}</Label>
                  <Input id="company" placeholder={t('form.companyName')} />
                </div>
                <div>
                  <Label htmlFor="phone">{t('form.phone')}</Label>
                  <Input id="phone" placeholder={t('form.phoneNumber')} />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">{t('form.message')}</Label>
                <Textarea 
                  id="message" 
                  placeholder={t('form.yourMessage')} 
                  className="min-h-[150px]"
                />
              </div>
              
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                {t('form.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* 联系信息 */}
        <div>
          <Card className="mb-8 shadow-sm border border-cyan-400/40 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-cyan-300">{t('info.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfo 
                address={t('info.address')}
                phone={t('info.phone')}
                email={t('info.email')}
                hours={t('info.hours')}
              />
            </CardContent>
          </Card>
          
          {/* 地图 */}
          <Card className="shadow-sm border border-cyan-400/40 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-cyan-300">{t('visitUs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">{t('mapPlaceholder')}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* 部门联系人 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow border border-cyan-400/40 bg-slate-900/60 backdrop-blur-xl">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2 text-cyan-300">{t('salesDepartment')}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {t('salesContactDescription')}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  sales@advancedsolutions.com
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow border border-cyan-400/40 bg-slate-900/60 backdrop-blur-xl">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2 text-cyan-300">{t('supportDepartment')}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {t('supportContactDescription')}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  support@advancedsolutions.com
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}