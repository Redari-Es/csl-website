import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isCyberTheme }: { isCyberTheme: boolean }) {
  const { theme, setTheme } = useTheme();
  
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
}