'use client';
import CyberBackground from '@/components/CyberBackground';
import { useEffect, useRef } from 'react';
import {Link} from '@/i18n/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';;
import gsap from 'gsap';

export default function NotFound() {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.92, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }
    );
  }, []);

  return (
    

    <CyberBackground>
      <div
        ref={panelRef}
        className="w-[90%] max-w-xs rounded-2xl border border-cyan-400/40 bg-slate-900/60 p-6 text-center shadow-[0_0_30px_#00f5d4] backdrop-blur-xl"
      >
        <h1 className="text-6xl font-bold tracking-widest text-cyan-300">404</h1>
        <p className="mt-2 text-lg font-semibold text-slate-200">Page Not Found</p>
        <p className="mt-1 text-sm text-slate-400">
          The requested spectrum frequency is out of range.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-cyan-400 px-4 py-2 text-cyan-300 shadow-[0_0_10px_#00f5d4,inset_0_0_6px_#00f5d4] transition hover:bg-cyan-400/10"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Go back home
        </Link>
      </div>
    </CyberBackground>
 
  );

}