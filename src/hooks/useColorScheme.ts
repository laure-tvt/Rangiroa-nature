import { useColorScheme as useNativeColorScheme } from 'react-native';
import { Colors } from '../constants/theme';

export function useColorScheme() {
  const scheme = useNativeColorScheme() ?? 'light';
  return { colorScheme: scheme, colors: Colors[scheme] };
}
