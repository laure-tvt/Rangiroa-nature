import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
};

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  className,
  ...props
}: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const isPassword = secureTextEntry !== undefined;

  return (
    <View className="gap-1.5">
      {label && (
        <Text className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center rounded-xl border px-4 h-12 ${
          error
            ? 'border-coral-500'
            : isDark
            ? 'border-slate-700 bg-slate-800'
            : 'border-slate-200 bg-white'
        } ${className ?? ''}`}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color={isDark ? '#94a3b8' : '#64748b'}
            style={{ marginRight: 8 }}
          />
        )}
        <TextInput
          className={`flex-1 text-base ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
          placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
          secureTextEntry={isPassword ? isSecure : undefined}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={isDark ? '#94a3b8' : '#64748b'}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons
              name={rightIcon}
              size={18}
              color={isDark ? '#94a3b8' : '#64748b'}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-coral-500 text-xs">{error}</Text>
      )}
    </View>
  );
}
