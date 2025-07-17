import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import ContactInfo from '@/components/ContactInfo';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations();
  const contactT = useTranslations('contact');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{contactT('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {contactT('subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 联系表单 */}
        <Card>
          <CardHeader>
            <CardTitle>{t('sendMessage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">{contactT('form.name')}</Label>
                  <Input id="name" placeholder={t('yourName')} />
                </div>
                <div>
                  <Label htmlFor="email">{contactT('form.email')}</Label>
                  <Input id="email" type="email" placeholder={t('yourEmail')} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">{contactT('form.company')}</Label>
                  <Input id="company" placeholder={t('companyName')} />
                </div>
                <div>
                  <Label htmlFor="phone">{contactT('form.phone')}</Label>
                  <Input id="phone" placeholder={t('phoneNumber')} />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">{contactT('form.message')}</Label>
                <Textarea 
                  id="message" 
                  placeholder={t('yourMessage')} 
                  className="min-h-[150px]"
                />
              </div>
              
              <Button className="w-full">
                {contactT('form.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* 联系信息 */}
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{contactT('info.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfo 
                address={contactT('info.address')}
                phone={contactT('info.phone')}
                email={contactT('info.email')}
                hours={contactT('info.hours')}
              />
            </CardContent>
          </Card>
          
          {/* 地图 */}
          <Card>
            <CardHeader>
              <CardTitle>{t('visitUs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">{t('mapPlaceholder')}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* 部门联系人 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">{t('salesDepartment')}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {t('salesContactDescription')}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  sales@advancedsolutions.com
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">{t('supportDepartment')}</h3>
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