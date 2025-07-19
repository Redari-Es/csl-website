export default function BreathingIndicator({ isCyberTheme }: { isCyberTheme: boolean }) {
  return (
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
}