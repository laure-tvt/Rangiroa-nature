import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useCallback } from 'react';

export function useDiveAnimation() {
  const scale      = useSharedValue(1);
  const rotateX    = useSharedValue(0);
  const translateY = useSharedValue(0);
  const progress   = useSharedValue(0);

  const animatedMapStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { scale:      scale.value },
      { rotateX:    `${rotateX.value}deg` },
      { translateY: translateY.value },
    ],
  }));

  /**
   * Déclenche l'animation de plongée 3D vers un point.
   * onPeak() est appelé quand la carte a "plongé" (avant le retour).
   */
  const triggerDive = useCallback((onPeak: () => void) => {
    const easeInOut = Easing.inOut(Easing.cubic);
    const easeIn    = Easing.in(Easing.cubic);

    scale.value = withSequence(
      withTiming(2.5, { duration: 300, easing: easeInOut }),
      withTiming(4.5, { duration: 300, easing: easeIn }),
    );
    rotateX.value = withSequence(
      withTiming(15, { duration: 300, easing: easeInOut }),
      withTiming(28, { duration: 300, easing: easeIn }),
    );
    translateY.value = withSequence(
      withTiming(-40, { duration: 300, easing: easeInOut }),
      withTiming(-180, { duration: 300, easing: easeIn }),
    );

    // Callback JS déclenché après les 600 ms de plongée
    progress.value = 0;
    progress.value = withTiming(
      1,
      { duration: 600 },
      (finished) => { if (finished) runOnJS(onPeak)(); },
    );
  }, [progress, rotateX, scale, translateY]);

  /** Réinitialise la carte après fermeture du modal */
  const resetDive = useCallback(() => {
    const ease = Easing.out(Easing.cubic);
    scale.value      = withTiming(1, { duration: 450, easing: ease });
    rotateX.value    = withTiming(0, { duration: 450, easing: ease });
    translateY.value = withTiming(0, { duration: 450, easing: ease });
  }, [rotateX, scale, translateY]);

  return { animatedMapStyle, triggerDive, resetDive };
}
