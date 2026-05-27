import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { RANGIROA_SPECIES } from '../../src/constants/species';
import { SpeciesCard } from '../../src/components/ui/SpeciesCard';

const DEMO_FAVORITES = ['1', '3', '5', '14'];

export default function FavoritesScreen() {
  const { colors } = useColorScheme();
  const [favorites, setFavorites] = useState<string[]>(DEMO_FAVORITES);
  const favoriteSpecies = RANGIROA_SPECIES.filter(s => favorites.includes(s.id));

  const removeFavorite = (id: string) => setFavorites(prev => prev.filter(f => f !== id));

  if (favoriteSpecies.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>❤️ Favoris</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🌊</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Aucun favori</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Identifiez et sauvegardez vos espèces préférées de Rangiroa</Text>
          <TouchableOpacity style={[styles.exploreBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/(tabs)/scanner')} activeOpacity={0.85}>
            <Text style={styles.exploreBtnText}>📸 Scanner une espèce</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>❤️ Favoris</Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>{favoriteSpecies.length} espèce{favoriteSpecies.length > 1 ? 's' : ''} sauvegardée{favoriteSpecies.length > 1 ? 's' : ''}</Text>
      </View>
      <FlatList
        data={favoriteSpecies}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <SpeciesCard species={item} onPress={() => router.push(`/species/${item.id}`)} />
            <TouchableOpacity style={[styles.removeBtn, { borderColor: colors.error }]} onPress={() => removeFavorite(item.id)} activeOpacity={0.8}>
              <Text style={[styles.removeBtnText, { color: colors.error }]}>Retirer des favoris</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={
          <View style={[styles.banner, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
            <Text style={styles.bannerEmoji}>💡</Text>
            <Text style={[styles.bannerText, { color: colors.primary }]}>Connectez-vous pour synchroniser vos favoris sur tous vos appareils</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.8}>
              <Text style={[styles.bannerLink, { color: colors.primary }]}>Se connecter →</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  count: { fontSize: 14, marginTop: 2 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  removeBtn: { marginTop: -8, marginBottom: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  removeBtnText: { fontSize: 12, fontWeight: '600' },
  banner: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  bannerEmoji: { fontSize: 18 },
  bannerText: { flex: 1, fontSize: 13, fontWeight: '500' },
  bannerLink: { fontSize: 13, fontWeight: '700' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  emptyEmoji: { fontSize: 72 },
  emptyTitle: { fontSize: 22, fontWeight: '800' },
  emptyText: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  exploreBtn: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, marginTop: 8 },
  exploreBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
