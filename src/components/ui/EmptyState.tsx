import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon = 'search-outline', title, message, actionLabel, onAction }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View className="flex-1 items-center justify-center p-8 gap-4">
      <View className={`w-20 h-20 rounded-full items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        <Ionicons name={icon} size={36} color="#94a3b8" />
      </View>
      <View className="items-center gap-2">
        <Text className={`text-xl font-bold text-center ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          {title}
        </Text>
        {message && (
          <Text className="text-slate-500 text-sm text-center leading-5">{message}</Text>
        )}
      </View>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} />
      )}
    </View>
  );
}
