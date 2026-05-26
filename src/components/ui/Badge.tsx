import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  label: string;
  color?: string;
  textColor?: string;
  size?: 'sm' | 'md';
};

export function Badge({ label, color = '#0ea5e9', textColor = '#fff', size = 'sm' }: Props) {
  const paddingClass = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <View
      className={`${paddingClass} rounded-full self-start`}
      style={{ backgroundColor: color }}
    >
      <Text className={`${textClass} font-semibold`} style={{ color: textColor }}>
        {label}
      </Text>
    </View>
  );
}
