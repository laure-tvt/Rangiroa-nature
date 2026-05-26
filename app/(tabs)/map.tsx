import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RANGIROA_COORDS, CATEGORY_ICONS, CATEGORY_LABELS } from '@/constants';
import { SpeciesCategory } from '@/types';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

const FILTER_CATEGORIES: SpeciesCategory[] = [
  'fish', 'coral', 'mammal', 'bird', 'invertebrate',
];

const MOCK_SPOTS = [
  {
    id: '1',
    name: 'Passe de Tiputa',
    description: 'Spot de plongée réputé, dauphins fréquents',
    category: 'mammal' as SpeciesCategory,
    species: ['Dauphin souffleur', 'Requin gris'],
    depth: '20-40m',
  },
  {
    id: '2',
    name: 'Passe d\'Avatoru',
    description: 'Idéal pour observer les requins et raies',
    category: 'fish' as SpeciesCategory,
    species: ['Requin de récif', 'Raie manta'],
    depth: '15-30m',
  },
  {
    id: '3',
    name: 'Lagon intérieur',
    description: 'Eaux calmes, idéal pour les coraux',
    category: 'coral' as SpeciesCategory,
    species: ['Corail cerveau', 'Corail étoile'],
    depth: '5-15m',
  },
  {
    id: '4',
    name: 'Motu Nuhi Nuhi',
    description: 'Nidification des oiseaux marins',
    category: 'bird' as SpeciesCategory,
    species: ['Frégate', 'Sterne huppée'],
    depth: 'Surface',
  },
];

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState<SpeciesCategory | null>(null);

  const filtered = activeFilter
    ? MOCK_SPOTS.filter((s) => s.category === activeFilter)
    : MOCK_SPOTS;

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <LinearGradient
        colors={isDark ? ['#064e3b', '#0f172a'] : ['#10b981', '#a7f3d0']}
        style={{ height: 120 }}
      >
        <SafeAreaView edges={['top']} className="px-5 pt-2">
          <Text className="text-white text-2xl font-bold">Carte</Text>
          <Text className="text-white/70 text-sm">
            {RANGIROA_COORDS.latitude.toFixed(4)}°S, {Math.abs(RANGIROA_COORDS.longitude).toFixed(4)}°O · Rangiroa
          </Text>
        </SafeAreaView>
      </LinearGradient>

      {/* Map placeholder */}
      <View
        className={`mx-5 -mt-4 rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-lagoon-100'}`}
        style={{ height: 200 }}
      >
        <View className="flex-1 items-center justify-center gap-3">
          <View className={`w-16 h-16 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-lagoon-200'}`}>
            <Ionicons name="map" size={32} color="#10b981" />
          </View>
          <View className="items-center gap-1">
            <Text className={`font-semibold ${isDark ? 'text-slate-300' : 'text-lagoon-800'}`}>
              Carte interactive
            </Text>
            <Text className={`text-xs text-center px-8 ${isDark ? 'text-slate-500' : 'text-lagoon-600'}`}>
              La carte MapLibre sera intégrée ici
            </Text>
          </View>
        </View>
        {/* Coordinate badge */}
        <View className="absolute bottom-3 right-3">
          <Badge
            label="📍 Atoll de Rangiroa"
            color={isDark ? '#1e293b' : 'white'}
            textColor={isDark ? '#94a3b8' : '#475569'}
          />
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 px-5"
        style={{ maxHeight: 44 }}
      >
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full ${!activeFilter
              ? 'bg-lagoon-500'
              : isDark ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <Text className={`text-sm font-medium ${!activeFilter ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Tous
            </Text>
          </TouchableOpacity>
          {FILTER_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveFilter(activeFilter === cat ? null : cat)}
              className={`px-4 py-2 rounded-full flex-row items-center gap-1.5 ${
                activeFilter === cat
                  ? 'bg-lagoon-500'
                  : isDark ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <Text>{CATEGORY_ICONS[cat]}</Text>
              <Text className={`text-sm font-medium ${activeFilter === cat ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {CATEGORY_LABELS[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Spots list */}
      <Text className={`px-5 mt-4 mb-3 font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Points d'intérêt ({filtered.length})
      </Text>
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        {filtered.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            className={`rounded-2xl p-4 mb-3 flex-row items-start gap-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
            style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
            activeOpacity={0.8}
          >
            <View className="w-12 h-12 rounded-xl bg-lagoon-100 items-center justify-center">
              <Text className="text-2xl">{CATEGORY_ICONS[spot.category]}</Text>
            </View>
            <View className="flex-1 gap-1">
              <View className="flex-row items-center justify-between">
                <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {spot.name}
                </Text>
                <Badge label={spot.depth} color="#d1fae5" textColor="#065f46" />
              </View>
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {spot.description}
              </Text>
              <View className="flex-row flex-wrap gap-1 mt-1">
                {spot.species.map((s) => (
                  <Text key={s} className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    · {s}
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
