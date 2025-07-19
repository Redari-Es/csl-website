import Link from 'next/link';
import { useTheme } from "next-themes";

export default function Logo({ 
  globalT, 
  closeMobileMenu,
  isCyberTheme 
}: { 
  globalT: any, 
  closeMobileMenu: () => void,
  isCyberTheme: boolean 
}) {
  return (
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
  );
}