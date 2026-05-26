import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Species } from '@/types';
import { CATEGORY_LABELS, CATEGORY_ICONS, CONSERVATION_COLORS, CONSERVATION_LABELS } from '@/constants';
import { Badge } from './Badge';

type Props = {
  species: Species;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  horizontal?: boolean;
};

export function SpeciesCard({ species, onPress, onFavorite, isFavorite = false, horizontal = false }: Props) {
  const coverImage = species.images[0];

  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className="flex-row bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm mb-3"
      >
        {coverImage ? (
          <Image
            source={{ uri: coverImage }}
            className="w-24 h-24"
            resizeMode="cover"
          />
        ) : (
          <View className="w-24 h-24 bg-ocean-100 items-center justify-center">
            <Text className="text-4xl">{CATEGORY_ICONS[species.category]}</Text>
          </View>
        )}
        <View className="flex-1 p-3 justify-between">
          <View className="gap-1">
            <Text className="font-bold text-base text-slate-900 dark:text-slate-100" numberOfLines={1}>
              {species.name_fr}
            </Text>
            <Text className="text-xs text-slate-400 italic" numberOfLines={1}>
              {species.name_scientific}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Badge
              label={CATEGORY_LABELS[species.category]}
              color="#e0f2fe"
              textColor="#0369a1"
            />
            {species.is_dangerous && (
              <Badge label="Dangereux" color="#fee2e2" textColor="#be123c" />
            )}
          </View>
        </View>
        {onFavorite && (
          <TouchableOpacity onPress={onFavorite} className="p-3">
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? '#f43f5e' : '#94a3b8'}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ width: 180 }}
    >
      <ImageBackground
        source={coverImage ? { uri: coverImage } : undefined}
        className="h-44"
        style={{ backgroundColor: '#bae6fd' }}
        resizeMode="cover"
      >
        {!coverImage && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-6xl">{CATEGORY_ICONS[species.category]}</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.65)']}
          className="absolute inset-0"
        />
        <View className="absolute bottom-0 left-0 right-0 p-3 gap-1">
          <Text className="font-bold text-white text-sm" numberOfLines={1}>
            {species.name_fr}
          </Text>
          <Text className="text-white/70 text-xs italic" numberOfLines={1}>
            {species.name_scientific}
          </Text>
        </View>
        {onFavorite && (
          <TouchableOpacity
            onPress={onFavorite}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/30 items-center justify-center"
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={16}
              color={isFavorite ? '#f43f5e' : 'white'}
            />
          </TouchableOpacity>
        )}
        {species.is_dangerous && (
          <View className="absolute top-2 left-2">
            <Badge label="⚠ Dangereux" color="#ef4444" textColor="white" />
          </View>
        )}
      </ImageBackground>
      <View className="bg-white dark:bg-slate-800 p-2.5">
        <Badge
          label={CATEGORY_LABELS[species.category]}
          color="#e0f2fe"
          textColor="#0369a1"
        />
      </View>
    </TouchableOpacity>
  );
}
