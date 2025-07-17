'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册插件
gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactFormPage() {
  /* 注意：这里用 support.contact 前缀与 i18n 文件保持一致 */
  const t = useTranslations('support.contact');
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', company: '', phone: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: 发送表单
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1) 标题 / 副标题 / 表单 / 联系信息 依次淡入
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      tl.from([headlineRef.current, sublineRef.current], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
        .from(
          [formWrapperRef.current, infoRef.current],
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // 2) 背景气泡漂浮
      bubblesRef.current.forEach((b) => {
        if (!b) return;
        gsap.to(b, {
          yPercent: gsap.utils.random(-20, 20),
          xPercent: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* 背景装饰气泡 */}
      <div className="absolute inset-0 -z-10">
        {[
          'top-[-10%] left-[-5%] w-72 h-72 bg-indigo-400/30 blur-3xl',
          'top-[20%] right-[-10%] w-64 h-64 bg-fuchsia-400/30 blur-3xl',
          'bottom-[-5%] left-[20%] w-56 h-56 bg-amber-400/30 blur-3xl',
        ].map((cls, idx) => (
          <div
            key={idx}
            ref={(el) => (bubblesRef.current[idx] = el)}
            className={`absolute rounded-full ${cls}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h1 ref={headlineRef} className="text-3xl md:text-5xl font-bold">
            {t('title')}
          </h1>
          <p ref={sublineRef} className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* 内容区 */}
        <div className="grid md:grid-cols-5 gap-12">
          {/* 左侧表单 */}
          <div ref={formWrapperRef} className="md:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('namePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('company')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('companyPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phone')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('message')}</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder={t('messagePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  {t('send')}
                </Button>
              </form>
            </Form>
          </div>

          {/* 右侧联系信息 */}
          <div ref={infoRef} className="md:col-span-2 space-y-8">
            <h3 className="text-xl font-semibold">{t('getInTouch')}</h3>

            <div className="space-y-4">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@example.com</span>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (234) 567-890</span>
              </a>

              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-1" />
                <span>
                  123 Business Ave
                  <br />
                  Suite 404
                  <br />
                  San Francisco, CA 94107
                </span>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>{t('officeHours')}</span>
              </div>
            </div>

            {/* 社交媒体 */}
            <div className="pt-6 border-t">
              <h4 className="font-medium mb-2">{t('followUs')}</h4>
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'github'].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    aria-label={soc}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="w-5 h-5">{soc[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}