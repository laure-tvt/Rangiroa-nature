import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { RANGIROA_SPECIES, CATEGORY_LABELS } from '../../src/constants/species';
import { SpeciesCard } from '../../src/components/ui/SpeciesCard';
import { CategoryFilter } from '../../src/components/ui/CategoryPill';
import type { SpeciesCategory } from '../../src/types';

const FEATURED_IDS = ['1', '2', '3', '5', '14'];

export default function HomeScreen() {
  const { colors } = useColorScheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SpeciesCategory | 'all'>('all');

  const featured = RANGIROA_SPECIES.filter(s => FEATURED_IDS.includes(s.id));

  const filtered = RANGIROA_SPECIES.filter(s => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch = !search ||
      s.name_common_fr.toLowerCase().includes(search.toLowerCase()) ||
      s.name_scientific.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroEmoji}>🐬</Text>
          <Text style={styles.heroTitle}>Rangiroa Nature</Text>
          <Text style={styles.heroSubtitle}>Explorez la biodiversité de l'atoll</Text>
          <TouchableOpacity
            style={styles.scannerButton}
            onPress={() => router.push('/(tabs)/scanner')}
            activeOpacity={0.85}
          >
            <Text style={styles.scannerButtonText}>📸  Identifier une espèce</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.statsRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {[
            { label: 'Espèces', value: RANGIROA_SPECIES.length },
            { label: 'Espèces marines', value: RANGIROA_SPECIES.filter(s => ['fish','shark','ray','mammal','coral'].includes(s.category)).length },
            { label: 'Menacées', value: RANGIROA_SPECIES.filter(s => ['VU','EN','CR'].includes(s.conservation_status)).length },
          ].map((stat, i) => (
            <View key={i} style={[styles.stat, i < 2 && { borderRightColor: colors.border, borderRightWidth: 1 }]}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🌟 À la une</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
            {featured.map(species => (
              <TouchableOpacity
                key={species.id}
                style={[styles.featuredCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => router.push(`/species/${species.id}`)}
                activeOpacity={0.85}
              >
                <Image source={{ uri: species.thumbnail_url }} style={styles.featuredImage} resizeMode="cover" />
                <View style={styles.featuredContent}>
                  <Text style={[styles.featuredCategory, { color: colors.primary }]}>
                    {CATEGORY_LABELS[species.category]}
                  </Text>
                  <Text style={[styles.featuredName, { color: colors.text }]} numberOfLines={2}>
                    {species.name_common_fr}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🌊 Toutes les espèces</Text>
          <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ color: colors.textTertiary, fontSize: 16 }}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              value={search}
              onChangeText={setSearch}
              placeholder="Rechercher..."
              placeholderTextColor={colors.textTertiary}
            />
          </View>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <View style={styles.listContainer}>
            {filtered.map(species => (
              <SpeciesCard
                key={species.id}
                species={species}
                onPress={() => router.push(`/species/${species.id}`)}
              />
            ))}
            {filtered.length === 0 && (
              <Text style={[styles.empty, { color: colors.textSecondary }]}>Aucune espèce trouvée</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 32, paddingBottom: 28, paddingHorizontal: 24, alignItems: 'center' },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', letterSpacing: -0.5 },
  heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 6, marginBottom: 20 },
  scannerButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 100, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.5)' },
  scannerButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: -16, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  section: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8 },
  sectionTitle: { fontSize: 19, fontWeight: '800', marginBottom: 14, letterSpacing: -0.3 },
  featuredScroll: { gap: 12, paddingRight: 16 },
  featuredCard: { width: 160, borderRadius: 16, overflow: 'hidden', borderWidth: 1 },
  featuredImage: { width: 160, height: 110 },
  featuredContent: { padding: 10 },
  featuredCategory: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  featuredName: { fontSize: 14, fontWeight: '700', lineHeight: 18 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, borderWidth: 1, gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 15 },
  listContainer: { marginTop: 16 },
  empty: { textAlign: 'center', fontSize: 15, paddingVertical: 32 },
});
