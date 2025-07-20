import Link from 'next/link';

interface LogoProps {
	companyName: string;
	slogan: string;
	isDarkTheme: boolean;
	onClick: () => void;
}

export default function Logo({
	companyName,
	slogan,
	isDarkTheme,
	onClick
}: LogoProps) {
	const textPrimary = isDarkTheme ? 'text-cyan-300' : 'text-sky-700';
	const textSecondary = isDarkTheme ? 'text-cyan-400' : 'text-sky-500';
	return (
		<div className="flex items-center flex-shrink-0">
			<Link href="/" className="flex items-center" onClick={onClick}>
				<div className={`rounded-xl w-10 h-10 flex items-center justify-center ${isDarkTheme
					? 'bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_10px_#00f5d4]'
					: 'bg-gradient-to-br from-sky-500 to-sky-700 shadow-[0_0_10px_rgba(14,165,233,0.3)]'
					}`}>
					<span className={`font-bold text-lg ${isDarkTheme ? 'text-[#0a0e17]' : 'text-white'
						}`}>CSL</span>
				</div>
				<div className="ml-3">
					<div className={`text-lg font-bold tracking-wide ${isDarkTheme ? 'text-cyan-300' : 'text-sky-700'
						}`}>{companyName}</div>
					<div className={`text-xs tracking-wider ${isDarkTheme ? 'text-cyan-400' : 'text-sky-500'
						}`}>{slogan}</div>
				</div>
			</Link>
		</div>
	);
}
