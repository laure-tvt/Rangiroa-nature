import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

type Props = {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
};

export function LoadingSpinner({ size = 'large', message, fullScreen = false }: Props) {
  return (
    <View className={`items-center justify-center gap-3 ${fullScreen ? 'flex-1' : 'p-8'}`}>
      <ActivityIndicator size={size} color="#0ea5e9" />
      {message && (
        <Text className="text-slate-500 text-sm text-center">{message}</Text>
      )}
    </View>
  );
}
