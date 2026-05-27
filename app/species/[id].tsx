import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { RANGIROA_SPECIES, CATEGORY_LABELS, CONSERVATION_COLORS, CONSERVATION_LABELS } from '../../src/constants/species';

export default function SpeciesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useColorScheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const species = RANGIROA_SPECIES.find(s => s.id === id);

  if (!species) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🌊</Text>
          <Text style={[styles.notFoundText, { color: colors.text }]}>Espèce non trouvée</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = CONSERVATION_COLORS[species.conservation_status];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: species.image_url }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.imageOverlay}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            <View style={styles.imageActions}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: isFavorite ? '#FF6B6B' : 'rgba(255,255,255,0.25)' }]} onPress={() => setIsFavorite(!isFavorite)}>
                <Text style={styles.actionBtnText}>{isFavorite ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(255,255,255,0.25)' }]} onPress={() => Share.share({ message: `Découvrez ${species.name_common_fr} dans le lagon de Rangiroa ! 🌊` })}>
                <Text style={styles.actionBtnText}>↗️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.nameSection}>
            <View style={styles.badges}>
              <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>{CATEGORY_LABELS[species.category]}</Text>
              </View>
              {species.is_endemic && (
                <View style={[styles.categoryBadge, { backgroundColor: '#D4A76A20' }]}>
                  <Text style={[styles.categoryBadgeText, { color: '#D4A76A' }]}>Endémique</Text>
                </View>
              )}
            </View>
            <Text style={[styles.commonName, { color: colors.text }]}>{species.name_common_fr}</Text>
            <Text style={[styles.scientificName, { color: colors.textSecondary }]}>{species.name_scientific}</Text>
            <Text style={[styles.englishName, { color: colors.textTertiary }]}>{species.name_common_en}</Text>
          </View>
          <View style={[styles.statusCard, { backgroundColor: statusColor + '15', borderColor: statusColor + '30' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <View>
              <Text style={[styles.statusLabel, { color: statusColor }]}>Statut UICN : {species.conservation_status}</Text>
              <Text style={[styles.statusDesc, { color: statusColor + 'CC' }]}>{CONSERVATION_LABELS[species.conservation_status]}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>À propos</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{species.description}</Text>
          </View>
          <View style={[styles.funFactCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '25' }]}>
            <Text style={styles.funFactEmoji}>💡</Text>
            <Text style={[styles.funFact, { color: colors.text }]}>{species.fun_fact}</Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Habitat</Text>
            <View style={styles.habitatRow}>
              {species.habitat.map(h => (
                <View key={h} style={[styles.habitatChip, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                  <Text style={[styles.habitatText, { color: colors.text }]}>
                    {h === 'lagoon' ? '🌊 Lagon' : h === 'ocean' ? '🌏 Océan' : h === 'reef' ? '🪸 Récif' : h === 'land' ? '🌴 Terrestre' : '🏖️ Côtier'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {species.locations.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>📍 Où l'observer</Text>
              {species.locations.map(loc => (
                <View key={loc.id} style={[styles.locationRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={styles.locationPin}>📍</Text>
                  <Text style={[styles.locationName, { color: colors.text }]}>{loc.name}</Text>
                  <Text style={[styles.locationCoords, { color: colors.textTertiary }]}>{loc.latitude.toFixed(3)}, {loc.longitude.toFixed(3)}</Text>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity style={[styles.scannerCta, { backgroundColor: colors.primary }]} onPress={() => router.push('/(tabs)/scanner')} activeOpacity={0.85}>
            <Text style={styles.scannerCtaText}>📸 L'avez-vous observé ? Scannez-le !</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 320 },
  imageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 16, paddingTop: 52 },
  closeBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  imageActions: { flexDirection: 'row', gap: 10 },
  actionBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  actionBtnText: { fontSize: 18 },
  content: { padding: 20, gap: 20 },
  nameSection: { gap: 6 },
  badges: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 100 },
  categoryBadgeText: { fontSize: 12, fontWeight: '700' },
  commonName: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, marginTop: 4 },
  scientificName: { fontSize: 16, fontStyle: 'italic' },
  englishName: { fontSize: 14 },
  statusCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusLabel: { fontSize: 14, fontWeight: '700' },
  statusDesc: { fontSize: 12, marginTop: 2 },
  section: { gap: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  description: { fontSize: 15, lineHeight: 24 },
  funFactCard: { flexDirection: 'row', gap: 12, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'flex-start' },
  funFactEmoji: { fontSize: 22 },
  funFact: { flex: 1, fontSize: 14, lineHeight: 21, fontWeight: '500' },
  habitatRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  habitatChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1 },
  habitatText: { fontSize: 13, fontWeight: '600' },
  locationRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  locationPin: { fontSize: 18 },
  locationName: { flex: 1, fontSize: 14, fontWeight: '600' },
  locationCoords: { fontSize: 11 },
  scannerCta: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 4 },
  scannerCtaText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  notFoundEmoji: { fontSize: 64 },
  notFoundText: { fontSize: 18, fontWeight: '700' },
});
