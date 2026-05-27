import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MapIllustration from '../../src/components/MapIllustration';
import POIMarker, { POI } from '../../src/components/POIMarker';
import POIModal from '../../src/components/POIModal';
import { useDiveAnimation } from '../../src/hooks/useDiveAnimation';

const POIS: POI[] = [
  { id: 1, x: '20%', y: '35%', icon: '🤿', label: 'Passe Tiputa',     category: 'diving'     },
  { id: 2, x: '75%', y: '40%', icon: '🤿', label: 'Passe Avatoru',    category: 'diving'     },
  { id: 3, x: '72%', y: '38%', icon: '🏨', label: 'Kia Ora Resort',   category: 'hotel'      },
  { id: 4, x: '68%', y: '42%', icon: '🛖', label: 'Pension Herenui',  category: 'pension'    },
  { id: 5, x: '22%', y: '30%', icon: '✈️', label: 'Aéroport',         category: 'airport'    },
  { id: 6, x: '60%', y: '55%', icon: '🐬', label: 'Spot Dauphins',    category: 'wildlife'   },
  { id: 7, x: '40%', y: '45%', icon: '🦈', label: 'Spot Requins',     category: 'wildlife'   },
  { id: 8, x: '50%', y: '35%', icon: '🌺', label: 'Village Avatoru',  category: 'village'    },
  { id: 9, x: '30%', y: '60%', icon: '🪸', label: 'Jardin de Corail', category: 'snorkeling' },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { animatedMapStyle, triggerDive, resetDive } = useDiveAnimation();
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  const handlePOIPress = useCallback((poi: POI) => {
    triggerDive(() => {
      setSelectedPOI(poi);
    });
  }, [triggerDive]);

  const handleModalClose = useCallback(() => {
    setSelectedPOI(null);
    resetDive();
  }, [resetDive]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Full-screen animated map + markers */}
      <Animated.View style={[StyleSheet.absoluteFill, animatedMapStyle]}>
        <MapIllustration />

        {POIS.map((poi) => (
          <POIMarker
            key={poi.id}
            poi={poi}
            onPress={handlePOIPress}
            containerWidth={width}
            containerHeight={height}
          />
        ))}
      </Animated.View>

      {/* Floating header */}
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={65} tint="light" style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.headerBgAndroid]} />
        )}
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Rangiroa</Text>
            <Text style={styles.headerSub}>Polynésie Française</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color="#0891b2" />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
          <Ionicons name="search" size={16} color="#94a3b8" />
          <Text style={styles.searchPlaceholder}>Rechercher un lieu…</Text>
        </TouchableOpacity>
      </View>

      {/* Scanner FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 84 + 18 }]}
        activeOpacity={0.85}
        onPress={() => router.push('/(tabs)/scanner')}
      >
        <Ionicons name="camera" size={20} color="white" />
        <Text style={styles.fabText}>Identifier</Text>
      </TouchableOpacity>

      {/* POI bottom-sheet modal */}
      {selectedPOI && (
        <POIModal poi={selectedPOI} onClose={handleModalClose} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8d8ea',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerBgAndroid: {
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 11,
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  profileBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#94a3b8',
  },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 13,
    backgroundColor: '#0891b2',
    borderRadius: 30,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  fabText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});
