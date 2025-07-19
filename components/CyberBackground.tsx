// components/CyberBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ---------- 粒子流 ---------- */
function ParticleRiver({ idx }: { idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.set(ref.current, { x: '-150%' });
    gsap.to(ref.current, {
      x: '150%',
      duration: 4.5, // 增加动画持续时间，使流速变慢
      repeat: -1,
      ease: 'none',
      delay: idx * 0.3,
    });
  }, [idx]);

  return (
    <div
      ref={ref}
      className="absolute top-[calc(50%+var(--y))] left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-[var(--o)]" // 减小高度，使粒子流更细
      style={{
        '--y': `${(idx - 4.5) * 18}px`,
        '--o': 0.35 + idx * 0.04,
      } as React.CSSProperties}
    />
  );
}

/* ---------- 能量环 ---------- */
function EnergyRing() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, {
      rotateX: 360,
      rotateY: 360,
      duration: 15,
      repeat: -1,
      ease: 'none',
    });
    gsap.to(ref.current, {
      scale: 1.12,
      boxShadow:
        '0 0 20px 0px #00f5d4, 0 0 40px 8px #00f5d4, inset 0 0 20px #00f5d4',
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut',
    });
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0 m-auto w-[70vmin] h-[70vmin] rounded-full border-2 border-cyan-400/60 pointer-events-none"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    />
  );
}

export default function CyberBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      {/* 背景光晕 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,212,0.1)_0%,rgba(0,0,0,0.8)_70%)] pointer-events-none" />

      {/* 粒子光束 */}
      {Array.from({ length: 16 }).map((_, i) => (
        <ParticleRiver key={i} idx={i} />
      ))}

      {/* 能量环 */}
      <EnergyRing />

      {/* 主内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}