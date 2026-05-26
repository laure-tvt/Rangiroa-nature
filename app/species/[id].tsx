import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Badge } from '@/components/ui/Badge';
import { CATEGORY_ICONS, CATEGORY_LABELS, CONSERVATION_COLORS, CONSERVATION_LABELS } from '@/constants';
import { SpeciesCategory, ConservationStatus } from '@/types';

const { width } = Dimensions.get('window');

const MOCK_SPECIES = {
  id: '1',
  name_fr: 'Napoléon',
  name_local: 'Mamea',
  name_scientific: 'Cheilinus undulatus',
  category: 'fish' as SpeciesCategory,
  conservation_status: 'EN' as ConservationStatus,
  description:
    'Le poisson Napoléon est le plus grand poisson de la famille des labridés. Facilement reconnaissable à sa bosse caractéristique sur le front et ses lèvres épaisses, il peut atteindre 2 mètres de long. Solitaire et curieux, il fréquente les passes et les tombants coralliens.',
  habitat: 'Récifs coralliens, passes, tombants entre 2 et 60 mètres de profondeur.',
  is_dangerous: false,
  images: [],
  fun_facts: [
    'Peut vivre jusqu\'à 30 ans',
    'Change de sexe au cours de sa vie (hermaphrodite)',
    'Sait manger les étoiles de mer couronne d\'épines, nuisibles aux coraux',
    'Sa bosse frontale augmente avec l\'âge',
  ],
};

export default function SpeciesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isFavorite, setIsFavorite] = useState(false);

  const species = MOCK_SPECIES;

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={{ height: 280 }}>
          <LinearGradient
            colors={['#075985', '#0ea5e9', '#7dd3fc']}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 100 }}>{CATEGORY_ICONS[species.category]}</Text>
          </LinearGradient>
        </View>

        {/* Content */}
        <View className="px-5 pt-5 pb-10">
          {/* Header */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {species.name_fr}
              </Text>
              {species.name_local && (
                <Text className="text-ocean-500 font-medium text-sm">
                  {species.name_local} (nom local)
                </Text>
              )}
              <Text className={`italic text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                {species.name_scientific}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className={`w-11 h-11 rounded-full items-center justify-center ${isFavorite ? 'bg-coral-100' : isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#f43f5e' : '#94a3b8'}
              />
            </TouchableOpacity>
          </View>

          {/* Badges */}
          <View className="flex-row flex-wrap gap-2 mb-5">
            <Badge
              label={CATEGORY_LABELS[species.category]}
              color="#e0f2fe"
              textColor="#0369a1"
              size="md"
            />
            <Badge
              label={CONSERVATION_LABELS[species.conservation_status]}
              color={CONSERVATION_COLORS[species.conservation_status]}
              textColor="white"
              size="md"
            />
            {species.is_dangerous && (
              <Badge label="⚠ Dangereux" color="#fee2e2" textColor="#be123c" size="md" />
            )}
          </View>

          {/* Description */}
          <View className={`rounded-2xl p-4 mb-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <Text className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Description
            </Text>
            <Text className={`text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {species.description}
            </Text>
          </View>

          {/* Habitat */}
          <View className={`rounded-2xl p-4 mb-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="water-outline" size={18} color="#0ea5e9" />
              <Text className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Habitat</Text>
            </View>
            <Text className={`text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {species.habitat}
            </Text>
          </View>

          {/* Fun facts */}
          <View className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="bulb-outline" size={18} color="#f59e0b" />
              <Text className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Le savais-tu ?
              </Text>
            </View>
            {species.fun_facts.map((fact, i) => (
              <View key={i} className="flex-row items-start gap-3 mb-2">
                <View className="w-6 h-6 rounded-full bg-ocean-100 items-center justify-center mt-0.5">
                  <Text className="text-ocean-600 text-xs font-bold">{i + 1}</Text>
                </View>
                <Text className={`flex-1 text-sm leading-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {fact}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
