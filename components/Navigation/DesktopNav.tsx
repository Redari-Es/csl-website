import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import BreathingIndicator from './BreathingIndicator';
import { NavItem } from './NavItems';

export default function DesktopNav({ 
  navItems, 
  pathname, 
  isCyberTheme, 
  closeMobileMenu,
  activeMenu,
  setActiveMenu
}: { 
  navItems: NavItem[]; 
  pathname: string; 
  isCyberTheme: boolean; 
  closeMobileMenu: () => void;
  activeMenu: string | null;
  setActiveMenu: (key: string | null) => void;
}) {
  const menuRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    Object.keys(menuRefs.current).forEach(key => {
      const element = menuRefs.current[key];
      if (element) {
        const underline = element.querySelector('.menu-underline');
        if (underline) {
          gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
        }
      }
    });
  }, []);

  const setupMenuAnimation = (element: HTMLDivElement | null, key: string) => {
    if (!element) return;
    
    menuRefs.current[key] = element;
    const underline = element.querySelector('.menu-underline');
    
    if (!underline) return;
    
    gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
    
    element.addEventListener('mouseenter', () => {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.2,
        ease: "power2.in"
      });
    });
  };

  const isActive = (href: string, hasSubItems: boolean) => {
    if (pathname === href) return true;
    if (hasSubItems) {
      return pathname.startsWith(href);
    }
    return false;
  };

  const handleMouseEnter = (key: string) => {
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <NavigationMenu className="relative">
      <NavigationMenuList className="flex space-x-1">
        {navItems.map((item) => {
          const isActiveItem = isActive(item.href, item.hasSubItems);
          
          return (
            <NavigationMenuItem 
              key={item.key}
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              {item.hasSubItems ? (
                <div 
                  ref={el => setupMenuAnimation(el, item.key)}
                  className="group"
                >
                  <NavigationMenuTrigger 
                    className={`text-sm font-medium px-3 py-2 transition-colors h-10 flex items-center ${
                      isActiveItem 
                        ? isCyberTheme ? 'text-cyan-300' : 'text-sky-700'
                        : isCyberTheme ? 'text-cyan-400 hover:text-cyan-200' : 'text-sky-600 hover:text-sky-800'
                    }`}
                  >
                    <span className="relative flex items-center">
                      {item.name}
                      {isActiveItem && <BreathingIndicator isCyberTheme={isCyberTheme} />}
                      <span className={`menu-underline absolute bottom-0 left-0 w-full h-0.5 rounded-full scale-x-0 ${
                        isCyberTheme ? 'bg-cyan-400' : 'bg-sky-500'
                      }`}></span>
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className={`absolute left-0 w-full py-6 ${
                    isCyberTheme 
                      ? 'bg-[#0a0e17] border-t border-cyan-400/20' 
                      : 'bg-white border-t border-sky-200 shadow-lg'
                  }`}>
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {item.subItems.map((subItem, index) => {
                          const isActiveSubItem = pathname === subItem.href;
                          
                          return (
                            <Link 
                              key={index}
                              href={subItem.href}
                              className={`block p-4 rounded-lg transition-all group ${
                                isActiveSubItem 
                                  ? isCyberTheme 
                                    ? 'border-cyan-400 bg-cyan-400/10' 
                                    : 'border-sky-500 bg-sky-50'
                                  : isCyberTheme 
                                    ? 'border-cyan-400/20 hover:border-cyan-400' 
                                    : 'border-sky-200 hover:border-sky-300'
                              } border`}
                              onClick={closeMobileMenu}
                            >
                              <div className={`font-medium transition-colors flex items-center ${
                                isActiveSubItem 
                                  ? isCyberTheme ? 'text-cyan-200' : 'text-sky-700'
                                  : isCyberTheme ? 'text-cyan-300 group-hover:text-cyan-100' : 'text-sky-600 group-hover:text-sky-800'
                              }`}>
                                {subItem.name}
                                {isActiveSubItem && <BreathingIndicator isCyberTheme={isCyberTheme} />}
                              </div>
                              {subItem.description && (
                                <p className={`text-sm mt-2 transition-colors ${
                                  isActiveSubItem 
                                    ? isCyberTheme ? 'text-cyan-300' : 'text-sky-600'
                                    : isCyberTheme ? 'text-cyan-400/80 group-hover:text-cyan-300' : 'text-sky-500 group-hover:text-sky-600'
                                }`}>
                                  {subItem.description}
                                </p>
                              )}
                              <div className={`mt-3 text-xs flex items-center transition-colors ${
                                isActiveSubItem 
                                  ? isCyberTheme ? 'text-cyan-200' : 'text-sky-600'
                                  : isCyberTheme ? 'text-cyan-400 group-hover:text-cyan-200' : 'text-sky-500 group-hover:text-sky-600'
                              }`}>
                                Learn more
                                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </div>
              ) : (
                <NavigationMenuLink asChild>
                  <div 
                    ref={el => setupMenuAnimation(el, item.key)}
                    className="group"
                  >
                    <Link
                      href={item.href}
                      className={`relative inline-block px-3 py-2 transition-colors h-10 flex items-center ${
                        isActiveItem 
                          ? isCyberTheme ? 'text-cyan-300' : 'text-sky-700'
                          : isCyberTheme ? 'text-cyan-400 hover:text-cyan-200' : 'text-sky-600 hover:text-sky-800'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <span className="relative flex items-center">
                        {item.name}
                        {isActiveItem && <BreathingIndicator isCyberTheme={isCyberTheme} />}
                        <span className={`menu-underline absolute bottom-0 left-0 w-full h-0.5 rounded-full scale-x-0 ${
                          isCyberTheme ? 'bg-cyan-400' : 'bg-sky-500'
                        }`}></span>
                      </span>
                    </Link>
                  </div>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}