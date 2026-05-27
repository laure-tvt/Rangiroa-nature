import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { POI } from './POIMarker';

const { height: SCREEN_H } = Dimensions.get('window');
const SHEET_H = SCREEN_H * 0.52;

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  diving:     { label: 'Plongée',     color: '#0891b2' },
  hotel:      { label: 'Hôtel',       color: '#7c3aed' },
  pension:    { label: 'Pension',     color: '#059669' },
  airport:    { label: 'Transport',   color: '#6b7280' },
  wildlife:   { label: 'Faune',       color: '#d97706' },
  village:    { label: 'Village',     color: '#dc2626' },
  snorkeling: { label: 'Snorkeling',  color: '#0284c7' },
};

const DESCRIPTIONS: Record<string, string> = {
  'Passe Tiputa':      "L'une des passes les plus réputées au monde. Les courants y attirent des centaines de requins gris, dauphins et raies mantas.",
  "Passe Avatoru":     "Passe principale accessible depuis le village. Idéale pour observer les requins de récif et les tortues au lever du soleil.",
  'Kia Ora Resort':    "Resort de luxe 5 étoiles avec bungalows sur pilotis. Le plus mythique de Rangiroa, ouvert depuis 1974.",
  'Pension Herenui':   "Pension familiale authentique en pleine nature. Cuisine polynésienne maison et accès direct au lagon.",
  'Aéroport':          "Aéroport international de Rangiroa (RGI). Vols directs depuis Papeete (45 min) et connexions inter-îles.",
  'Spot Dauphins':     "Zone de rassemblement des dauphins spinners résidents. Ils jouent dans le lagon chaque matin.",
  'Spot Requins':      "Tombant spectaculaire où des dizaines de requins gris se reposent dans le courant.",
  'Village Avatoru':   "Village principal avec épiceries, restaurants, le Blue Lagoon Bar et accès aux deux passes.",
  'Jardin de Corail':  "Zone protégée avec des formations coralliennes exceptionnelles. Snorkeling de surface inoubliable.",
};

type Props = {
  poi: POI;
  onClose: () => void;
};

export default function POIModal({ poi, onClose }: Props) {
  const translateY = useRef(new Animated.Value(SHEET_H)).current;
  const bgOpacity  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, damping: 22, stiffness: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(bgOpacity,  { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: SHEET_H, duration: 300, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
    ]).start(({ finished }) => { if (finished) onClose(); });
  };

  const meta = CATEGORY_META[poi.category] ?? { label: poi.category, color: '#64748b' };
  const desc = DESCRIPTIONS[poi.label] ?? `Découvrez ${poi.label}, un lieu incontournable de l'atoll de Rangiroa.`;

  const imgColors: Record<string, string> = {
    diving: '#0891b2', hotel: '#7c3aed', pension: '#059669',
    airport: '#6b7280', wildlife: '#d97706', village: '#dc2626', snorkeling: '#0284c7',
  };
  const bgColor = imgColors[poi.category] ?? '#0891b2';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: bgOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Bottom sheet */}
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        {/* Image placeholder */}
        <View style={[styles.imgPlaceholder, { backgroundColor: bgColor }]}>
          <Text style={styles.imgEmoji}>{poi.icon}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <BlurView intensity={60} tint="dark" style={styles.closeBtnInner}>
              <Ionicons name="close" size={20} color="white" />
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Contenu */}
        <View style={styles.content}>
          <View style={[styles.badge, { backgroundColor: meta.color + '22' }]}>
            <Text style={[styles.badgeText, { color: meta.color }]}>{meta.label}</Text>
          </View>

          <Text style={styles.title}>{poi.label}</Text>
          <Text style={styles.desc}>{desc}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.actionPrimary]}
              onPress={() => { handleClose(); router.push('/(tabs)/map'); }}
            >
              <Ionicons name="map-outline" size={18} color="white" />
              <Text style={styles.actionPrimaryText}>Voir sur la carte</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.actionSecondary]}
              onPress={() => { handleClose(); router.push('/(tabs)/scanner'); }}
            >
              <Ionicons name="camera-outline" size={18} color="#0891b2" />
              <Text style={styles.actionSecondaryText}>Identifier une espèce</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.heartBtn}>
              <Ionicons name="heart-outline" size={24} color="#e11d48" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 84,
    left: 0,
    right: 0,
    height: SHEET_H,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  imgPlaceholder: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgEmoji: {
    fontSize: 64,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
  },
  closeBtnInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 21,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
  },
  actionPrimary: {
    backgroundColor: '#0891b2',
  },
  actionPrimaryText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
  },
  actionSecondary: {
    backgroundColor: '#e0f2fe',
  },
  actionSecondaryText: {
    color: '#0891b2',
    fontWeight: '700',
    fontSize: 13,
  },
  heartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff1f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
