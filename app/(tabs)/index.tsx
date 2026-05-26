import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/constants';
import { SpeciesCategory } from '@/types';

const { width } = Dimensions.get('window');

const FEATURED_CATEGORIES: SpeciesCategory[] = [
  'fish', 'coral', 'mammal', 'bird', 'invertebrate', 'plant',
];

const QUICK_FACTS = [
  { icon: '🌊', label: 'Lagon le plus grand', value: 'du Pacifique Sud' },
  { icon: '🐠', label: '400+ espèces', value: 'de poissons' },
  { icon: '🪸', label: 'Récif corallien', value: 'préservé' },
  { icon: '🐬', label: 'Dauphins', value: 'résidents' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({ pathname: '/scanner', params: { q: searchQuery } });
    }
  };

  const handleCategoryPress = (category: SpeciesCategory) => {
    router.push({ pathname: '/scanner', params: { category } });
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* Hero */}
        <View style={{ height: 280 }}>
          <LinearGradient
            colors={['#0c4a6e', '#0ea5e9', '#38bdf8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          >
            <SafeAreaView edges={['top']} className="flex-1 px-5 pt-2">
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text className="text-white/70 text-sm">Bienvenue sur</Text>
                  <Text className="text-white text-2xl font-bold">Rangiroa Explorer</Text>
                </View>
                <TouchableOpacity
                  className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                  onPress={() => router.push('/profile')}
                >
                  <Ionicons name="person-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/* Search */}
              <View className="flex-row items-center bg-white/20 rounded-2xl px-4 h-12 gap-3">
                <Ionicons name="search-outline" size={20} color="rgba(255,255,255,0.8)" />
                <TextInput
                  className="flex-1 text-white text-base"
                  placeholder="Rechercher une espèce..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
              </View>

              <Text className="text-white/60 text-xs mt-3 text-center">
                🏝 Atoll de Rangiroa · Polynésie française
              </Text>
            </SafeAreaView>
          </LinearGradient>
        </View>

        <View className="px-5 -mt-5">
          {/* Scanner CTA */}
          <TouchableOpacity
            onPress={() => router.push('/scanner')}
            activeOpacity={0.9}
          >
            <View className="bg-ocean-500 rounded-2xl p-5 shadow-lg flex-row items-center gap-4 mb-6">
              <View className="w-14 h-14 rounded-xl bg-white/20 items-center justify-center">
                <Ionicons name="camera" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">Identifier une espèce</Text>
                <Text className="text-white/70 text-sm">
                  Prends une photo et découvre la faune & flore
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
            </View>
          </TouchableOpacity>

          {/* Quick facts */}
          <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Le savais-tu ?
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3 pb-2">
              {QUICK_FACTS.map((fact, i) => (
                <View
                  key={i}
                  className={`rounded-2xl p-4 w-36 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
                  style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
                >
                  <Text className="text-3xl mb-2">{fact.icon}</Text>
                  <Text className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {fact.label}
                  </Text>
                  <Text className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {fact.value}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Categories */}
          <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Explorer par catégorie
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {FEATURED_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => handleCategoryPress(cat)}
                activeOpacity={0.8}
                className={`rounded-2xl p-4 items-center gap-1.5 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
                style={{
                  width: (width - 52) / 3,
                  shadowColor: '#000',
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text className="text-3xl">{CATEGORY_ICONS[cat]}</Text>
                <Text
                  className={`text-xs font-medium text-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  {CATEGORY_LABELS[cat]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Map CTA */}
          <TouchableOpacity
            onPress={() => router.push('/map')}
            activeOpacity={0.9}
            className="mb-8"
          >
            <LinearGradient
              colors={['#065f46', '#10b981']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-5 flex-row items-center gap-4"
            >
              <Ionicons name="map" size={28} color="white" />
              <View className="flex-1">
                <Text className="text-white font-bold text-base">Carte des espèces</Text>
                <Text className="text-white/70 text-sm">Voir où elles vivent à Rangiroa</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.7)" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
