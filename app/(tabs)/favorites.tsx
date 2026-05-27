import React, { useState, useRef, useEffect } from 'react';
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
import { router } from 'expo-router';
import { CATEGORY_ICONS, CATEGORY_LABELS, CONSERVATION_COLORS, CONSERVATION_LABELS } from '@/constants';
import { SpeciesCategory, ConservationStatus } from '@/types';

const { width: W } = Dimensions.get('window');
const CARD_W = (W - 48 - 12) / 2;  // 2-column grid with margins

const CATEGORY_GRADIENTS: Record<string, [string, string]> = {
  fish:         ['#0e4668', '#0891b2'],
  coral:        ['#7c2d12', '#f97316'],
  mammal:       ['#1e3a5f', '#3b82f6'],
  bird:         ['#365314', '#84cc16'],
  reptile:      ['#451a03', '#d97706'],
  invertebrate: ['#2e1065', '#8b5cf6'],
  plant:        ['#14532d', '#22c55e'],
  algae:        ['#164e63', '#06b6d4'],
};

const MOCK_FAVORITES = [
  { id: '1', name_fr: 'Napoléon',        name_scientific: 'Cheilinus undulatus',  category: 'fish'     as SpeciesCategory, conservation_status: 'EN' as ConservationStatus, is_dangerous: false },
  { id: '2', name_fr: 'Dauphin souffleur',name_scientific: 'Tursiops truncatus',  category: 'mammal'   as SpeciesCategory, conservation_status: 'LC' as ConservationStatus, is_dangerous: false },
  { id: '3', name_fr: 'Murène géante',   name_scientific: 'Gymnothorax javanicus',category: 'fish'     as SpeciesCategory, conservation_status: 'LC' as ConservationStatus, is_dangerous: true  },
  { id: '4', name_fr: 'Raie manta',      name_scientific: 'Mobula birostris',     category: 'fish'     as SpeciesCategory, conservation_status: 'VU' as ConservationStatus, is_dangerous: false },
  { id: '5', name_fr: 'Requin gris',     name_scientific: 'Carcharhinus amblyrhynchos', category: 'fish' as SpeciesCategory, conservation_status: 'NT' as ConservationStatus, is_dangerous: true },
];

const STATUS_COLORS: Record<string, string> = {
  LC: '#22c55e', NT: '#84cc16', VU: '#f59e0b', EN: '#f97316', CR: '#ef4444',
};

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  // Staggered entrance
  const itemAnims = useRef(MOCK_FAVORITES.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    Animated.stagger(
      70,
      itemAnims.map((a) =>
        Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 18, stiffness: 160 }),
      ),
    ).start();
  }, []);

  const remove = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isEmpty = favorites.length === 0;

  return (
    <View style={styles.root}>
      {/* Header */}
      <LinearGradient colors={['#3b0764', '#7c3aed', '#a855f7']} style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Favoris</Text>
            <Text style={styles.headerSub}>
              {favorites.length} espèce{favorites.length !== 1 ? 's' : ''} sauvegardée{favorites.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.heartBadge}>
            <Ionicons name="heart" size={22} color="#f0abfc" />
          </View>
        </View>
      </LinearGradient>

      {isEmpty ? (
        <View style={styles.emptyWrap}>
          <LinearGradient colors={['#3b0764', '#7c3aed']} style={styles.emptyIconBg}>
            <Ionicons name="heart-outline" size={52} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyDesc}>
            Explore les espèces de Rangiroa{'\n'}et sauvegarde tes préférées ici.
          </Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/')}>
            <LinearGradient colors={['#7c3aed', '#a855f7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emptyBtnGrad}>
              <Text style={styles.emptyBtnText}>Explorer la carte</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {favorites.map((item, idx) => {
            const anim = itemAnims[idx] ?? new Animated.Value(1);
            const [g1, g2] = CATEGORY_GRADIENTS[item.category] ?? ['#0e4668', '#0891b2'];

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.card,
                  {
                    opacity: anim,
                    transform: [
                      { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1] }) },
                      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => router.push(`/species/${item.id}`)}
                  style={styles.cardInner}
                >
                  <LinearGradient colors={[g1, g2]} style={styles.cardGrad}>
                    {/* Remove button */}
                    <TouchableOpacity style={styles.removeBtn} onPress={() => remove(item.id)} activeOpacity={0.8}>
                      <BlurView intensity={Platform.OS === 'ios' ? 30 : 0} tint="dark" style={styles.removeBtnInner}>
                        <Ionicons name="heart" size={14} color="#f0abfc" />
                      </BlurView>
                    </TouchableOpacity>

                    {/* Icon */}
                    <View style={styles.cardIconArea}>
                      <Text style={styles.cardEmoji}>{CATEGORY_ICONS[item.category]}</Text>
                    </View>

                    {/* Danger badge */}
                    {item.is_dangerous && (
                      <View style={styles.dangerBadge}>
                        <Ionicons name="warning" size={10} color="white" />
                        <Text style={styles.dangerText}>Danger</Text>
                      </View>
                    )}
                  </LinearGradient>

                  {/* Card footer */}
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardName} numberOfLines={1}>{item.name_fr}</Text>
                    <Text style={styles.cardSci}  numberOfLines={1}>{item.name_scientific}</Text>
                    <View style={styles.cardBadges}>
                      <View style={[styles.badge, { backgroundColor: (STATUS_COLORS[item.conservation_status] ?? '#64748b') + '22' }]}>
                        <Text style={[styles.badgeText, { color: STATUS_COLORS[item.conservation_status] ?? '#64748b' }]}>
                          {item.conservation_status}
                        </Text>
                      </View>
                      <View style={styles.badge}>
                        <Text style={styles.badgeTextGray}>{CATEGORY_LABELS[item.category]}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8fafc' },

  header: { paddingHorizontal: 24, paddingBottom: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 34, fontWeight: '800', color: 'white', letterSpacing: -0.5 },
  headerSub:   { fontSize: 14, color: 'rgba(255,255,255,0.60)', marginTop: 4 },
  heartBadge: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 40 },
  emptyIconBg: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#1e293b' },
  emptyDesc:  { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 22 },
  emptyBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 8 },
  emptyBtnGrad: { paddingHorizontal: 28, paddingVertical: 14 },
  emptyBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },

  scroll: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 12,
    justifyContent: 'space-between',
  },

  card: { width: CARD_W },
  cardInner: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  cardGrad: { height: 160, padding: 12, justifyContent: 'space-between' },
  removeBtn: {
    alignSelf: 'flex-end',
    width: 30, height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  removeBtnInner: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.45)' : 'transparent',
  },
  cardIconArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cardEmoji: { fontSize: 54 },
  dangerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(239,68,68,0.85)',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8,
  },
  dangerText: { color: 'white', fontSize: 9, fontWeight: '700' },

  cardFooter: { backgroundColor: 'white', padding: 12, gap: 2 },
  cardName: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  cardSci:  { fontSize: 11, fontStyle: 'italic', color: '#94a3b8' },
  cardBadges: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  badge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  badgeText:     { fontSize: 10, fontWeight: '700' },
  badgeTextGray: { fontSize: 10, fontWeight: '600', color: '#64748b' },
});
