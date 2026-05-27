import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/constants';
import { SpeciesCategory } from '@/types';
import MapIllustration from '../../src/components/MapIllustration';

const { width: W } = Dimensions.get('window');
const CARD_W = W * 0.72;

const CATEGORIES: { key: SpeciesCategory | null; label: string; icon: string }[] = [
  { key: null,          label: 'Tout',     icon: '🗺️' },
  { key: 'fish',        label: 'Poissons', icon: '🐠' },
  { key: 'mammal',      label: 'Mammifères',icon: '🐬' },
  { key: 'coral',       label: 'Coraux',   icon: '🪸' },
  { key: 'bird',        label: 'Oiseaux',  icon: '🦅' },
  { key: 'invertebrate',label: 'Inverté.', icon: '🦑' },
];

const SPOTS = [
  { id: '1', name: 'Passe de Tiputa',   emoji: '🤿', cat: 'mammal'      as SpeciesCategory, depth: '20–40 m', color: '#1e3a5f', species: ['Dauphin souffleur', 'Requin gris'], desc: 'Spot de plongée mondial réputé, courants puissants' },
  { id: '2', name: "Passe d'Avatoru",   emoji: '🦈', cat: 'fish'        as SpeciesCategory, depth: '15–30 m', color: '#0e4668', species: ['Requin de récif', 'Raie manta'],    desc: 'Idéal pour observer les requins en dérive' },
  { id: '3', name: 'Lagon intérieur',   emoji: '🪸', cat: 'coral'       as SpeciesCategory, depth: '5–15 m',  color: '#134e4a', species: ['Corail cerveau', 'Corail étoile'],  desc: 'Eaux calmes, idéal pour le snorkeling' },
  { id: '4', name: 'Motu Nuhi Nuhi',    emoji: '🦅', cat: 'bird'        as SpeciesCategory, depth: 'Surface', color: '#365314', species: ['Frégate', 'Sterne huppée'],          desc: 'Site de nidification des oiseaux marins' },
  { id: '5', name: 'Jardin de corail',  emoji: '🐠', cat: 'fish'        as SpeciesCategory, depth: '3–10 m',  color: '#7c2d12', species: ['Poisson-coffre', 'Poisson-perroquet'], desc: 'Récif peu profond pour débutants' },
];

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<SpeciesCategory | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const filtered = filter ? SPOTS.filter((s) => s.cat === filter) : SPOTS;

  // Card press scale
  const scaleAnims = useRef<Record<string, Animated.Value>>({}).current;
  const getScale = (id: string) => {
    if (!scaleAnims[id]) scaleAnims[id] = new Animated.Value(1);
    return scaleAnims[id];
  };
  const pressIn  = (id: string) => Animated.spring(getScale(id), { toValue: 0.96, useNativeDriver: true, damping: 15, stiffness: 200 }).start();
  const pressOut = (id: string) => Animated.spring(getScale(id), { toValue: 1,    useNativeDriver: true, damping: 15, stiffness: 200 }).start();

  return (
    <View style={styles.root}>
      {/* Full-screen illustrated map */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <MapIllustration />
      </View>

      {/* Safe area top: filters */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <BlurView intensity={Platform.OS === 'ios' ? 60 : 0} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.topContent}>
          <View>
            <Text style={styles.topTitle}>Carte</Text>
            <Text style={styles.topSub}>14.97°S · 147.65°O · Rangiroa</Text>
          </View>
          <View style={styles.coordBadge}>
            <Ionicons name="location" size={14} color="#0891b2" />
          </View>
        </View>

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.key;
            return (
              <TouchableOpacity
                key={String(cat.key)}
                onPress={() => setFilter(cat.key)}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                activeOpacity={0.8}
              >
                <Text style={styles.filterEmoji}>{cat.icon}</Text>
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom horizontal cards */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 88 }]}>
        <Text style={styles.spotsLabel}>
          {filtered.length} site{filtered.length !== 1 ? 's' : ''} d'intérêt
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
          decelerationRate="fast"
          snapToInterval={CARD_W + 12}
          snapToAlignment="start"
        >
          {filtered.map((spot) => (
            <Animated.View key={spot.id} style={[styles.card, { transform: [{ scale: getScale(spot.id) }] }]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setActive(active === spot.id ? null : spot.id)}
                onPressIn={() => pressIn(spot.id)}
                onPressOut={() => pressOut(spot.id)}
              >
                <LinearGradient
                  colors={[spot.color, spot.color + 'cc']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={styles.cardGrad}
                >
                  {/* Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.cardIconBg}>
                      <Text style={styles.cardEmoji}>{spot.emoji}</Text>
                    </View>
                    <View style={styles.depthBadge}>
                      <Ionicons name="water-outline" size={10} color="rgba(255,255,255,0.9)" />
                      <Text style={styles.depthText}>{spot.depth}</Text>
                    </View>
                  </View>

                  {/* Info */}
                  <Text style={styles.cardName}>{spot.name}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>{spot.desc}</Text>

                  {/* Species chips */}
                  <View style={styles.speciesRow}>
                    {spot.species.map((s) => (
                      <View key={s} style={styles.speciesChip}>
                        <Text style={styles.speciesText}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
          <View style={{ width: 16 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#5ba8c4' },

  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'android' ? 'rgba(255,255,255,0.90)' : 'transparent',
    borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
  },
  topContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 8 },
  topTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
  topSub:   { fontSize: 11, color: '#64748b', marginTop: 1 },
  coordBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(8,145,178,0.12)', alignItems: 'center', justifyContent: 'center' },

  filterList: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.07)',
  },
  filterPillActive: { backgroundColor: '#0891b2', borderColor: '#0891b2' },
  filterEmoji: { fontSize: 14 },
  filterText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  filterTextActive: { color: 'white' },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  spotsLabel: { color: 'white', fontSize: 13, fontWeight: '700', marginLeft: 20, marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  cardList: { paddingLeft: 16, gap: 12 },
  card: { width: CARD_W },
  cardGrad: { borderRadius: 20, padding: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 10 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  cardEmoji: { fontSize: 24 },
  depthBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  depthText: { color: 'rgba(255,255,255,0.90)', fontSize: 11, fontWeight: '700' },
  cardName: { fontSize: 17, fontWeight: '800', color: 'white', letterSpacing: -0.2 },
  cardDesc: { fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 18 },
  speciesRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  speciesChip: { backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  speciesText: { color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: '600' },
});
