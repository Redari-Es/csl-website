// components/Animations/BackgroundAnimation.tsx
'use client';

import gsap from 'gsap';
import { useTheme } from 'next-themes';
import { useRef, useEffect } from 'react';

export default function BackgroundAnimation() {
  const { theme, systemTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  
  // 获取当前实际使用的主题
  const currentTheme = theme === 'system' ? systemTheme || 'dark' : theme || 'dark';
  const isDarkMode = currentTheme === 'dark';
  
  // 获取主题颜色
  const getThemeColors = () => {
    if (isDarkMode) {
      return {
        primary: 'rgba(103, 232, 249, 0.2)',
        secondary: 'rgba(56, 189, 248, 0.2)',
        accent: 'rgba(103, 232, 249, 0.2)',
        grid: 'rgba(103, 232, 249, 0.1)',
      };
    }
    return {
      primary: 'rgba(14, 165, 233, 0.2)',
      secondary: 'rgba(2, 132, 199, 0.2)',
      accent: 'rgba(14, 165, 233, 0.2)',
      grid: 'rgba(14, 165, 233, 0.1)',
    };
  };

  // 应用颜色更新
  const applyColorUpdates = () => {
    const colors = getThemeColors();
    
    if (blob1Ref.current) blob1Ref.current.style.backgroundColor = colors.primary;
    if (blob2Ref.current) blob2Ref.current.style.backgroundColor = colors.secondary;
    if (blob3Ref.current) blob3Ref.current.style.backgroundColor = colors.accent;
    
    if (gridRef.current) {
      gridRef.current.style.backgroundImage = 
        `linear-gradient(to right, ${colors.grid} 1px, transparent 1px), 
         linear-gradient(to bottom, ${colors.grid} 1px, transparent 1px)`;
    }
  };

  // 初始化动画
  useEffect(() => {
    if (!blob1Ref.current || !blob2Ref.current || !blob3Ref.current || !gridRef.current) return;
    
    // 应用初始颜色
    applyColorUpdates();
    
    // 创建动画时间线
    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true });
    
    // Blob 1 动画 - 左上角
    tl.to(blob1Ref.current, {
      x: 30,
      y: 40,
      scale: 1.15,
      duration: 12,
      ease: "sine.inOut"
    }, 0)
    .to(blob1Ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 12,
      ease: "sine.inOut"
    }, 12);
    
    // Blob 2 动画 - 右上角
    tl.to(blob2Ref.current, {
      x: -40,
      y: 50,
      scale: 1.25,
      duration: 15,
      ease: "sine.inOut"
    }, 3)
    .to(blob2Ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 15,
      ease: "sine.inOut"
    }, 18);
    
    // Blob 3 动画 - 底部中央
    tl.to(blob3Ref.current, {
      x: 50,
      y: -60,
      scale: 1.2,
      duration: 18,
      ease: "sine.inOut"
    }, 6)
    .to(blob3Ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 18,
      ease: "sine.inOut"
    }, 24);
    
    // 网格背景动画 - 更平滑的移动
    const gridAnimation = gsap.to(gridRef.current, {
      backgroundPosition: "40px 40px",
      duration: 40,
      repeat: -1,
      ease: "none"
    });
    
    // 清理函数
    return () => {
      tl.kill();
      gridAnimation.kill();
    };
  }, []); // 只在组件挂载时初始化一次

  // 当主题变化时更新颜色
  useEffect(() => {
    applyColorUpdates();
  }, [theme, systemTheme]); // 依赖theme和systemTheme

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* 网格背景 */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0'
        }}
      />
      
      {/* 动态装饰元素 */}
      <div
        ref={blob1Ref}
        className="absolute top-0 left-0 w-64 h-64 rounded-full mix-blend-overlay filter blur-3xl"
      />
      <div
        ref={blob2Ref}
        className="absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-overlay filter blur-3xl"
      />
      <div
        ref={blob3Ref}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full mix-blend-overlay filter blur-3xl"
      />
    </div>
  );
}