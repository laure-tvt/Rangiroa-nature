import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

export type POI = {
  id: number;
  x: string;   // e.g. '20%'
  y: string;   // e.g. '35%'
  icon: string;
  label: string;
  category: string;
  description?: string;
};

type Props = {
  poi: POI;
  onPress: (poi: POI) => void;
  containerWidth: number;
  containerHeight: number;
};

export default function POIMarker({ poi, onPress, containerWidth, containerHeight }: Props) {
  const bounce     = useSharedValue(0);
  const pulsScale  = useSharedValue(1);

  // Micro-bounce idle toutes les ~3 s avec décalage aléatoire par marker
  useEffect(() => {
    const initialDelay = (poi.id * 400) % 3000;
    bounce.value = withDelay(
      initialDelay,
      withRepeat(
        withSequence(
          withTiming(-7, { duration: 280, easing: Easing.inOut(Easing.sin) }),
          withTiming(0,  { duration: 280, easing: Easing.inOut(Easing.sin) }),
          withDelay(2400, withTiming(0, { duration: 0 })),
        ),
        -1,
        false,
      ),
    );
  }, [bounce, poi.id]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
      { scale: pulsScale.value },
    ],
  }));

  const handlePress = () => {
    // Pulse rapide au tap
    pulsScale.value = withSequence(
      withTiming(1.35, { duration: 120, easing: Easing.out(Easing.quad) }),
      withTiming(1,    { duration: 120, easing: Easing.in(Easing.quad) }),
    );
    onPress(poi);
  };

  // Convertit '20%' → valeur en pixels
  const left = (parseFloat(poi.x) / 100) * containerWidth  - 22;
  const top  = (parseFloat(poi.y) / 100) * containerHeight - 22;

  return (
    <Animated.View style={[styles.wrapper, { left, top }, animatedStyle]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85} style={styles.badge}>
        <Text style={styles.emoji}>{poi.icon}</Text>
      </TouchableOpacity>
      <Text style={styles.label} numberOfLines={1}>{poi.label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: 44,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
    maxWidth: 72,
  },
});
