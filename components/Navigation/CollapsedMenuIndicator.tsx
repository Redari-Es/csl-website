'use client';

export default function CollapsedMenuIndicator({ themeStyle }: { themeStyle: boolean }) {
  return (
    <div className="hidden md:flex items-center ml-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={`w-1 h-1 rounded-full mx-0.5 ${themeStyle ? 'bg-cyan-400' : 'bg-sky-400'
            }`}
        />
      ))}
    </div>
  );
}