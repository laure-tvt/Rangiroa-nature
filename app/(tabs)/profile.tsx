import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PROFILE = {
  username: 'Explorateur',
  email: 'utilisateur@exemple.com',
  bio: 'Passionné de nature et de plongée 🌊',
  identifications: 12,
  favorites: 8,
  since: 'Jan 2025',
};

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  color: string;
  danger?: boolean;
};

type Section = { title: string; items: MenuItem[] };

const SECTIONS: Section[] = [
  {
    title: 'Mon compte',
    items: [
      { icon: 'person-outline',        label: 'Modifier le profil',  color: '#0891b2' },
      { icon: 'notifications-outline', label: 'Notifications',       color: '#8b5cf6' },
      { icon: 'lock-closed-outline',   label: 'Confidentialité',     color: '#06b6d4' },
    ],
  },
  {
    title: 'Application',
    items: [
      { icon: 'moon-outline',            label: 'Thème',              color: '#6366f1', value: 'Clair' },
      { icon: 'language-outline',        label: 'Langue',             color: '#0891b2', value: 'Français' },
      { icon: 'cloud-download-outline',  label: 'Données hors-ligne', color: '#10b981' },
    ],
  },
  {
    title: 'À propos',
    items: [
      { icon: 'information-circle-outline', label: "À propos de l'app", color: '#f97316', value: 'v1.0.0' },
      { icon: 'document-text-outline',      label: "Conditions d'utilisation", color: '#64748b' },
      { icon: 'shield-outline',             label: 'Politique de confidentialité', color: '#64748b' },
    ],
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  // Entrance animations
  const heroAnim  = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroAnim,  { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.spring(statsAnim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 120 }),
    ]).start();
  }, []);

  // Button press
  const pressAnim = (ref: Animated.Value) => ({
    in:  () => Animated.spring(ref, { toValue: 0.96, useNativeDriver: true, damping: 15, stiffness: 200 }).start(),
    out: () => Animated.spring(ref, { toValue: 1,    useNativeDriver: true, damping: 15, stiffness: 200 }).start(),
  });
  const signOutScale = useRef(new Animated.Value(1)).current;
  const soPress = pressAnim(signOutScale);

  const handleSignOut = () => {
    Alert.alert('Déconnexion', 'Es-tu sûr de vouloir te déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnecter', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[]} bounces>

        {/* ── Hero ── */}
        <LinearGradient colors={['#0a1628', '#0f2d4a', '#0891b2']} style={[styles.hero, { paddingTop: insets.top + 20 }]}>
          <Animated.View style={{ opacity: heroAnim }}>
            {/* Avatar */}
            <View style={styles.avatarWrap}>
              <View style={styles.avatarGlow} />
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>🤿</Text>
              </View>
              <TouchableOpacity style={styles.cameraEdit} activeOpacity={0.8}>
                <LinearGradient colors={['#0891b2', '#06b6d4']} style={styles.cameraEditInner}>
                  <Ionicons name="camera" size={12} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Text style={styles.heroName}>{PROFILE.username}</Text>
            <Text style={styles.heroEmail}>{PROFILE.email}</Text>
            <Text style={styles.heroBio}>{PROFILE.bio}</Text>
          </Animated.View>

          {/* Stats row */}
          <Animated.View
            style={[
              styles.statsRow,
              {
                opacity: statsAnim,
                transform: [{ translateY: statsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
              },
            ]}
          >
            {[
              { label: 'Identifications', value: PROFILE.identifications, icon: '🔍' },
              { label: 'Favoris',         value: PROFILE.favorites,       icon: '❤️' },
              { label: 'Membre depuis',   value: PROFILE.since,           icon: '📅' },
            ].map((s, i) => (
              <View key={i} style={styles.statCard}>
                <BlurView intensity={Platform.OS === 'ios' ? 22 : 0} tint="dark" style={styles.statInner}>
                  <Text style={styles.statIcon}>{s.icon}</Text>
                  <Text style={[styles.statValue, typeof s.value === 'string' && s.value.length > 3 && styles.statValueSm]}>
                    {s.value}
                  </Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </BlurView>
              </View>
            ))}
          </Animated.View>
        </LinearGradient>

        {/* ── Menu sections ── */}
        <View style={styles.sectionsWrap}>
          {SECTIONS.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionCard}>
                {section.items.map((item, idx) => (
                  <React.Fragment key={item.label}>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                      <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
                        <Ionicons name={item.icon} size={18} color={item.color} />
                      </View>
                      <Text style={styles.menuLabel}>{item.label}</Text>
                      {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                      <Ionicons name="chevron-forward" size={15} color="#cbd5e1" />
                    </TouchableOpacity>
                    {idx < section.items.length - 1 && <View style={styles.divider} />}
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}

          {/* Sign out */}
          <Animated.View style={[{ transform: [{ scale: signOutScale }] }, styles.signOutWrap]}>
            <TouchableOpacity
              onPress={handleSignOut}
              onPressIn={soPress.in}
              onPressOut={soPress.out}
              activeOpacity={1}
              style={styles.signOutBtn}
            >
              <LinearGradient
                colors={['#fff1f2', '#fff1f2']}
                style={styles.signOutInner}
              >
                <Ionicons name="log-out-outline" size={20} color="#f43f5e" />
                <Text style={styles.signOutText}>Se déconnecter</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <View style={{ height: insets.bottom + 100 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f1f5f9' },

  hero: { paddingHorizontal: 24, paddingBottom: 32, alignItems: 'center' },
  avatarWrap: { position: 'relative', marginBottom: 16, alignItems: 'center', justifyContent: 'center' },
  avatarGlow: {
    position: 'absolute',
    width: 116, height: 116, borderRadius: 58,
    backgroundColor: 'rgba(34,211,238,0.22)',
  },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.40)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 42 },
  cameraEdit: {
    position: 'absolute', bottom: 2, right: 2,
    width: 28, height: 28, borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: 'white',
  },
  cameraEditInner: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  heroName:  { fontSize: 26, fontWeight: '800', color: 'white', letterSpacing: -0.3 },
  heroEmail: { fontSize: 13, color: 'rgba(255,255,255,0.50)', marginTop: 3 },
  heroBio:   { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6, marginBottom: 24 },

  statsRow: { flexDirection: 'row', gap: 10, width: '100%' },
  statCard: { flex: 1, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  statInner: {
    alignItems: 'center', padding: 12, gap: 2,
    backgroundColor: Platform.OS === 'android' ? 'rgba(255,255,255,0.10)' : 'transparent',
  },
  statIcon:    { fontSize: 18 },
  statValue:   { fontSize: 22, fontWeight: '800', color: 'white' },
  statValueSm: { fontSize: 14, fontWeight: '700' },
  statLabel:   { fontSize: 9, color: 'rgba(255,255,255,0.50)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },

  sectionsWrap: { paddingHorizontal: 16, paddingTop: 24 },
  section:      { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },
  sectionCard:  { backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  menuItem:     { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 12 },
  menuIcon:     { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel:    { flex: 1, fontSize: 15, fontWeight: '500', color: '#1e293b' },
  menuValue:    { fontSize: 14, color: '#94a3b8', marginRight: 4 },
  divider:      { height: 1, backgroundColor: '#f1f5f9', marginLeft: 64 },

  signOutWrap: { marginBottom: 8 },
  signOutBtn:  { borderRadius: 16, overflow: 'hidden', shadowColor: '#f43f5e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 4 },
  signOutInner:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 15, backgroundColor: '#fff1f2' },
  signOutText: { fontSize: 16, fontWeight: '700', color: '#f43f5e' },
});
