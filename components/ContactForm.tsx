'use client';

import { useTranslations } from 'next-intl';
import {Button} from './ui/button'
interface ContactFormProps {
  title: string;
  subtitle: string;
}

export default function ContactForm({ title, subtitle }: ContactFormProps) {
  const t = useTranslations("contact.form");

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">{title}</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <form className="space-y-6">
          <input
            type="text"
            placeholder={t('name')}
            className="w-full bg-transparent border-cyan-300 text-white focus:border-cyan-400 focus:ring-cyan-400 py-3 px-4 rounded-lg"
          />
          <input
            type="email"
            placeholder={t('email')}
            className="w-full bg-transparent border-cyan-300 text-white focus:border-cyan-400 focus:ring-cyan-400 py-3 px-4 rounded-lg"
          />
          <textarea
            placeholder={t('message')}
            className="w-full bg-transparent border-cyan-300 text-white focus:border-cyan-400 focus:ring-cyan-400 py-3 px-4 rounded-lg h-40"
          />
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white w-full">
            {t('submit')}
          </Button>
        </form>
      </div>
    </section>
  );
}