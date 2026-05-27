import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// TODO: Charger les marqueurs dynamiquement depuis Supabase (hôtels, pensions, activités)
const MARKERS = [
  { id: 'pass-tiputa',      name: 'Passe de Tiputa',    emoji: '🌊', lat: -14.9833, lng: -147.6167 },
  { id: 'pass-avatoru',     name: "Passe d'Avatoru",    emoji: '🌊', lat: -14.9667, lng: -147.6833 },
  { id: 'village-avatoru',  name: "Village d'Avatoru",  emoji: '🏘️', lat: -14.9600, lng: -147.6900 },
  { id: 'village-tiputa',   name: 'Village de Tiputa',  emoji: '🏘️', lat: -14.9900, lng: -147.6100 },
  { id: 'airport',          name: 'Aéroport de Rangiroa', emoji: '✈️', lat: -14.9542, lng: -147.6608 },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* ── Carte plein écran ── */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        mapType="hybrid"
        initialRegion={{
          latitude: -14.9754,
          longitude: -147.6508,
          latitudeDelta: 0.5,
          longitudeDelta: 0.8,
        }}
        showsUserLocation
        showsCompass={false}
        showsScale={false}
        rotateEnabled={false}
      >
        {MARKERS.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.name}
          >
            {/* Marqueur personnalisé */}
            <View style={styles.pin}>
              <Text style={styles.pinEmoji}>{m.emoji}</Text>
            </View>

            {/* Popup au tap */}
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutText}>{m.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* TODO: Filtres par catégorie (hébergement, activités, restaurants, spots snorkeling) */}
        {/* TODO: Clustering des marqueurs quand zoom out */}
        {/* TODO: Fiche détail au tap sur un marqueur (nom, photo, contact, lien réservation) */}
      </MapView>

      {/* ── Header flottant ── */}
      <SafeAreaView edges={['top']} style={styles.topOverlay} pointerEvents="box-none">
        <BlurView intensity={55} tint="light" style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.logoRow}>
              <Text style={styles.logoEmoji}>🐬</Text>
              <Text style={styles.logoLabel}>Rangiroa Nature</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/profile')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="person-circle-outline" size={34} color="#0c4a6e" />
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* ── Barre de recherche ── */}
        <View style={styles.searchWrap} pointerEvents="auto">
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={17} color="#64748b" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une espèce, un lieu…"
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={17} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* ── Bouton Scanner flottant ── */}
      <TouchableOpacity
        style={styles.scannerBtn}
        onPress={() => router.push('/(tabs)/scanner')}
        activeOpacity={0.85}
      >
        <Ionicons name="camera" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* ── Top overlay ── */
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  /* ── Header ── */
  header: {
    marginHorizontal: 14,
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoEmoji: {
    fontSize: 22,
  },
  logoLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0c4a6e',
    letterSpacing: 0.2,
  },
  /* ── Recherche ── */
  searchWrap: {
    paddingHorizontal: 14,
    marginTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1e293b',
    padding: 0,
  },
  /* ── Marqueurs ── */
  pin: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pinEmoji: {
    fontSize: 18,
  },
  callout: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 130,
    alignItems: 'center',
  },
  calloutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0c4a6e',
    textAlign: 'center',
  },
  /* ── Bouton Scanner ── */
  scannerBtn: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#0891b2',
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
});
