import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { RANGIROA_SPECIES } from '../../src/constants/species';
import { RANGIROA_CENTER } from '../../src/constants/theme';
import type { SpeciesCategory } from '../../src/types';

const CATEGORIES = [
  { key: 'all' as const, emoji: '🌊', label: 'Tout' },
  { key: 'fish' as SpeciesCategory, emoji: '🐠', label: 'Poissons' },
  { key: 'shark' as SpeciesCategory, emoji: '🦈', label: 'Requins' },
  { key: 'ray' as SpeciesCategory, emoji: '🐟', label: 'Raies' },
  { key: 'mammal' as SpeciesCategory, emoji: '🐬', label: 'Mammifères' },
  { key: 'bird' as SpeciesCategory, emoji: '🦜', label: 'Oiseaux' },
  { key: 'plant' as SpeciesCategory, emoji: '🌴', label: 'Flore' },
  { key: 'invertebrate' as SpeciesCategory, emoji: '🦀', label: 'Invertébrés' },
];

const LOCATIONS = [
  { id: 'tiputa', name: 'Passe de Tiputa', emoji: '🌊', description: 'La passe principale, célèbre pour ses dauphins et ses requins.' },
  { id: 'avatoru', name: "Passe d'Avatoru", emoji: '🐬', description: 'Seconde passe de l\'atoll, riche en biodiversité marine.' },
  { id: 'lagon-bleu', name: 'Lagon Bleu', emoji: '💙', description: 'Lagon intérieur aux eaux cristallines, accessible en bateau.' },
  { id: 'sables-roses', name: 'Les Sables Roses', emoji: '🏖️', description: 'Plage de sable rose, haut lieu d\'observation des tortues.' },
  { id: 'ile-aux-recifs', name: 'Île aux Récifs', emoji: '🪸', description: 'Formation corallienne exceptionnelle.' },
];

export default function MapScreen() {
  const { colors } = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState<SpeciesCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredSpecies = RANGIROA_SPECIES.filter(s =>
    selectedCategory === 'all' || s.category === selectedCategory
  );

  const speciesForLocation = (locationId: string) =>
    filteredSpecies.filter(s =>
      s.locations.some(l => l.name.toLowerCase().includes(
        LOCATIONS.find(loc => loc.id === locationId)?.name.split(' ')[0].toLowerCase() ?? ''
      ))
    );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>🗺️ Carte de Rangiroa</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Points d'observation des espèces</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.filterChip, { borderColor: colors.primary }, selectedCategory === cat.key ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface }]}
            onPress={() => setSelectedCategory(cat.key)}
            activeOpacity={0.8}
          >
            <Text style={styles.filterEmoji}>{cat.emoji}</Text>
            <Text style={[styles.filterLabel, { color: selectedCategory === cat.key ? '#FFF' : colors.primary }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={[styles.mapPlaceholder, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={[styles.mapText, { color: colors.primary }]}>Carte de l'Atoll de Rangiroa</Text>
        <Text style={[styles.mapCoords, { color: colors.textSecondary }]}>{RANGIROA_CENTER.latitude}°S, {Math.abs(RANGIROA_CENTER.longitude)}°O</Text>
        <Text style={[styles.mapNote, { color: colors.textTertiary }]}>Carte interactive disponible avec MapKit</Text>
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>📍 Points d'observation</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.locationsList}>
        {LOCATIONS.map(location => {
          const species = speciesForLocation(location.id);
          const isSelected = selectedLocation === location.id;
          return (
            <TouchableOpacity
              key={location.id}
              style={[styles.locationCard, { backgroundColor: colors.surface, borderColor: isSelected ? colors.primary : colors.border }, isSelected && { borderWidth: 2 }]}
              onPress={() => setSelectedLocation(isSelected ? null : location.id)}
              activeOpacity={0.85}
            >
              <View style={styles.locationHeader}>
                <Text style={styles.locationEmoji}>{location.emoji}</Text>
                <View style={styles.locationInfo}>
                  <Text style={[styles.locationName, { color: colors.text }]}>{location.name}</Text>
                  <Text style={[styles.locationDesc, { color: colors.textSecondary }]} numberOfLines={2}>{location.description}</Text>
                </View>
                <Text style={[styles.locationCount, { color: colors.primary }]}>{species.length} esp.</Text>
              </View>
              {isSelected && species.length > 0 && (
                <View style={styles.speciesList}>
                  <Text style={[styles.speciesListTitle, { color: colors.textSecondary }]}>Espèces observées ici :</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {species.slice(0, 6).map(sp => (
                      <TouchableOpacity key={sp.id} style={[styles.speciesThumb, { borderColor: colors.border }]} onPress={() => router.push(`/species/${sp.id}`)} activeOpacity={0.8}>
                        <Image source={{ uri: sp.thumbnail_url }} style={styles.speciesThumbImage} />
                        <Text style={[styles.speciesThumbName, { color: colors.text }]} numberOfLines={2}>{sp.name_common_fr}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 2 },
  filterRow: { paddingHorizontal: 16, gap: 8, paddingVertical: 8 },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 100, borderWidth: 1.5, gap: 4 },
  filterEmoji: { fontSize: 14 },
  filterLabel: { fontSize: 12, fontWeight: '600' },
  mapPlaceholder: { marginHorizontal: 16, marginVertical: 8, height: 160, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  mapEmoji: { fontSize: 40 },
  mapText: { fontSize: 16, fontWeight: '700' },
  mapCoords: { fontSize: 12 },
  mapNote: { fontSize: 11, marginTop: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700', paddingHorizontal: 16, marginBottom: 8, marginTop: 4 },
  locationsList: { paddingHorizontal: 16, paddingBottom: 24, gap: 10 },
  locationCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', padding: 14 },
  locationHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  locationEmoji: { fontSize: 28 },
  locationInfo: { flex: 1 },
  locationName: { fontSize: 15, fontWeight: '700' },
  locationDesc: { fontSize: 12, marginTop: 2, lineHeight: 16 },
  locationCount: { fontSize: 14, fontWeight: '800' },
  speciesList: { marginTop: 14 },
  speciesListTitle: { fontSize: 12, fontWeight: '600', marginBottom: 10 },
  speciesThumb: { width: 80, marginRight: 10, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  speciesThumbImage: { width: 80, height: 60 },
  speciesThumbName: { fontSize: 10, fontWeight: '600', padding: 6, lineHeight: 13 },
});
