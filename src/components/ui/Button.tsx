import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = TouchableOpacityProps & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

const variantClasses: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-ocean-500 active:bg-ocean-600',
    text: 'text-white font-semibold',
  },
  secondary: {
    container: 'bg-lagoon-500 active:bg-lagoon-600',
    text: 'text-white font-semibold',
  },
  outline: {
    container: 'border border-ocean-500 bg-transparent active:bg-ocean-50',
    text: 'text-ocean-500 font-semibold',
  },
  ghost: {
    container: 'bg-transparent active:bg-slate-100',
    text: 'text-ocean-500 font-medium',
  },
  danger: {
    container: 'bg-coral-500 active:bg-coral-600',
    text: 'text-white font-semibold',
  },
};

const sizeClasses: Record<Size, { container: string; text: string }> = {
  sm: { container: 'px-3 py-2 rounded-lg', text: 'text-sm' },
  md: { container: 'px-5 py-3 rounded-xl', text: 'text-base' },
  lg: { container: 'px-6 py-4 rounded-2xl', text: 'text-lg' },
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  className,
  ...props
}: Props) {
  const v = variantClasses[variant];
  const s = sizeClasses[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`${v.container} ${s.container} flex-row items-center justify-center gap-2 ${fullWidth ? 'w-full' : 'self-start'} ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <Text className={`${v.text} ${s.text}`}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
