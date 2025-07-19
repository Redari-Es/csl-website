'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import gsap from 'gsap';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Globe, Sun, Moon, ChevronDown, User } from "lucide-react";
import { useTheme } from "next-themes";
import SearchBar from './SearchBar';
import SearchResults from './SearchResult';

export default function Header() {
  const globalT = useTranslations('global');
  const navT = useTranslations('navigation');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const navItemsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // 确定当前主题颜色方案
  const isCyberTheme = theme === 'cyber' || theme === 'dark';
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      
      if (currentScrollY <= 10) {
        setScrolled(false);
        setHidden(false);
      } else {
        setScrolled(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 初始化GSAP动画
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

  // 处理搜索框展开/折叠
  useEffect(() => {
    if (searchOpen) {
      setSearchExpanded(true);
      if (navItemsRef.current) {
        gsap.to(navItemsRef.current, {
          opacity: 0,
          width: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            navItemsRef.current!.style.display = 'none';
          }
        });
      }
    } else {
      if (navItemsRef.current) {
        navItemsRef.current.style.display = 'block';
        gsap.to(navItemsRef.current, {
          opacity: 1,
          width: 'auto',
          duration: 0.3,
          ease: "power2.out"
        });
      }
      setSearchExpanded(false);
    }
  }, [searchOpen]);

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

  // 导航项数据
  const navItems = [
    { 
      key: 'home',
      name: navT('home'),
      href: '/',
      hasSubItems: false
    },
    { 
      key: 'products',
      name: navT('products.title'),
      href: '/products',
      hasSubItems: true,
      subItems: [
        { 
          name: navT('products.powerSupplies'), 
          href: '/products/power-supplies', 
          description: navT('products.powerSuppliesDesc') 
        },
        { 
          name: navT('products.rfAmplifiers'), 
          href: '/products/rf-amplifiers', 
          description: navT('products.rfAmplifiersDesc') 
        },
        { 
          name: navT('products.testEquipment'), 
          href: '/products/test-equipment', 
          description: navT('products.testEquipmentDesc') 
        },
        { 
          name: navT('products.components'), 
          href: '/products/components', 
          description: navT('products.componentsDesc') 
        },
        { 
          name: navT('products.customSolutions'), 
          href: '/products/custom-solutions', 
          description: navT('products.customSolutionsDesc') 
        }
      ]
    },
    { 
      key: 'solutions',
      name: navT('solutions.title'),
      href: '/solutions',
      hasSubItems: true,
      subItems: [
        { 
          name: navT('solutions.industrialAutomation'), 
          href: '/solutions/industrial-automation', 
          description: navT('solutions.industrialAutomationDesc') 
        },
        { 
          name: navT('solutions.telecomInfrastructure'), 
          href: '/solutions/telecom-infrastructure', 
          description: navT('solutions.telecomInfrastructureDesc') 
        },
        { 
          name: navT('solutions.medicalDevices'), 
          href: '/solutions/medical-devices', 
          description: navT('solutions.medicalDevicesDesc') 
        },
        { 
          name: navT('solutions.defenseSystems'), 
          href: '/solutions/defense-systems', 
          description: navT('solutions.defenseSystemsDesc') 
        }
      ]
    },
    { 
      key: 'cases',
      name: navT('cases.title'),
      href: '/cases',
      hasSubItems: true,
      subItems: [
        { 
          name: navT('cases.caseStudy1'), 
          href: '/cases/5g-base-station', 
          description: navT('cases.caseStudy1Desc') 
        },
        { 
          name: navT('cases.caseStudy2'), 
          href: '/cases/military-radar', 
          description: navT('cases.caseStudy2Desc') 
        },
        { 
          name: navT('cases.caseStudy3'), 
          href: '/cases/medical-imaging', 
          description: navT('cases.caseStudy3Desc') 
        }
      ]
    },
    { 
      key: 'support',
      name: navT('support.title'),
      href: '/support',
      hasSubItems: true,
      subItems: [
        { name: navT('support.faq'), href: '/support/faq' },
        { name: navT('support.docs'), href: '/support/docs' },
        { name: navT('support.contactSupport'), href: '/support/contact' }
      ]
    },
    { 
      key: 'about',
      name: navT('about'),
      href: '/about',
      hasSubItems: false
    },
    { 
      key: 'contact',
      name: navT('contact'),
      href: '/contact',
      hasSubItems: false
    }
  ];

  // 检查当前路径是否是导航项或其子项
  const isActive = (href: string, hasSubItems: boolean) => {
    if (pathname === href) return true;
    if (hasSubItems) {
      return pathname.startsWith(href);
    }
    return false;
  };

  // 处理菜单悬停
  const handleMouseEnter = (key: string) => {
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  // 关闭移动菜单
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  // 语言切换器组件
  const LanguageSwitcher = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const languages = [
      { code: 'en', label: 'EN' },
      { code: 'zh', label: '中文' },
      { code: 'es', label: 'ES' },
      { code: 'fr', label: 'FR' }
    ];
    
    useEffect(() => {
      if (menuOpen && menuRef.current) {
        gsap.fromTo(menuRef.current, 
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }, [menuOpen]);
    
    const handleLanguageChange = (lang: string) => {
      setCurrentLang(lang);
      setMenuOpen(false);
    };
    
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          className={`flex items-center px-3 py-2 group ${
            isCyberTheme 
              ? 'text-cyan-400 hover:text-cyan-300' 
              : 'text-sky-600 hover:text-sky-700'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Globe className="h-5 w-5 mr-1.5" />
          <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
        </button>
        
        {menuOpen && (
          <div 
            ref={menuRef}
            className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-50 ${
              isCyberTheme 
                ? 'bg-[#0a0e17] border border-cyan-400/30' 
                : 'bg-white border border-sky-200'
            }`}
          >
            {languages.map(lang => (
              <button
                key={lang.code}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  currentLang === lang.code 
                    ? isCyberTheme 
                      ? 'text-cyan-300 bg-cyan-400/10' 
                      : 'text-sky-700 bg-sky-50'
                    : isCyberTheme 
                      ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
                {currentLang === lang.code && (
                  <div className={`ml-2 w-1.5 h-1.5 rounded-full animate-breathe ${
                    isCyberTheme ? 'bg-cyan-400' : 'bg-sky-500'
                  }`}></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 主题切换按钮
  const ThemeToggle = () => {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={isCyberTheme 
          ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
          : 'text-sky-600 hover:bg-sky-100 hover:text-sky-700'
        }
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">切换主题</span>
      </Button>
    );
  };

  // 呼吸动画组件
  const BreathingIndicator = () => (
    <div className="flex items-center justify-center ml-1">
      {[0, 1, 2].map(i => (
        <div 
          key={i}
          className={`w-1.5 h-1.5 rounded-full mx-0.5 animate-breathe ${
            isCyberTheme ? 'bg-cyan-400' : 'bg-sky-500'
          }`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  // 折叠指示器
  const CollapsedMenuIndicator = () => (
    <div className="hidden md:flex items-center ml-2">
      {[0, 1, 2].map(i => (
        <div 
          key={i}
          className={`w-1 h-1 rounded-full mx-0.5 ${
            isCyberTheme ? 'bg-cyan-400' : 'bg-sky-400'
          }`}
        />
      ))}
    </div>
  );

  // 用户菜单组件
  const UserMenu = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    
    return (
      <div className="relative" ref={userMenuRef}>
        <Button
          variant="ghost"
          size="icon"
          className={isCyberTheme 
            ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
            : 'text-sky-600 hover:bg-sky-100 hover:text-sky-700'
          }
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <User className="h-5 w-5" />
        </Button>
        
        {userMenuOpen && (
          <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 overflow-hidden ${
            isCyberTheme 
              ? 'bg-[#0a0e17] border border-cyan-400/30' 
              : 'bg-white border border-sky-200'
          }`}>
            {loggedIn ? (
              <>
                <div className={`px-4 py-3 border-b ${
                  isCyberTheme ? 'border-cyan-400/20' : 'border-sky-100'
                }`}>
                  <p className={`text-sm font-medium ${
                    isCyberTheme ? 'text-cyan-300' : 'text-sky-700'
                  }`}>john.doe@example.com</p>
                  <p className={`text-xs mt-1 ${
                    isCyberTheme ? 'text-cyan-400' : 'text-sky-500'
                  }`}>Premium Account</p>
                </div>
                <Link
                  href="/profile"
                  className={`block px-4 py-2 text-sm ${
                    isCyberTheme 
                      ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                  onClick={() => setUserMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className={`block px-4 py-2 text-sm ${
                    isCyberTheme 
                      ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                  onClick={() => setUserMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  href="/settings"
                  className={`block px-4 py-2 text-sm ${
                    isCyberTheme 
                      ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </Link>
                <div className={`border-t ${
                  isCyberTheme ? 'border-cyan-400/20' : 'border-sky-100'
                }`}>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      isCyberTheme 
                        ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                        : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
                    }`}
                    onClick={() => {
                      setLoggedIn(false);
                      setUserMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block px-4 py-3 text-sm font-medium ${
                    isCyberTheme 
                      ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 border-b border-cyan-400/20' 
                      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700 border-b border-sky-100'
                  }`}
                  onClick={() => setUserMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`block px-4 py-3 text-sm ${
                    isCyberTheme 
                      ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                      : 'text-sky-600 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                  onClick={() => setUserMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? 'transform -translate-y-full' : 'transform translate-y-0'
      } ${
        isCyberTheme 
          ? 'bg-[#0a0e17] border-b border-cyan-400/20' 
          : 'bg-white border-b border-sky-200 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
              <div className={`rounded-xl w-10 h-10 flex items-center justify-center ${
                isCyberTheme 
                  ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_10px_#00f5d4]' 
                  : 'bg-gradient-to-br from-sky-500 to-sky-700 shadow-[0_0_10px_rgba(14,165,233,0.3)]'
              }`}>
                <span className={`font-bold text-lg ${
                  isCyberTheme ? 'text-[#0a0e17]' : 'text-white'
                }`}>RF</span>
              </div>
              <div className="ml-3">
                <div className={`text-lg font-bold tracking-wide ${
                  isCyberTheme ? 'text-cyan-300' : 'text-sky-700'
                }`}>{globalT('companyName')}</div>
                <div className={`text-xs tracking-wider ${
                  isCyberTheme ? 'text-cyan-400' : 'text-sky-500'
                }`}>{globalT('slogan')}</div>
              </div>
            </Link>
          </div>

          {/* 桌面导航中间部分 */}
          <div 
            ref={navItemsRef}
            className="hidden md:flex flex-1 justify-center items-center mx-4 transition-all duration-300"
          >
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
                        <>
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
                                {isActiveItem && <BreathingIndicator />}
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
                                          {isActiveSubItem && <BreathingIndicator />}
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
                                          {navT('learnMore')}
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
                        </>
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
                                {isActiveItem && <BreathingIndicator />}
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
          </div>

          {/* 折叠指示器 */}
          {searchExpanded && (
            <div className="hidden md:flex items-center mx-2">
              <CollapsedMenuIndicator />
            </div>
          )}

          {/* 右侧功能区 */}
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <SearchBar 
                placeholder={navT('searchPlaceholder')}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                cyberStyle={isCyberTheme}
              />
              <SearchResults 
                searchValue={searchValue} 
                navItems={navItems}
                navT={navT}
                isVisible={searchValue.length > 0}
                setSearchValue={setSearchValue}
                cyberStyle={isCyberTheme}
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              className={isCyberTheme 
                ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                : 'text-sky-600 hover:bg-sky-100 hover:text-sky-700'
              }
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
            <UserMenu />
            <Button 
              variant="ghost" 
              size="icon"
              className={isCyberTheme 
                ? 'text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300' 
                : 'text-sky-600 hover:bg-sky-100 hover:text-sky-700'
              }
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* 移动端搜索框 */}
        {searchOpen && (
          <div className="md:hidden">
            <div className={`relative py-3 px-4 ${
              isCyberTheme ? 'border-t border-cyan-400/20' : 'border-t border-sky-200'
            }`}>
              <Search className={`absolute left-7 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isCyberTheme ? 'text-cyan-400' : 'text-sky-500'
              }`} />
              <input
                type="text"
                placeholder={navT('searchPlaceholder')}
                className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isCyberTheme 
                    ? 'bg-[#0e1523] text-cyan-300 border-cyan-400/30 focus:ring-cyan-500' 
                    : 'bg-white text-sky-700 border-sky-300 focus:ring-sky-300'
                }`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
              />
              <SearchResults 
                searchValue={searchValue} 
                navItems={navItems}
                navT={navT}
                isVisible={searchValue.length > 0}
                setSearchValue={setSearchValue}
                isMobile={true}
                cyberStyle={isCyberTheme}
              />
            </div>
          </div>
        )}
      </div>

      {/* 移动端导航菜单 */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${
          isCyberTheme ? 'bg-[#0e1523] border-t border-cyan-400/20' : 'bg-white border-t border-sky-200'
        }`}>
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActiveItem = isActive(item.href, item.hasSubItems);
                
                return (
                  <li key={item.key}>
                    {item.hasSubItems ? (
                      <div>
                        <button
                          className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-medium ${
                            isActiveItem 
                              ? isCyberTheme 
                                ? 'text-cyan-300 border-l-2 border-cyan-400 pl-3' 
                                : 'text-sky-700 border-l-2 border-sky-500 pl-3'
                              : isCyberTheme 
                                ? 'text-cyan-400' 
                                : 'text-sky-600'
                          }`}
                          onClick={() => setActiveMenu(activeMenu === item.key ? null : item.key)}
                        >
                          <span className="flex items-center">
                            {item.name}
                            {isActiveItem && <BreathingIndicator />}
                          </span>
                          <div className="flex items-center">
                            <span className={`text-xs mr-2 ${
                              isCyberTheme ? 'text-cyan-500' : 'text-sky-500'
                            }`}>
                              <ChevronDown 
                                className={`h-4 w-4 transition-transform ${
                                  activeMenu === item.key ? 'rotate-180' : ''
                                }`} 
                              />
                            </span>
                          </div>
                        </button>
                        
                        {activeMenu === item.key && (
                          <div className={`ml-4 mt-1 space-y-2 pl-4 py-2 ${
                            isCyberTheme 
                              ? 'border-l border-cyan-400/20' 
                              : 'border-l border-sky-200'
                          }`}>
                            {item.subItems.map((subItem, index) => {
                              const isActiveSubItem = pathname === subItem.href;
                              
                              return (
                                <Link
                                  key={index}
                                  href={subItem.href}
                                  className={`block px-4 py-2 text-sm rounded-lg flex items-center ${
                                    isActiveSubItem 
                                      ? isCyberTheme 
                                        ? 'text-cyan-300 border-l-2 border-cyan-400 pl-3' 
                                        : 'text-sky-700 border-l-2 border-sky-500 pl-3'
                                      : isCyberTheme 
                                        ? 'text-cyan-400 hover:text-cyan-300' 
                                        : 'text-sky-600 hover:text-sky-700'
                                  }`}
                                  onClick={closeMobileMenu}
                                >
                                  {subItem.name}
                                  {isActiveSubItem && <BreathingIndicator />}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium flex items-center ${
                          isActiveItem 
                            ? isCyberTheme 
                              ? 'text-cyan-300 border-l-2 border-cyan-400 pl-3' 
                              : 'text-sky-700 border-l-2 border-sky-500 pl-3'
                            : isCyberTheme 
                              ? 'text-cyan-400 hover:text-cyan-300' 
                              : 'text-sky-600 hover:text-sky-700'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                        {isActiveItem && <BreathingIndicator />}
                      </Link>
                    )}
                  </li>
                );
              })}
              
              {/* 移动端用户菜单 */}
              <li className={`pt-3 mt-3 ${
                isCyberTheme ? 'border-t border-cyan-400/20' : 'border-t border-sky-200'
              }`}>
                <Link
                  href="/login"
                  className={`block px-4 py-3 text-sm font-medium ${
                    isCyberTheme ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-600 hover:text-sky-700'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`block px-4 py-3 text-sm ${
                    isCyberTheme ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-600 hover:text-sky-700'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}