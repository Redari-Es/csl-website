// 主题颜色配置
export const themeColors = {
	dark: {
		background: "#0a0e17",
		border: "border-cyan-400/20",
		textPrimary: "text-cyan-300",
		textSecondary: "text-cyan-400",
		textHover: "text-cyan-200",
		bgHover: "hover:bg-cyan-400/10",
		borderColor: "border-cyan-400/30",
		accent: "bg-cyan-400",
		searchBg: "bg-[#0e1523]",
		searchBorder: "border-cyan-400/30",
		searchFocus: "focus:ring-cyan-500",
		searchText: "text-cyan-300",
		menuBg: "bg-[#0e1523]",
		menuBorder: "border-cyan-400/20",
		indicator: "bg-cyan-400"
	},
	light: {
		background: "bg-white",
		border: "border-sky-500",
		textPrimary: "text-gray-900",
		textSecondary: "text-sky-600",
		textHover: "text-sky-700",
		bgHover: "hover:bg-sky-100",
		borderColor: "border-sky-200",
		accent: "bg-sky-500",
		searchBg: "bg-white",
		searchBorder: "border-sky-300",
		searchFocus: "focus:ring-sky-300",
		searchText: "text-gray-700",
		menuBg: "bg-white",
		menuBorder: "border-sky-200",
		indicator: "bg-sky-500"
	}
};

export type ThemeStyle = keyof typeof themeColors;
