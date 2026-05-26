import React from 'react';
import { View, ViewProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = ViewProps & {
  children: React.ReactNode;
  padding?: boolean;
};

export function Card({ children, padding = true, className, ...props }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View
      className={`rounded-2xl shadow-sm ${isDark ? 'bg-slate-800' : 'bg-white'} ${padding ? 'p-4' : ''} ${className ?? ''}`}
      {...props}
    >
      {children}
    </View>
  );
}
