// 主题颜色配置
interface ThemeConfig {
  textPrimary: string;
  searchBorder: string;
  searchFocus: string;
  searchText: string;
  // 其他属性...
}
export const themeColors = {
  dark: {
    background: "#0a0e17",
    cardBackground: "from-black to-gray-800",
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
    indicator: "bg-cyan-400",
    filterBg: "bg-gradient-to-r from-cyan-800 to-blue-900",
    button: "bg-cyan-500 hover:bg-cyan-600 text-white",
    badge: "bg-cyan-500",
	testimonialCard: "bg-gradient-to-b from-black to-gray-800 border-cyan-500",
	avatarBackground: "bg-gray-600",
    starFilled: "text-cyan-500"
  },
  light: {
    background: "#ffffff",
    cardBackground: "from-gray-100 to-gray-200",
    border: "border-sky-200",
    textPrimary: "text-gray-900",
    textSecondary: "text-sky-600",
    textHover: "text-sky-700",
    bgHover: "hover:bg-sky-50",
    borderColor: "border-sky-200",
    accent: "bg-sky-500",
    searchBg: "bg-white",
    searchBorder: "border-sky-300",
    searchFocus: "focus:ring-sky-300",
    searchText: "text-gray-700",
    menuBg: "bg-white",
    menuBorder: "border-sky-200",
    indicator: "bg-sky-500",
    filterBg: "bg-gradient-to-r from-blue-100 to-sky-200",
    button: "bg-sky-500 hover:bg-sky-600 text-white",
    badge: "bg-sky-500",
	 testimonialCard: "bg-gradient-to-b from-white to-gray-100 border-cyan-400",
	 avatarBackground: "bg-gray-300",
    starFilled: "text-cyan-400"
  }
};

export type ThemeStyle = keyof typeof themeColors;