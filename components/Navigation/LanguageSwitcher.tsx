'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const currentLanguage = languages.find(l => l.code === locale);

  // const changeLanguage = (newLocale: string) => {
  //   const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  //   router.push(`/${newLocale}${pathWithoutLocale}`);
  // };
  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.slice(2).join('/') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  if (mobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "flex items-center gap-2",
                locale === lang.code && "bg-accent"
              )}
            >
              <span className="text-xl">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Globe className="h-4 w-4" />
          {/* <span className="hidden sm:inline">{currentLanguage?.name}</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              "flex items-center gap-2",
              locale === lang.code && "bg-accent"
            )}
          >
            <span className="text-xl">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}