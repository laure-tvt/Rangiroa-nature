import React, { useEffect, useRef, useCallback } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet, Easing } from 'react-native';

export type POI = {
  id: number;
  x: string;
  y: string;
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
  const bounce    = useRef(new Animated.Value(0)).current;
  const pulsScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const initialDelay = (poi.id * 400) % 3000;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -7, duration: 280, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0,  duration: 280, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.delay(2400),
      ]),
    );
    const timer = setTimeout(() => loop.start(), initialDelay);
    return () => { clearTimeout(timer); loop.stop(); };
  }, [bounce, poi.id]);

  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(pulsScale, { toValue: 1.35, duration: 120, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(pulsScale, { toValue: 1,    duration: 120, easing: Easing.in(Easing.quad),  useNativeDriver: true }),
    ]).start();
    onPress(poi);
  }, [pulsScale, onPress, poi]);

  const left = (parseFloat(poi.x) / 100) * containerWidth  - 22;
  const top  = (parseFloat(poi.y) / 100) * containerHeight - 22;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { left, top },
        { transform: [{ translateY: bounce }, { scale: pulsScale }] },
      ]}
    >
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
