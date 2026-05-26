import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  const colorScheme = useNativeColorScheme();
  return colorScheme ?? 'light';
}

export function useThemeColors() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    isDark,
    background: isDark ? '#0f172a' : '#f8fafc',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#334155' : '#e2e8f0',
    primary: '#0ea5e9',
    primaryDark: '#0369a1',
    tabBar: isDark ? '#0f172a' : '#ffffff',
    tabBarBorder: isDark ? '#1e293b' : '#e2e8f0',
  };
}
