// themeConfig.ts

// 主题颜色配置
export const themeColors = {
  dark: {
    background: "bg-[#0a0e17]", // 深色背景
    border: "border-cyan-400/20", // 边框颜色
    textPrimary: "text-cyan-300", // 主要文字颜色
    textSecondary: "text-cyan-400", // 次要文字颜色
    textHover: "text-cyan-200", // 悬停文字颜色
    bgHover: "hover:bg-cyan-400/10", // 悬停背景
    borderColor: "border-cyan-400/30", // 边框颜色
    accent: "bg-cyan-400", // 强调色
    searchBg: "bg-[#0e1523]", // 搜索框背景
    searchBorder: "border-cyan-400/30", // 搜索框边框
    searchFocus: "focus:ring-cyan-500", // 搜索框聚焦效果
    searchText: "text-cyan-300", // 搜索框文字
    menuBg: "bg-[#0e1523]", // 菜单背景
    menuBorder: "border-cyan-400/20", // 菜单边框
    indicator: "bg-cyan-400", // 指示器颜色
    heroBg: "bg-gradient-to-br from-cyan-900/20 to-emerald-900/20", // Hero背景
    heroAccent: "bg-cyan-500/10", // Hero强调色
    heroText: "text-cyan-300", // Hero文字
    heroMuted: "text-cyan-400" // Hero次要文字
  },
  light: {
    background: "bg-white", // 浅色背景
    border: "border-sky-500", // 边框颜色
    textPrimary: "text-gray-900", // 主要文字颜色
    textSecondary: "text-sky-600", // 次要文字颜色
    textHover: "text-sky-700", // 悬停文字颜色
    bgHover: "hover:bg-sky-100", // 悬停背景
    borderColor: "border-sky-200", // 边框颜色
    accent: "bg-sky-500", // 强调色
    searchBg: "bg-white", // 搜索框背景
    searchBorder: "border-sky-300", // 搜索框边框
    searchFocus: "focus:ring-sky-300", // 搜索框聚焦效果
    searchText: "text-gray-700", // 搜索框文字
    menuBg: "bg-white", // 菜单背景
    menuBorder: "border-sky-200", // 菜单边框
    indicator: "bg-sky-500", // 指示器颜色
    heroBg: "bg-gradient-to-br from-sky-100/50 to-emerald-100/50", // Hero背景
    heroAccent: "bg-sky-400/20", // Hero强调色
    heroText: "text-sky-900", // Hero文字
    heroMuted: "text-sky-700" // Hero次要文字
  }
};

// 主题动画配置
export const themeAnimations = {
  blob: {
    dark: "animate-blob-dark",
    light: "animate-blob-light"
  },
  grid: {
    dark: "bg-grid-dark",
    light: "bg-grid-light"
  },
  textGlow: {
    dark: "text-glow-dark",
    light: "text-glow-light"
  }
};

// 主题类型定义
export type ThemeStyle = keyof typeof themeColors;
export type ThemeColors = typeof themeColors.dark | typeof themeColors.light;