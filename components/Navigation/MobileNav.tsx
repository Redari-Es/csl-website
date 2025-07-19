'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from './LanguageSwitcher';

interface MobileNavProps {
  navItems: any[]; 
  companyName: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function MobileNav({ 
  navItems, 
  companyName, 
  setMobileMenuOpen, 
  mobileMenuOpen
}: MobileNavProps) {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (key: string) => {
    if (openSubMenu === key) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(key);
    }
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden ml-2 text-sky-600">
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="h-full w-[85vw] rounded-l-xl bg-white border-l border-sky-200">
        <SheetHeader>
          <div className="flex justify-between items-center py-4 border-b border-sky-200 px-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold">RF</span>
              </div>
              <div className="ml-2">
                <div className="font-bold text-sky-800 text-sm">{companyName}</div>
              </div>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-sky-600" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-4">
            {navItems.map((item) => {
              const hasSubItems = item.hasSubItems && item.subItems && item.subItems.length > 0;
              const isSubMenuOpen = openSubMenu === item.key;
              
              return (
                <div key={item.key} className="border-b border-sky-100 pb-2">
                  <div className="flex flex-col">
                    <Link 
                      href={hasSubItems ? '#' : item.href} 
                      className={`block py-2 px-3 rounded-lg flex items-center justify-between ${
                        pathname === item.href 
                          ? 'bg-sky-50 font-medium text-sky-700' 
                          : 'text-sky-600 hover:bg-sky-50 hover:text-sky-800'
                      } transition-colors duration-200`}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                          toggleSubMenu(item.key);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {hasSubItems && (
                        <ChevronDown className={`h-4 w-4 text-sky-500 transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                    
                    {hasSubItems && item.subItems && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isSubMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 mt-1 space-y-1">
                          {item.subItems.map((subItem, index) => (
                            <Link 
                              href={subItem.href} 
                              key={`${item.key}-${index}`}
                              className={`block py-2 px-3 rounded-lg ${
                                pathname === subItem.href 
                                  ? 'bg-sky-50 text-sky-700' 
                                  : 'text-sky-600 hover:bg-sky-50 hover:text-sky-800'
                              } transition-colors duration-200`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="font-medium text-sm">{subItem.name}</div>
                              {subItem.description && (
                                <div className="text-xs text-sky-500 mt-1">{subItem.description}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
        <div className="py-4 border-t border-sky-100">
          <div className="px-4">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}