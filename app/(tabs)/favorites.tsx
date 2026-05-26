import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { EmptyState } from '@/components/ui/EmptyState';
import { CATEGORY_ICONS, CATEGORY_LABELS, CONSERVATION_COLORS, CONSERVATION_LABELS } from '@/constants';
import { Badge } from '@/components/ui/Badge';
import { SpeciesCategory, ConservationStatus } from '@/types';

const MOCK_FAVORITES = [
  {
    id: '1',
    name_fr: 'Napoléon',
    name_scientific: 'Cheilinus undulatus',
    category: 'fish' as SpeciesCategory,
    conservation_status: 'EN' as ConservationStatus,
    images: [],
    is_dangerous: false,
  },
  {
    id: '2',
    name_fr: 'Dauphin souffleur',
    name_scientific: 'Tursiops truncatus',
    category: 'mammal' as SpeciesCategory,
    conservation_status: 'LC' as ConservationStatus,
    images: [],
    is_dangerous: false,
  },
  {
    id: '3',
    name_fr: 'Murène géante',
    name_scientific: 'Gymnothorax javanicus',
    category: 'fish' as SpeciesCategory,
    conservation_status: 'LC' as ConservationStatus,
    images: [],
    is_dangerous: true,
  },
];

type ViewMode = 'grid' | 'list';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isEmpty = favorites.length === 0;

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <LinearGradient
        colors={isDark ? ['#881337', '#0f172a'] : ['#f43f5e', '#fecdd3']}
        style={{ height: 120 }}
      >
        <SafeAreaView edges={['top']} className="px-5 pt-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-2xl font-bold">Favoris</Text>
              <Text className="text-white/70 text-sm">
                {favorites.length} espèce{favorites.length !== 1 ? 's' : ''} sauvegardée{favorites.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <Ionicons
                name={viewMode === 'list' ? 'grid-outline' : 'list-outline'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {isEmpty ? (
        <EmptyState
          icon="heart-outline"
          title="Aucun favori"
          message="Ajoute des espèces à tes favoris pour les retrouver ici facilement."
          actionLabel="Explorer les espèces"
          onAction={() => router.push('/')}
        />
      ) : (
        <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
          {favorites.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/species/${item.id}`)}
              activeOpacity={0.8}
              className={`rounded-2xl mb-3 overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
              <View className="flex-row items-center p-4 gap-4">
                {/* Icon */}
                <View className={`w-14 h-14 rounded-xl items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-coral-50'}`}>
                  <Text className="text-3xl">{CATEGORY_ICONS[item.category]}</Text>
                </View>

                {/* Info */}
                <View className="flex-1 gap-1">
                  <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.name_fr}
                  </Text>
                  <Text className={`text-xs italic ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {item.name_scientific}
                  </Text>
                  <View className="flex-row gap-2 mt-1">
                    <Badge
                      label={CATEGORY_LABELS[item.category]}
                      color="#ffe4e6"
                      textColor="#be123c"
                    />
                    <Badge
                      label={item.conservation_status}
                      color={CONSERVATION_COLORS[item.conservation_status]}
                      textColor="white"
                    />
                  </View>
                </View>

                {/* Actions */}
                <View className="gap-2">
                  <TouchableOpacity
                    onPress={() => handleRemoveFavorite(item.id)}
                    className="w-8 h-8 rounded-full bg-coral-100 items-center justify-center"
                  >
                    <Ionicons name="heart" size={16} color="#f43f5e" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-8 h-8 rounded-full items-center justify-center">
                    <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              </View>

              {item.is_dangerous && (
                <View className="bg-coral-50 dark:bg-coral-900/20 px-4 py-2 flex-row items-center gap-2">
                  <Ionicons name="warning-outline" size={14} color="#ef4444" />
                  <Text className="text-coral-600 text-xs font-medium">
                    Espèce potentiellement dangereuse
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <View className="h-8" />
        </ScrollView>
      )}
    </View>
  );
}
