// app/global-error.tsx
'use client';
import CyberBackground from '@/components/CyberBackground';
import { useEffect, useRef } from 'react';
import {Link} from '@/i18n/navigation';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import {useTranslations} from 'next-intl'

export default function GlobalError({ error, reset }: any) {
  // const t=useTranslations('error')
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.92, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }
    );
  }, [error]);

  return (
  
    <CyberBackground>
      <div
        ref={panelRef}
        className="w-[90%] max-w-xs rounded-2xl border border-cyan-400/40 bg-slate-900/60 p-6 text-center shadow-[0_0_30px_#00f5d4] backdrop-blur-xl"
      >
        <AlertTriangle className="mx-auto h-14 w-14 text-red-400 drop-shadow-[0_0_6px_#f87171]" />
        <h1 className="text-2xl font-bold tracking-widest text-cyan-300">
          CSL SYSTEM ERROR
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          当前系统页面异常，请稍后重试
        </p>
        <hr className="my-4 border-slate-700" />
        <p className="font-mono text-xs text-slate-300">
          Digest:{' '}
          <span className="text-cyan-400">{error.digest ?? 'N/A'}</span>
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-md border border-cyan-400 bg-transparent px-4 py-2 text-xs font-semibold text-cyan-300 shadow-[0_0_10px_#00f5d4,inset_0_0_6px_#00f5d4] transition hover:bg-cyan-400/10"
          >
            <RotateCcw size={16} />
            重试
          </button>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-900 shadow-[0_0_10px_#00f5d4] transition hover:bg-cyan-500"
          >
            <Home size={16} />
            首页
          </Link>
        </div>
      </div>
    </CyberBackground>

  );
}