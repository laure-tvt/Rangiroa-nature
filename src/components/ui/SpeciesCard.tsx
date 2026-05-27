import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Species } from '../../types';
import { CONSERVATION_COLORS, CATEGORY_LABELS } from '../../constants/species';
import { useColorScheme } from '../../hooks/useColorScheme';

interface Props {
  species: Species;
  onPress: () => void;
  compact?: boolean;
}

export function SpeciesCard({ species, onPress, compact = false }: Props) {
  const { colors } = useColorScheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: species.thumbnail_url }}
        style={compact ? styles.imageCompact : styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.category, { color: colors.primary }]}>
            {CATEGORY_LABELS[species.category]}
          </Text>
          {species.is_endemic && (
            <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.badgeText, { color: colors.primary }]}>Endémique</Text>
            </View>
          )}
        </View>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {species.name_common_fr}
        </Text>
        <Text style={[styles.scientific, { color: colors.textSecondary }]} numberOfLines={1}>
          {species.name_scientific}
        </Text>
        {!compact && (
          <View style={styles.footer}>
            <View style={[styles.status, { backgroundColor: CONSERVATION_COLORS[species.conservation_status] + '20' }]}>
              <View style={[styles.dot, { backgroundColor: CONSERVATION_COLORS[species.conservation_status] }]} />
              <Text style={[styles.statusText, { color: CONSERVATION_COLORS[species.conservation_status] }]}>
                {species.conservation_status}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: { width: 100, height: 100 },
  imageCompact: { width: 72, height: 72 },
  content: { flex: 1, padding: 12, justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  category: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 100 },
  badgeText: { fontSize: 10, fontWeight: '600' },
  name: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  scientific: { fontSize: 13, fontStyle: 'italic', marginBottom: 8 },
  footer: { flexDirection: 'row' },
  status: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700' },
});
