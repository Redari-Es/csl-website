'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('navigation');
  const globalT = useTranslations('global');
  const pathname = usePathname();
  
  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('solutions'), href: '/solutions' },
    { name: t('cases'), href: '/cases' },
    { name: t('support'), href: '/support' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-3">
              <div className="text-xl font-bold text-gray-900">{globalT('companyName')}</div>
              <div className="text-xs text-gray-500">{globalT('slogan')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}