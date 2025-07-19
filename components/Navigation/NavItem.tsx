'use client';

import { useState } from 'react';
import {Link} from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItemProps {
  item: {
    key: string;
    name: string;
    href: string;
    hasSubItems: boolean;
    subItems?: Array<{
      name: string;
      href: string;
      description?: string;
    }>;
  };
  isActive: boolean;
}

export default function NavItem({ item, isActive }: NavItemProps) {
  const pathname = usePathname();
  const hasSubItems = item.hasSubItems && item.subItems && item.subItems.length > 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavigationMenuItem 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {hasSubItems ? (
        <>
          <NavigationMenuTrigger 
            className={cn(
              navigationMenuTriggerStyle(),
              "font-medium px-3 py-2 bg-transparent",
              "transition-colors duration-200 ease-in-out",
              isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <span className="whitespace-nowrap">{item.name}</span>
          </NavigationMenuTrigger>
          
          <NavigationMenuContent 
            className={cn(
              "absolute left-0 w-full bg-white shadow-lg p-4 border border-gray-200 rounded-lg mt-1",
              "transition-all duration-300 origin-top",
              isHovered 
                ? "opacity-100 scale-y-100" 
                : "opacity-0 scale-y-95 pointer-events-none"
            )}
          >
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {item.subItems?.map((subItem, index) => (
                  <Link 
                    href={subItem.href} 
                    key={`${item.key}-${index}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink 
                      className={cn(
                        "block p-3 rounded-lg transition-all duration-200 border border-gray-200",
                        "hover:border-blue-300 hover:shadow-sm bg-white",
                        pathname === subItem.href 
                          ? 'bg-blue-50 border-blue-300' 
                          : ''
                      )}
                    >
                      <div className="flex items-start">
                        <div className="bg-blue-50 p-1.5 rounded-lg mr-3">
                          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-md w-8 h-8" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                          )}
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </>
      ) : (
  
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "font-medium px-3 py-2 bg-transparent",
              "transition-colors duration-200 ease-in-out",
              "whitespace-nowrap",
              isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            {item.name}
          </NavigationMenuLink>
        
      )}
    </NavigationMenuItem>
  );
}