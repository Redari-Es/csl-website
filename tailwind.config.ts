import { HeightIcon } from "@radix-ui/react-icons";
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	  container: {
		  center: true,
		  padding: '2rem',
		  screens: {
			  '2xl':'1400px'
		  }
	  },
  	extend: {
  		colors: {
        'dark-bg': '#0a0e17',
        'dark-menu-bg': '#0e1523',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to:{height:'var(--radix-accordion-content-height)'}
				},
				'accordion-up': {
					from:{height:'var(--radix-accordion-content-height)'},
					to: { height: '0' },
				}
			},
			animation: {
				'accordion-down':'accordion-down 0.2s ease-out',
				'accordion-up':'accordion-up 0.2s ease-out',
				 // 添加自定义动画
        'blob-dark': 'blob 12s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        'blob-light': 'blob 10s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955)',
			},
			 backgroundImage: {
        // 添加网格背景
        'grid-dark': `linear-gradient(to right, rgba(56, 189, 248, 0.1) 1px, transparent 1px), 
                     linear-gradient(to bottom, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
        'grid-light': `linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px), 
                      linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
      },
      textShadow: {
        // 添加文字发光效果
        'glow-dark': '0 0 8px rgba(103, 232, 249, 0.8)',
        'glow-light': '0 0 6px rgba(56, 189, 248, 0.6)',
      }
  	}
  },
  plugins: [
	 // 添加文字阴影插件
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-glow-dark': {
          textShadow: '0 0 8px rgba(103, 232, 249, 0.8)',
        },
        '.text-glow-light': {
          textShadow: '0 0 6px rgba(56, 189, 248, 0.6)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
	require("tailwindcss-animate"),require('@tailwindcss/typography')],
} satisfies Config
export default config;
