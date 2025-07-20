'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTheme } from 'next-themes';
import Autoplay from 'embla-carousel-autoplay';
import { themeColors } from '@/config/themeConfig';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  accentColor: string;
  image: string;
}

export default function HeroSlider() {
  const { theme } = useTheme();
  const themeConfig = themeColors[theme as 'light' | 'dark'] || themeColors.dark;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const t = useTranslations('slideHero');
  const carouselRef = useRef<any>(null);

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: t('slide1.title'),
      subtitle: t('slide1.subtitle'),
      ctaPrimary: t('slide1.ctaPrimary'),
      ctaSecondary: t('slide1.ctaSecondary'),
      accentColor: 'bg-blue-500',
      image: "/images/pic-1.webp",
    },
    {
      id: 2,
      title: t('slide2.title'),
      subtitle: t('slide2.subtitle'),
      ctaPrimary: t('slide2.ctaPrimary'),
      ctaSecondary: t('slide2.ctaSecondary'),
      accentColor: 'bg-amber-500',
      image: "/images/pic-2.png",
    },
    {
      id: 3,
      title: t('slide3.title'),
      subtitle: t('slide3.subtitle'),
      ctaPrimary: t('slide3.ctaPrimary'),
      ctaSecondary: t('slide3.ctaSecondary'),
      accentColor: 'bg-emerald-500',
      image: "/images/pic-3.png",
    },
  ];

  const bottomGlassBg = theme === 'dark' ? 'bg-cyan-900/90' : 'bg-gray-100/90';
  const waveColor = theme === 'dark' ? 'fill-cyan-600' : 'fill-gray-300';

  const handleSlideChange = (api: any) => {
    setActiveIndex(api.selectedScrollSnap());
  };

  const handleButtonClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      document.querySelector<HTMLElement>('.carousel-previous')?.click();
    } else {
      document.querySelector<HTMLElement>('.carousel-next')?.click();
    }
  };

  const handleDotClick = (index: number) => {
    const carousel = document.querySelector<HTMLElement>('.carousel');
    if (carousel) {
      carousel.style.scrollSnapType = 'none';
      document.querySelectorAll<HTMLElement>('.carousel-item')[index]?.scrollIntoView({
        behavior: 'smooth'
      });
      setTimeout(() => {
        if (carousel) carousel.style.scrollSnapType = '';
      }, 1000);
    }
  };

  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden">
      <Carousel
        ref={carouselRef}
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={() => {
          plugin.current.stop();
          setIsPlaying(false);
        }}
        onMouseLeave={() => {
          plugin.current.reset();
          setIsPlaying(true);
        }}
        opts={{
          onSelect: handleSlideChange,
        }}
      >
        <CarouselContent className="h-[100vh]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-white/40'}`} />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-40 backdrop-blur-md z-10 ${bottomGlassBg}`}
                  style={{ clipPath: 'polygon(0 50%, 100% 20%, 100% 100%, 0% 100%)' }}
                >
                  <div className="absolute top-0 left-0 w-full overflow-hidden h-8">
                    <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={waveColor} />
                      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={waveColor} />
                      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={waveColor} />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8">
                <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12">
                  <div className="w-full max-w-3xl text-center flex flex-col items-center gap-6 md:gap-8">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {slide.title}
                    </h1>
                    <p className={`text-lg md:text-xl lg:text-2xl max-w-2xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                      <Button
                        size="lg"
                        className={`px-6 py-5 md:px-8 md:py-6 rounded-full transition-colors shadow-lg text-base md:text-lg font-semibold w-full sm:w-auto ${
                          theme === 'dark'
                            ? `${slide.accentColor} hover:bg-cyan-300 text-gray-900 shadow-cyan-500/30`
                            : `${slide.accentColor} hover:bg-sky-400 text-white shadow-sky-500/30`
                        }`}
                      >
                        {slide.ctaPrimary}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className={`px-6 py-5 md:px-8 md:py-6 rounded-full text-base md:text-lg font-semibold w-full sm:w-auto ${
                          theme === 'dark'
                            ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200'
                            : 'border-sky-500 text-sky-500 hover:bg-sky-100 hover:text-sky-700'
                        }`}
                      >
                        {slide.ctaSecondary}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 底部导航 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 md:gap-6">
          <button
            onClick={() => handleButtonClick('prev')}
            className={`
              w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
              transition-all duration-300
              border-2 ${theme === 'dark' ? 'border-cyan-400' : 'border-sky-500'} 
              hover:${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-sky-500/20'}
              hover:shadow-lg
              active:scale-95
              ${theme === 'dark' ? 'shadow-cyan-500/30' : 'shadow-sky-500/30'}
              bg-transparent
            `}
            aria-label="上一张"
          >
            <ChevronLeft
              size={24}
              className={`font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-sky-500'}`}
            />
          </button>

          <div className="flex gap-2 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${index === activeIndex ? 
                    `h-3 w-3 scale-125 ${theme === 'dark' ? 'bg-cyan-400' : 'bg-sky-500'}` : 
                    `h-2 w-2 ${theme === 'dark' ? 'bg-cyan-400/30 hover:bg-cyan-400/50' : 'bg-sky-500/30 hover:bg-sky-500/50'}`}
                  ${index === activeIndex ? 'cursor-default' : 'cursor-pointer'}
                `}
                aria-label={`跳转到第 ${index + 1} 张幻灯片`}
              />
            ))}
          </div>

          <button
            onClick={() => handleButtonClick('next')}
            className={`
              w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
              transition-all duration-300
              border-2 ${theme === 'dark' ? 'border-cyan-400' : 'border-sky-500'} 
              hover:${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-sky-500/20'}
              hover:shadow-lg
              active:scale-95
              ${theme === 'dark' ? 'shadow-cyan-500/30' : 'shadow-sky-500/30'}
              bg-transparent
            `}
            aria-label="下一张"
          >
            <ChevronRight
              size={24}
              className={`font-bold ${theme === 'dark' ? 'text-cyan-300' : 'text-sky-500'}`}
            />
          </button>
        </div>

        <CarouselPrevious className="carousel-previous hidden" />
        <CarouselNext className="carousel-next hidden" />
      </Carousel>

      {/* 细线进度条 - 基于当前幻灯片索引 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-gray-300/30 dark:bg-gray-600/30">
        <div 
          className={`h-full ${themeConfig.accent} transition-all duration-300`}
          style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}