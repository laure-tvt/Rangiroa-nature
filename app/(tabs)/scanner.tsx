import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const { width: W } = Dimensions.get('window');
const FRAME = Math.min(W * 0.76, 340);

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const [photo, setPhoto]       = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // ── Entrance fade
  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // ── Idle pulse rings (3 rings staggered)
  const ring = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  useEffect(() => {
    if (photo) return;
    const anims = ring.map((r, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 500),
          Animated.timing(r, { toValue: 1, duration: 1800, useNativeDriver: true }),
          Animated.timing(r, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]),
      ),
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [photo]);

  // ── Scan line animation (when analyzing)
  const scanY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!analyzing) { scanY.setValue(0); return; }
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanY, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(scanY, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    ).start();
    return () => scanY.setValue(0);
  }, [analyzing]);

  // ── Button press feedback
  const btnScale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true, damping: 15, stiffness: 200 }).start();
  const pressOut = () => Animated.spring(btnScale, { toValue: 1,    useNativeDriver: true, damping: 15, stiffness: 200 }).start();

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission requise', 'Accès caméra nécessaire.'); return; }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.85, allowsEditing: true, aspect: [1, 1] });
    if (!res.canceled) setPhoto(res.assets[0].uri);
  };

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission requise', 'Accès galerie nécessaire.'); return; }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.85, allowsEditing: true, aspect: [1, 1] });
    if (!res.canceled) setPhoto(res.assets[0].uri);
  };

  const handleAnalyze = async () => {
    if (!photo || analyzing) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2500));
    setAnalyzing(false);
    Alert.alert('Bientôt disponible', "L'identification IA arrive dans la prochaine version !", [
      { text: 'OK', onPress: () => setPhoto(null) },
    ]);
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#020c16', '#061a2c', '#0a2e48']} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <Animated.View style={[styles.header, { paddingTop: insets.top + 16, opacity: fadeIn }]}>
        <Text style={styles.headerTitle}>Scanner</Text>
        <Text style={styles.headerSub}>Identifie la faune & flore de Rangiroa</Text>
      </Animated.View>

      {/* Viewfinder */}
      <Animated.View style={[styles.viewfinderArea, { opacity: fadeIn }]}>
        {/* Pulse rings */}
        {ring.map((r, i) => (
          <Animated.View
            key={i}
            style={[
              styles.ring,
              {
                width:  FRAME + 32 + i * 28,
                height: FRAME + 32 + i * 28,
                borderRadius: (FRAME + 32 + i * 28) / 2,
                opacity: r.interpolate({ inputRange: [0, 1], outputRange: [0, 0.28 - i * 0.07] }),
                transform: [{ scale: r.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.1] }) }],
              },
            ]}
          />
        ))}

        {/* Frame circle */}
        <View style={[styles.frame, { width: FRAME, height: FRAME, borderRadius: FRAME / 2 }]}>
          {/* Corner brackets */}
          {[
            { top: 18, left: 18, borderTopWidth: 3, borderLeftWidth: 3 },
            { top: 18, right: 18, borderTopWidth: 3, borderRightWidth: 3 },
            { bottom: 18, left: 18, borderBottomWidth: 3, borderLeftWidth: 3 },
            { bottom: 18, right: 18, borderBottomWidth: 3, borderRightWidth: 3 },
          ].map((s, i) => (
            <View key={i} style={[styles.bracket, s]} />
          ))}

          {photo ? (
            <View style={styles.photoPreview}>
              <Ionicons name="image-outline" size={72} color="rgba(34,211,238,0.6)" />
              <Text style={styles.photoLabel}>Photo sélectionnée</Text>
              {analyzing && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{
                        translateY: scanY.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-FRAME / 2, FRAME / 2],
                        }),
                      }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={['transparent', 'rgba(34,211,238,0.7)', 'transparent']}
                    style={{ flex: 1 }}
                  />
                </Animated.View>
              )}
            </View>
          ) : (
            <View style={styles.emptyFrame}>
              <LinearGradient colors={['rgba(8,145,178,0.25)', 'rgba(6,182,212,0.10)']} style={styles.scanIconBg}>
                <Ionicons name="scan" size={46} color="#22d3ee" />
              </LinearGradient>
              <Text style={styles.emptyTitle}>Aucune photo</Text>
              <Text style={styles.emptySub}>Caméra ou galerie photo</Text>
            </View>
          )}
        </View>

        {photo && (
          <TouchableOpacity style={styles.removeBtn} onPress={() => setPhoto(null)} activeOpacity={0.8}>
            <BlurView intensity={40} tint="dark" style={styles.removeBtnInner}>
              <Ionicons name="close" size={16} color="white" />
            </BlurView>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Analyzing label */}
      {analyzing && (
        <View style={styles.analyzingRow}>
          <View style={styles.analyzingDot} />
          <Text style={styles.analyzingText}>Analyse IA en cours…</Text>
        </View>
      )}

      {/* Bottom actions */}
      <Animated.View style={[styles.bottom, { paddingBottom: insets.bottom + 96, opacity: fadeIn }]}>
        {!photo ? (
          <>
            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity onPress={handleCamera} onPressIn={pressIn} onPressOut={pressOut} activeOpacity={1}>
                <LinearGradient
                  colors={['#0891b2', '#0284c7']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.primaryBtn}
                >
                  <Ionicons name="camera" size={22} color="white" />
                  <Text style={styles.primaryBtnText}>Prendre une photo</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={handleGallery} activeOpacity={0.8} style={styles.secondaryBtnWrap}>
              <BlurView intensity={Platform.OS === 'ios' ? 18 : 0} tint="light" style={styles.secondaryBtn}>
                <Ionicons name="images" size={20} color="#22d3ee" />
                <Text style={styles.secondaryBtnText}>Galerie photo</Text>
              </BlurView>
            </TouchableOpacity>
          </>
        ) : (
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <TouchableOpacity onPress={handleAnalyze} onPressIn={pressIn} onPressOut={pressOut} disabled={analyzing} activeOpacity={1}>
              <LinearGradient
                colors={analyzing ? ['#1e3a4c', '#1e3a4c'] : ['#0891b2', '#0284c7']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.primaryBtn}
              >
                <Ionicons name={analyzing ? 'hourglass-outline' : 'sparkles-outline'} size={22} color="white" />
                <Text style={styles.primaryBtnText}>
                  {analyzing ? 'Analyse en cours…' : 'Identifier cette espèce'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Tips card */}
        <View style={styles.tipsCard}>
          <BlurView intensity={Platform.OS === 'ios' ? 16 : 0} tint="dark" style={styles.tipsInner}>
            <Text style={styles.tipsTitle}>💡  Conseils</Text>
            {[
              'Photographiez de face ou de profil',
              'Évitez le contre-jour et les reflets',
              "L'espèce doit être bien au centre",
            ].map((t, i) => (
              <Text key={i} style={styles.tipItem}>· {t}</Text>
            ))}
          </BlurView>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 12 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: 'white', letterSpacing: -0.5 },
  headerSub:   { fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 2 },

  viewfinderArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#22d3ee',
  },
  frame: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(34,211,238,0.45)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bracket: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: '#22d3ee',
  },
  photoPreview: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8,145,178,0.12)',
    overflow: 'hidden',
  },
  photoLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 12, fontWeight: '500' },
  scanLine: {
    position: 'absolute',
    left: 0, right: 0,
    height: 3,
  },
  emptyFrame: { alignItems: 'center', gap: 12 },
  scanIconBg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { color: 'rgba(255,255,255,0.75)', fontSize: 16, fontWeight: '700' },
  emptySub:   { color: 'rgba(255,255,255,0.38)', fontSize: 13 },
  removeBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
  },
  removeBtnInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.6)' : 'transparent',
  },

  analyzingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 },
  analyzingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22d3ee' },
  analyzingText: { color: '#22d3ee', fontSize: 14, fontWeight: '600' },

  bottom: { paddingHorizontal: 24, gap: 12 },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  primaryBtnText: { color: 'white', fontSize: 17, fontWeight: '700' },
  secondaryBtnWrap: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(34,211,238,0.28)' },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    backgroundColor: Platform.OS === 'android' ? 'rgba(34,211,238,0.10)' : 'transparent',
  },
  secondaryBtnText: { color: '#22d3ee', fontSize: 16, fontWeight: '600' },
  tipsCard: { borderRadius: 16, overflow: 'hidden', marginTop: 4 },
  tipsInner: {
    padding: 16,
    gap: 6,
    backgroundColor: Platform.OS === 'android' ? 'rgba(255,255,255,0.07)' : 'transparent',
  },
  tipsTitle: { color: 'rgba(255,255,255,0.80)', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  tipItem:   { color: 'rgba(255,255,255,0.48)', fontSize: 12, lineHeight: 18 },
});
