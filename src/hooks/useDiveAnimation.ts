import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

export function useDiveAnimation() {
  const scale      = useRef(new Animated.Value(1)).current;
  const rotateX    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animatedMapStyle = {
    transform: [
      { perspective: 800 },
      { scale },
      {
        rotateX: rotateX.interpolate({
          inputRange: [0, 90],
          outputRange: ['0deg', '90deg'],
        }),
      },
      { translateY },
    ],
  };

  const triggerDive = useCallback((onPeak: () => void) => {
    const easeInOut = Easing.inOut(Easing.cubic);
    const easeIn    = Easing.in(Easing.cubic);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale,      { toValue: 2.5,  duration: 300, easing: easeInOut, useNativeDriver: false }),
        Animated.timing(scale,      { toValue: 4.5,  duration: 300, easing: easeIn,    useNativeDriver: false }),
      ]),
      Animated.sequence([
        Animated.timing(rotateX,    { toValue: 15,   duration: 300, easing: easeInOut, useNativeDriver: false }),
        Animated.timing(rotateX,    { toValue: 28,   duration: 300, easing: easeIn,    useNativeDriver: false }),
      ]),
      Animated.sequence([
        Animated.timing(translateY, { toValue: -40,  duration: 300, easing: easeInOut, useNativeDriver: false }),
        Animated.timing(translateY, { toValue: -180, duration: 300, easing: easeIn,    useNativeDriver: false }),
      ]),
    ]).start(({ finished }) => { if (finished) onPeak(); });
  }, [scale, rotateX, translateY]);

  const resetDive = useCallback(() => {
    const ease = Easing.out(Easing.cubic);
    Animated.parallel([
      Animated.timing(scale,      { toValue: 1, duration: 450, easing: ease, useNativeDriver: false }),
      Animated.timing(rotateX,    { toValue: 0, duration: 450, easing: ease, useNativeDriver: false }),
      Animated.timing(translateY, { toValue: 0, duration: 450, easing: ease, useNativeDriver: false }),
    ]).start();
  }, [scale, rotateX, translateY]);

  return { animatedMapStyle, triggerDive, resetDive };
}
