import React from 'react';
import { TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { CATEGORY_LABELS } from '../../constants/species';
import type { SpeciesCategory } from '../../types';

const CATEGORIES: Array<SpeciesCategory | 'all'> = ['all', 'fish', 'shark', 'ray', 'mammal', 'bird', 'invertebrate', 'plant', 'coral'];

interface Props {
  selected: SpeciesCategory | 'all';
  onSelect: (cat: SpeciesCategory | 'all') => void;
}

export function CategoryFilter({ selected, onSelect }: Props) {
  const { colors } = useColorScheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map(cat => {
        const isActive = selected === cat;
        return (
          <TouchableOpacity
            key={cat}
            style={[
              styles.pill,
              { borderColor: colors.primary },
              isActive && { backgroundColor: colors.primary },
              !isActive && { backgroundColor: colors.surface },
            ]}
            onPress={() => onSelect(cat)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, { color: isActive ? '#FFF' : colors.primary }]}>
              {cat === 'all' ? 'Tout' : CATEGORY_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
